/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to persist data
const DB_FILE = path.join(process.cwd(), "db_store.json");

interface ButtonClicks {
  catalogue: number;
  instagram: number;
  website: number;
  enquiry: number;
}

interface Analytics {
  totalVisits: number;
  clicks: ButtonClicks;
  productViews: Record<string, number>;
}

interface Enquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  countryCode?: string;
  phone: string;
  categoryInterest: string;
  volumeRequirement: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'completed';
}

interface DbSchema {
  analytics: Analytics;
  enquiries: Enquiry[];
  googleSheetUrl?: string;
}

const defaultDb: DbSchema = {
  analytics: {
    totalVisits: 0,
    clicks: {
      catalogue: 0,
      instagram: 0,
      website: 0,
      enquiry: 0
    },
    productViews: {}
  },
  enquiries: [],
  googleSheetUrl: ""
};

let db: DbSchema = { ...defaultDb };

// Load db from file if exists
function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      db = JSON.parse(raw);
      // Ensure all fields exist
      if (!db.analytics) db.analytics = { ...defaultDb.analytics };
      if (!db.analytics.clicks) db.analytics.clicks = { ...defaultDb.analytics.clicks };
      if (!db.analytics.productViews) db.analytics.productViews = {};
      if (!db.enquiries) db.enquiries = [];
      if (db.googleSheetUrl === undefined) db.googleSheetUrl = "";
    } else {
      saveDb();
    }
  } catch (e) {
    console.error("Failed to load db file, using defaults:", e);
  }
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save db file:", e);
  }
}

loadDb();

// API Endpoints
app.get("/api/analytics", (req, res) => {
  res.json(db.analytics);
});

app.post("/api/analytics/visit", (req, res) => {
  db.analytics.totalVisits += 1;
  saveDb();
  res.json(db.analytics);
});

app.post("/api/analytics/click", (req, res) => {
  const { button } = req.body;
  if (button && button in db.analytics.clicks) {
    db.analytics.clicks[button as keyof ButtonClicks] += 1;
    saveDb();
  }
  res.json(db.analytics);
});

app.post("/api/analytics/product-view", (req, res) => {
  const { productId } = req.body;
  if (productId) {
    db.analytics.productViews[productId] = (db.analytics.productViews[productId] || 0) + 1;
    saveDb();
  }
  res.json(db.analytics);
});

app.get("/api/enquiries", (req, res) => {
  res.json(db.enquiries);
});

app.post("/api/enquiries", (req, res) => {
  const { fullName, companyName, email, countryCode, phone, categoryInterest, volumeRequirement, message } = req.body;
  const newEnquiry: Enquiry = {
    id: "enq_" + Math.random().toString(36).substring(2, 11),
    fullName: fullName || "",
    companyName: companyName || "",
    email: email || "",
    countryCode: countryCode || "",
    phone: phone || "",
    categoryInterest: categoryInterest || "",
    volumeRequirement: volumeRequirement || "",
    message: message || "",
    timestamp: new Date().toISOString(),
    status: "new"
  };
  db.enquiries.unshift(newEnquiry);
  saveDb();

  // Asynchronously forward to Google Sheets if URL is configured
  if (db.googleSheetUrl && db.googleSheetUrl.trim() !== "") {
    fetch(db.googleSheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEnquiry)
    }).then(async r => {
      console.log("Synced enquiry to Google Sheets, status:", r.status);
    }).catch(err => {
      console.error("Failed to sync enquiry to Google Sheets Web App:", err);
    });
  }

  res.json(newEnquiry);
});

app.get("/api/settings", (req, res) => {
  res.json({ googleSheetUrl: db.googleSheetUrl || "" });
});

app.post("/api/settings", (req, res) => {
  const { googleSheetUrl } = req.body;
  db.googleSheetUrl = googleSheetUrl || "";
  saveDb();
  res.json({ status: "success", googleSheetUrl: db.googleSheetUrl });
});

app.put("/api/enquiries/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.enquiries = db.enquiries.map(eq => {
    if (eq.id === id) {
      return { ...eq, status };
    }
    return eq;
  });
  saveDb();
  res.json(db.enquiries);
});

app.delete("/api/enquiries/:id", (req, res) => {
  const { id } = req.params;
  db.enquiries = db.enquiries.filter(eq => eq.id !== id);
  saveDb();
  res.json(db.enquiries);
});

app.post("/api/reset", (req, res) => {
  db = {
    analytics: {
      totalVisits: 0,
      clicks: {
        catalogue: 0,
        instagram: 0,
        website: 0,
        enquiry: 0
      },
      productViews: {}
    },
    enquiries: []
  };
  saveDb();
  res.json(db);
});

// Vite middleware or static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
