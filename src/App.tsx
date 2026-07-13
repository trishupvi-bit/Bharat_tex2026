/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ActivePage } from './types';
import { logVisit, getAnalytics } from './utils';

// Import subcomponents
import MainHub from './components/MainHub';
import CatalogueView from './components/CatalogueView';
import InstagramView from './components/InstagramView';
import WebsiteView from './components/WebsiteView';
import EnquiryView from './components/EnquiryView';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('HUB');
  const [visitCount, setVisitCount] = useState(0);
  
  // Preselected product state for enquiry auto-population
  const [preselectedProduct, setPreselectedProduct] = useState<string | undefined>(undefined);
  const [preselectedCode, setPreselectedCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    // 1. Log visit immediately when app mounts on the client
    logVisit();
    
    // 2. Fetch visitor stats from local storage for zero-latency initial render
    const analytics = getAnalytics();
    setVisitCount(analytics.totalVisits || 1);

    // 3. Centralize visitor stats in real-time from the backend server
    fetch('/api/analytics')
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        if (data && typeof data.totalVisits === 'number') {
          setVisitCount(data.totalVisits);
          // Sync back to local storage
          localStorage.setItem('ginza_analytics_v1', JSON.stringify(data));
        }
      })
      .catch(err => console.warn('Failed to fetch central analytics:', err));
  }, []);

  const handleNavigateToEnquiry = (productName?: string, productCode?: string) => {
    setPreselectedProduct(productName);
    setPreselectedCode(productCode);
    setActivePage('ENQUIRY');
  };

  const handleBackToHub = () => {
    setActivePage('HUB');
    // Clear product selection when returning to hub
    setPreselectedProduct(undefined);
    setPreselectedCode(undefined);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col justify-center items-center font-sans select-none overflow-x-hidden">
      {/* App Shell Frame Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-slate-950 relative shadow-2xl">
        <AnimatePresence mode="wait">
          {activePage === 'HUB' && (
            <motion.div
              key="hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1"
            >
              <MainHub onNavigate={setActivePage} visitCount={visitCount} />
            </motion.div>
          )}

          {activePage === 'CATALOGUE' && (
            <motion.div
              key="catalogue"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1"
            >
              <CatalogueView 
                onBack={handleBackToHub} 
                onNavigateToEnquiry={handleNavigateToEnquiry}
              />
            </motion.div>
          )}

          {activePage === 'INSTAGRAM' && (
            <motion.div
              key="instagram"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1"
            >
              <InstagramView onBack={handleBackToHub} />
            </motion.div>
          )}

          {activePage === 'WEBSITE' && (
            <motion.div
              key="website"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1"
            >
              <WebsiteView onBack={handleBackToHub} />
            </motion.div>
          )}

          {activePage === 'ENQUIRY' && (
            <motion.div
              key="enquiry"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1"
            >
              <EnquiryView 
                onBack={handleBackToHub}
                preselectedProduct={preselectedProduct}
                preselectedCode={preselectedCode}
              />
            </motion.div>
          )}

          {activePage === 'ADMIN' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1"
            >
              <AdminDashboard onBack={handleBackToHub} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
