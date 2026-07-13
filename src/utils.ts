/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Analytics, Enquiry, ButtonClicks } from './types';

const ANALYTICS_KEY = 'ginza_analytics_v1';
const ENQUIRIES_KEY = 'ginza_enquiries_v1';

// Safe in-memory storage fallbacks for iframe sandboxes that block storage access
const memoryStorage: Record<string, string> = {};
const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn('localStorage.getItem is not available, using memory fallback:', e);
    }
    return memoryStorage[key] || null;
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn('localStorage.setItem is not available, using memory fallback:', e);
    }
    memoryStorage[key] = value;
  },
  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn('localStorage.removeItem is not available, using memory fallback:', e);
    }
    delete memoryStorage[key];
  }
};

const memorySessionStorage: Record<string, string> = {};
const safeSessionStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch (e) {
      console.warn('sessionStorage.getItem is not available, using memory fallback:', e);
    }
    return memorySessionStorage[key] || null;
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn('sessionStorage.setItem is not available, using memory fallback:', e);
    }
    memorySessionStorage[key] = value;
  },
  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn('sessionStorage.removeItem is not available, using memory fallback:', e);
    }
    delete memorySessionStorage[key];
  }
};

const defaultClicks: ButtonClicks = {
  catalogue: 0,
  instagram: 0,
  website: 0,
  enquiry: 0
};

const defaultAnalytics: Analytics = {
  totalVisits: 0,
  clicks: defaultClicks,
  productViews: {}
};

/**
 * Gets current analytics from localStorage
 */
export function getAnalytics(): Analytics {
  try {
    const raw = safeLocalStorage.getItem(ANALYTICS_KEY);
    if (!raw) {
      return defaultAnalytics;
    }
    const data = JSON.parse(raw) as Analytics;
    // Fill in defaults in case fields are missing
    return {
      totalVisits: data.totalVisits || 0,
      clicks: { ...defaultClicks, ...data.clicks },
      productViews: data.productViews || {}
    };
  } catch (e) {
    console.error('Error parsing analytics:', e);
    return defaultAnalytics;
  }
}

/**
 * Saves analytics to localStorage
 */
export function saveAnalytics(analytics: Analytics): void {
  try {
    safeLocalStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
  } catch (e) {
    console.error('Error saving analytics:', e);
  }
}

/**
 * Track a new QR code scan/visit (one scan per session)
 */
export function logVisit(): void {
  const sessionKey = 'ginza_session_registered';
  const isSessionRegistered = safeSessionStorage.getItem(sessionKey);
  
  if (!isSessionRegistered) {
    const analytics = getAnalytics();
    analytics.totalVisits += 1;
    saveAnalytics(analytics);
    safeSessionStorage.setItem(sessionKey, 'true');

    // Asynchronously synchronize with central Express backend
    fetch('/api/analytics/visit', { method: 'POST' }).catch(err =>
      console.warn('Failed to sync visit to server:', err)
    );
  }
}

/**
 * Track a click on one of the 4 main buttons
 */
export function logButtonClick(button: keyof ButtonClicks): void {
  const analytics = getAnalytics();
  analytics.clicks[button] = (analytics.clicks[button] || 0) + 1;
  saveAnalytics(analytics);

  // Asynchronously synchronize button clicks to central server
  fetch('/api/analytics/click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ button })
  }).catch(err =>
    console.warn('Failed to sync button click to server:', err)
  );
}

/**
 * Track a view on a specific product detail modal/view
 */
export function logProductView(productId: string): void {
  const analytics = getAnalytics();
  if (!analytics.productViews) {
    analytics.productViews = {};
  }
  analytics.productViews[productId] = (analytics.productViews[productId] || 0) + 1;
  saveAnalytics(analytics);

  // Asynchronously synchronize product view to central server
  fetch('/api/analytics/product-view', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId })
  }).catch(err =>
    console.warn('Failed to sync product view to server:', err)
  );
}

/**
 * Gets all captured enquiries
 */
export function getEnquiries(): Enquiry[] {
  try {
    const raw = safeLocalStorage.getItem(ENQUIRIES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Enquiry[];
  } catch (e) {
    console.error('Error parsing enquiries:', e);
    return [];
  }
}

/**
 * Saves enquiries list
 */
export function saveEnquiries(enquiries: Enquiry[]): void {
  try {
    safeLocalStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
  } catch (e) {
    console.error('Error saving enquiries:', e);
  }
}

/**
 * Submits a new enquiry from a visitor
 */
export function addEnquiry(enquiryData: Omit<Enquiry, 'id' | 'timestamp' | 'status'>): Enquiry {
  const enquiries = getEnquiries();
  const newEnquiry: Enquiry = {
    ...enquiryData,
    id: 'enq_' + Math.random().toString(36).substring(2, 11),
    timestamp: new Date().toISOString(),
    status: 'new'
  };
  
  enquiries.unshift(newEnquiry); // Add to beginning of array (newest first)
  saveEnquiries(enquiries);
  return newEnquiry;
}

/**
 * Updates an enquiry status (contacted, completed, etc.)
 */
export function updateEnquiryStatus(id: string, status: Enquiry['status']): Enquiry[] {
  const enquiries = getEnquiries();
  const updated = enquiries.map(eq => {
    if (eq.id === id) {
      return { ...eq, status };
    }
    return eq;
  });
  saveEnquiries(updated);
  return updated;
}

/**
 * Deletes an enquiry
 */
export function deleteEnquiry(id: string): Enquiry[] {
  const enquiries = getEnquiries();
  const filtered = enquiries.filter(eq => eq.id !== id);
  saveEnquiries(filtered);
  return filtered;
}

/**
 * Reset all analytics and enquiries (with caution, for admin reset)
 */
export function resetSystemData(): void {
  safeLocalStorage.removeItem(ANALYTICS_KEY);
  safeLocalStorage.removeItem(ENQUIRIES_KEY);
  safeSessionStorage.removeItem('ginza_session_registered');
}

/**
 * Generates and downloads a CSV file containing all enquiries
 */
export function exportEnquiriesToCSV(): void {
  const enquiries = getEnquiries();
  if (enquiries.length === 0) return;

  const headers = ['ID', 'Date', 'Full Name', 'Company Name', 'Email', 'Phone', 'Interest Category', 'Requirement Volume', 'Message', 'Status'];
  const rows = enquiries.map(eq => [
    eq.id,
    new Date(eq.timestamp).toLocaleString(),
    eq.fullName,
    eq.companyName,
    eq.email,
    eq.phone,
    eq.categoryInterest,
    eq.volumeRequirement,
    eq.message.replace(/"/g, '""'), // Escape quotes for CSV format
    eq.status
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(val => `"${val}"`).join(','))
  ].join('\n');

  try {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Ginza_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    console.error('Failed to export CSV:', e);
  }
}
