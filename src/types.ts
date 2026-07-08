/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActivePage = 'HUB' | 'CATALOGUE' | 'INSTAGRAM' | 'WEBSITE' | 'ENQUIRY' | 'ADMIN' | 'LINKEDIN';

export interface CatalogueItem {
  id: string;
  code: string;
  title: string;
  category: string;
  image: string;
  description: string;
  composition: string; // e.g., "85% Nylon, 15% Spandex"
  weight: string;      // e.g., "160 GSM"
  width: string;       // e.g., "58/60 inches"
  features: string[];  // e.g., ["4-way stretch", "Anti-microbial", "Moisture wicking"]
  pdfUrl?: string;     // Optional link to Google Drive PDF or photo
}

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  commentsCount: number;
  date: string;
}

export interface Enquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  categoryInterest: string;
  volumeRequirement: string;
  message: string;
  timestamp: string; // ISO date string
  status: 'new' | 'contacted' | 'completed';
}

export interface ButtonClicks {
  catalogue: number;
  instagram: number;
  website: number;
  enquiry: number;
}

export interface Analytics {
  totalVisits: number;
  clicks: ButtonClicks;
  productViews: Record<string, number>; // Maps productId -> clickCount
}
