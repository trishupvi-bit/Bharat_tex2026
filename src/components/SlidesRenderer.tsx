import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';

// Overlapping diagonal squares to match the PDF background
const SlideBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-slate-50/20">
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-slate-200/40 rotate-45" />
    <div className="absolute top-1/4 -right-12 w-48 h-48 bg-slate-200/30 rotate-45" />
    <div className="absolute -bottom-16 left-1/3 w-36 h-36 bg-slate-200/40 rotate-45" />
    <div className="absolute bottom-4 right-1/4 w-24 h-24 bg-slate-200/25 rotate-45" />
  </div>
);

// Consistency Ginza logo on top right of slides
const SlideLogoHeader = () => (
  <div className="absolute top-2 right-2 flex flex-col items-end z-20">
    <img 
      src="https://www.ginzalimited.com/cdn/shop/files/Ginza_logo.jpg?v=1668509673&width=500" 
      alt="Ginza Logo" 
      className="h-5 w-auto object-contain bg-white px-1 py-0.5 rounded shadow-sm border border-slate-100"
      referrerPolicy="no-referrer"
    />
    <span className="text-[5px] font-mono text-slate-400 mt-0.5 tracking-tight uppercase font-bold">INDUSTRIES LTD</span>
  </div>
);

interface SlidesRendererProps {
  page: number;
}

export function SlidesRenderer({ page }: SlidesRendererProps) {
  switch(page) {
    case 1:
      return (
        <div id="slide-p1" className="w-full h-full flex bg-white text-slate-800 relative overflow-hidden p-0 font-sans">
          <SlideBackground />
          <div className="w-1/3 bg-white border-r border-slate-100 flex flex-col justify-center items-center p-4 relative z-10 shadow-lg">
            <img 
              src="https://www.ginzalimited.com/cdn/shop/files/Ginza_logo.jpg?v=1668509673&width=500" 
              alt="Ginza Logo" 
              className="w-16 h-16 object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="text-center mt-2">
              <span className="font-display font-black text-sm text-slate-900 tracking-wider block">GINZA</span>
              <span className="font-mono text-[5px] text-slate-500 tracking-[0.25em] uppercase block font-semibold">INDUSTRIES LTD</span>
            </div>
          </div>
          <div className="w-2/3 flex flex-col justify-center items-center p-6 relative z-10">
            <div className="border border-slate-200 bg-white/80 backdrop-blur-sm p-4 text-center shadow-md rounded">
              <h1 className="font-display font-light text-base tracking-[0.1em] text-slate-800 leading-tight uppercase">
                Information<br />
                <span className="font-bold text-lg">Brochure</span>
              </h1>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div id="slide-p2" className="w-full h-full flex flex-col justify-center items-center bg-white text-slate-800 relative overflow-hidden p-6 font-sans">
          <SlideBackground />
          <SlideLogoHeader />
          <div className="text-center relative z-10 max-w-lg">
            <h1 className="font-display font-light text-xl tracking-[0.15em] text-slate-800 uppercase">
              Our Genesis
            </h1>
          </div>
        </div>
      );

    case 3:
      return (
        <div id="slide-p3" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <div className="flex space-x-2.5 mb-1 relative z-10 border-b border-slate-100 pb-1">
            <div className="w-[50px] flex flex-col justify-center font-bold text-[8px] text-slate-800 space-y-1 text-right pr-2 border-r border-slate-250 shrink-0">
              <span className="tracking-wider">VISION</span>
              <span className="tracking-wider text-indigo-700">MISSION</span>
            </div>
            <div className="text-[5.5px] text-slate-600 space-y-0.5 leading-tight font-light flex-1">
              <p>• To be a reputed global company in fashion wear, intimate apparels and its components segment</p>
              <p>• To achieve sustainable growth through strategic backward integration and product innovation</p>
              <p>• To continuously develop human resources, improve efficiency while being environmentally responsible</p>
              <p>• To ensure brand and product development while keeping quality at the epicenter of everything we do</p>
              <p>• To provide value to the customer through cost effective products facilitated by the integrated value chain</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 relative z-10 flex-1">
            <div className="space-y-1">
              <div className="p-1 bg-slate-50/80 border border-slate-200 rounded text-left">
                <h4 className="font-bold text-[5.5px] text-amber-800 border-b border-amber-100 pb-0.5 mb-0.5 uppercase">End-to-end Textile Solutions Provider</h4>
                <p className="text-[5px] text-slate-600 leading-tight font-light">
                  Ginza offers its products across women's intimate apparel value chain from yarn to garment offering over 10,000 variants of niche textile products. Facilities are well integrated for cost efficient production.
                </p>
              </div>
              <div className="p-1 bg-slate-50/80 border border-slate-200 rounded text-left">
                <h4 className="font-bold text-[5.5px] text-amber-800 border-b border-amber-100 pb-0.5 mb-0.5 uppercase">Extensive Sales & Distribution Network</h4>
                <p className="text-[5px] text-slate-600 leading-tight font-light">
                  Pan-India distribution network supported by 8 sales offices. Established clientele in over 15 countries across US and Europe while being a preferred vendor for large brands.
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="p-1 bg-slate-50/80 border border-slate-200 rounded text-left">
                <h4 className="font-bold text-[5.5px] text-amber-800 border-b border-amber-100 pb-0.5 mb-0.5 uppercase">Market Leader in Key Segments</h4>
                <p className="text-[5px] text-slate-600 leading-tight font-light">
                  Commands a major market share in India in key apparel components including raschel knitted fabrics, tricot fabrics, laces, elastics, weft knits & embroideries.
                </p>
              </div>
              <div className="p-1 bg-slate-50/80 border border-slate-200 rounded text-left">
                <h4 className="font-bold text-[5.5px] text-amber-800 border-b border-amber-100 pb-0.5 mb-0.5 uppercase">Experienced Team & Trained Workforce</h4>
                <p className="text-[5px] text-slate-600 leading-tight font-light">
                  Possesses an experienced and professional management team. We have a 3500+ member team trained on relevant skills across the apparel value chain.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto bg-slate-800 text-white text-[5px] px-2 py-0.5 rounded font-mono tracking-wider z-25 mt-0.5">
            Ginza Business Highlights
          </div>
        </div>
      );

    case 4:
      return (
        <div id="slide-p4" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            KEY MILESTONES
          </h2>

          <div className="grid grid-cols-3 gap-1 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="space-y-1">
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">1986</span>
                <p className="text-[5px] text-slate-600 font-medium leading-tight">• Ginza Industries Limited Registered</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">1990</span>
                <p className="text-[5px] text-slate-600 font-medium leading-tight">• Warp Knit Unit Facility</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">1995</span>
                <p className="text-[5px] text-slate-600 font-medium leading-tight">• Elastic Tape Facility</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">2005</span>
                <p className="text-[4.5px] text-slate-600 leading-tight">• Embroidery Unit, Processing & Value Addition Facility</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">2006</span>
                <p className="text-[5px] text-slate-600 font-medium leading-tight">• Torchon Lace Facility</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">2007</span>
                <p className="text-[4.5px] text-slate-600 leading-tight">• Intimate Apparel stitching & Eye - Hook Facility</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">2011</span>
                <p className="text-[4.5px] text-slate-600 leading-tight">• SOIE brand launched & mfg facility for SOIE</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">2012</span>
                <p className="text-[4.5px] text-slate-600 leading-tight">• Weft Knit Facility, Yarn twisting & 2nd Processing</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">2013</span>
                <p className="text-[4.5px] text-slate-600 leading-tight">• 2nd Intimate Apparel unit & New Mumbai Corporate Office</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">2018</span>
                <p className="text-[4.5px] text-slate-600 leading-tight">• Sublimation Printing & Moulded Cups Facility</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">2024</span>
                <p className="text-[4.5px] text-slate-600 leading-tight">• Crochet Fabric Facility & 70-80% water recycled</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <span className="font-bold text-[6px] text-amber-600 font-mono block">2025</span>
                <p className="text-[4px] text-slate-600 leading-none">• PUR Lamination, 400k sqft expansion, 4MW Solar plant, HEKTOR brand</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 5:
      return (
        <div id="slide-p5" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            INGREDIENTS OF A ROBUST CORE BUSINESS
          </h2>

          <div className="grid grid-cols-4 gap-1 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <h4 className="font-bold text-[5.5px] text-amber-700 uppercase leading-none border-b pb-0.5">One Stop Solution</h4>
              <p className="text-[4.5px] text-slate-500 font-light leading-tight mt-0.5">
                Offers all intermediate products including fabrics, laces, elastic tapes, hook-eye, cups.
              </p>
            </div>
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <h4 className="font-bold text-[5.5px] text-amber-700 uppercase leading-none border-b pb-0.5">Quality Products</h4>
              <p className="text-[4.5px] text-slate-500 font-light leading-tight mt-0.5">
                Preferred supplier for top brands; over 50% products supplied to domestic exporters.
              </p>
            </div>
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <h4 className="font-bold text-[5.5px] text-amber-700 uppercase leading-none border-b pb-0.5">Concentrated Hubs</h4>
              <p className="text-[4.5px] text-slate-500 font-light leading-tight mt-0.5">
                Facilities concentrated around Mumbai and Surat to realize strong operational economies.
              </p>
            </div>
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <h4 className="font-bold text-[5.5px] text-amber-700 uppercase leading-none border-b pb-0.5">Modern Tech</h4>
              <p className="text-[4.5px] text-slate-500 font-light leading-tight mt-0.5">
                Equipped with imported machinery from Japan, Germany, Korea, Italy, Taiwan, Greece.
              </p>
            </div>
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <h4 className="font-bold text-[5.5px] text-amber-700 uppercase leading-none border-b pb-0.5">Pan-India Network</h4>
              <p className="text-[4.5px] text-slate-500 font-light leading-tight mt-0.5">
                8 sales offices spread across the country to drive sales and support customers.
              </p>
            </div>
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <h4 className="font-bold text-[5.5px] text-amber-700 uppercase leading-none border-b pb-0.5">SKU Agnostic</h4>
              <p className="text-[4.5px] text-slate-500 font-light leading-tight mt-0.5">
                Ability to customize and fulfill any quantity ranging from micro orders to bulk containers.
              </p>
            </div>
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <h4 className="font-bold text-[5.5px] text-amber-700 uppercase leading-none border-b pb-0.5">Customer Loyalty</h4>
              <p className="text-[4.5px] text-slate-500 font-light leading-tight mt-0.5">
                Achieved high customer satisfaction with superior quality and timely delivery.
              </p>
            </div>
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <h4 className="font-bold text-[5.5px] text-amber-700 uppercase leading-none border-b pb-0.5">Diversified Base</h4>
              <p className="text-[4.5px] text-slate-500 font-light leading-tight mt-0.5">
                Revenues are well distributed with no client contributing over 5% of total revenues.
              </p>
            </div>
          </div>
        </div>
      );

    case 6:
      return (
        <div id="slide-p6" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            SYSTEMS & PROCESSES
          </h2>

          <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="space-y-1">
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h4 className="font-bold text-[5.5px] text-indigo-900 border-b border-indigo-100 pb-0.5 mb-0.5 uppercase leading-none">Focus on Labor Trainings</h4>
                <p className="text-[4.8px] text-slate-600 leading-tight font-light">
                  Strong 4000+ team. Lays special emphasis on training the workforce for respective steps in manufacturing to optimize process efficiency.
                </p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h4 className="font-bold text-[5.5px] text-indigo-900 border-b border-indigo-100 pb-0.5 mb-0.5 uppercase leading-none">Structured Order Delivery</h4>
                <p className="text-[4.8px] text-slate-600 leading-tight font-light">
                  Structured approach for order fulfillment allows for timely execution of orders leading to client satisfaction and retention.
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h4 className="font-bold text-[5.5px] text-indigo-900 border-b border-indigo-100 pb-0.5 mb-0.5 uppercase leading-none">Use of Information Tech</h4>
                <p className="text-[4.8px] text-slate-600 leading-tight font-light">
                  MIS system tracking sales and expenses. Extensive use of ERP at every stage of production cycle to ensure minimum wastage and transparency.
                </p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h4 className="font-bold text-[5.5px] text-indigo-900 border-b border-indigo-100 pb-0.5 mb-0.5 uppercase leading-none">Quality Checks</h4>
                <p className="text-[4.8px] text-slate-600 leading-tight font-light">
                  Strict quality adherence procedures at all stages of manufacturing right from raw material procurement to reduce defect rates.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 rounded p-1 text-center mb-0.5 z-10 shrink-0">
            <span className="font-mono text-[5px] text-amber-800 uppercase font-bold tracking-wider block leading-none">Each Unit as Separate Centre</span>
            <p className="text-[4.5px] text-slate-600 font-light mt-0.5 leading-none">
              Looked at as an individual profit centre, leading to easy identification of inefficiencies and better performance.
            </p>
          </div>
        </div>
      );

    case 7:
      return (
        <div id="slide-p7" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            Management Team
          </h2>

          <div className="flex-1 flex flex-col items-center justify-center relative z-10 scale-[0.85] origin-center">
            <div className="bg-slate-900 text-white px-3 py-1 rounded shadow text-center border border-slate-800 min-w-[100px]">
              <p className="font-bold text-[7px] leading-none">Ashok Sethia</p>
              <p className="text-[4.5px] text-amber-400 uppercase font-mono tracking-widest mt-0.5">CMD</p>
            </div>

            <div className="w-0.5 h-1 bg-slate-300" />

            <div className="grid grid-cols-4 gap-1 w-full text-center">
              <div className="bg-slate-50 border border-slate-200 p-1 rounded min-h-[95px] flex flex-col justify-between">
                <div>
                  <p className="font-bold text-[6.5px] text-slate-950 leading-none">Manoj Sethia</p>
                  <p className="text-[4.5px] text-indigo-600 uppercase font-mono tracking-wider mt-0.5 font-semibold">Jt. MD</p>
                </div>
                <div className="border-t border-slate-150 mt-0.5 pt-0.5 text-[4.5px] text-slate-500 text-left leading-none space-y-0.5">
                  <p className="font-bold text-slate-700">Components:</p>
                  <p>• Warp & Weft Knit</p>
                  <p>• Embroidery Unit</p>
                  <p>• Dyeing/Processing</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-1 rounded min-h-[95px] flex flex-col justify-between">
                <div>
                  <p className="font-bold text-[6.5px] text-slate-950 leading-none">L. Banthia</p>
                  <p className="text-[4.5px] text-indigo-600 uppercase font-mono tracking-wider mt-0.5 font-semibold">Director</p>
                </div>
                <div className="border-t border-slate-150 mt-0.5 pt-0.5 text-[4.5px] text-slate-500 text-left leading-none space-y-0.5">
                  <p className="font-bold text-slate-700">Elastic Tape:</p>
                  <p>• Elastics (Daman)</p>
                  <p>• Dyeing (Surat)</p>
                  <p>• Torchan (Palghar)</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-1 rounded min-h-[95px] flex flex-col justify-between">
                <div>
                  <p className="font-bold text-[6.5px] text-slate-950 leading-none">Arvind Sethia</p>
                  <p className="text-[4.5px] text-indigo-600 uppercase font-mono tracking-wider mt-0.5 font-semibold">Director</p>
                </div>
                <div className="border-t border-slate-150 mt-0.5 pt-0.5 text-[4.5px] text-slate-500 text-left leading-none space-y-0.5">
                  <p className="font-bold text-slate-700">Operations:</p>
                  <p>• Central Warehouse</p>
                  <p>• HR & IT Support</p>
                  <p>• Finance & Accounts</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-1 rounded min-h-[95px] flex flex-col justify-between">
                <div>
                  <p className="font-bold text-[6.5px] text-slate-950">Garment Div</p>
                  <p className="text-[4.5px] text-indigo-600 uppercase font-mono tracking-wider mt-0.5 font-semibold">Amrit (AVP)</p>
                </div>
                <div className="border-t border-slate-150 mt-0.5 pt-0.5 text-[4.5px] text-slate-500 text-left leading-none space-y-0.5">
                  <p className="font-bold text-slate-700">SOIE & Export:</p>
                  <p>• Design/Production</p>
                  <p>• Mfg (Surat/SEZ)</p>
                  <p>• Plant (Ambernath)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 8:
      return (
        <div id="slide-p8" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            FULLY INTEGRATED OPERATIONS
          </h2>

          <div className="flex justify-between items-center space-x-1 relative z-10 my-0.5">
            {[
              { title: 'Yarn', subtitle: 'Preparation/twisting' },
              { title: 'Knitting', subtitle: 'Warp & Weft Knitting' },
              { title: 'Dyeing', subtitle: 'Finishing Processing' },
              { title: 'Garment', subtitle: 'Confection Assembly' }
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex-1 p-1 bg-slate-900 text-white rounded text-center shadow">
                  <span className="text-[4.5px] uppercase font-mono text-amber-400 block leading-none">Step 0{idx+1}</span>
                  <span className="font-bold text-[6px] block mt-0.5 leading-none">{step.title}</span>
                </div>
                {idx < 3 && <ChevronRight className="w-2 h-2 text-slate-400 shrink-0" />}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-1 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 border-t border-slate-100 mt-0.5">
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <div>
                <span className="font-bold text-[5.5px] text-amber-700 uppercase block tracking-wider mb-0.5 border-b pb-0.5">Yarn Preparation</span>
                <p className="text-[4.5px] text-slate-600 font-medium">• Textured crimped filament yarn</p>
                <p className="text-[4.5px] text-slate-600 font-medium mt-0.5">• Multi-ply twisted yarn</p>
              </div>
              <div className="h-4 bg-slate-200/50 rounded flex items-center justify-center text-[4.5px] font-mono text-slate-400 uppercase mt-0.5 font-bold">Yarn Twisting</div>
            </div>

            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <div>
                <span className="font-bold text-[5.5px] text-amber-700 uppercase block tracking-wider mb-0.5 border-b pb-0.5">Intermediates</span>
                <p className="text-[4.5px] text-slate-600 leading-none">• Tricot, Weft & Raschel Knits</p>
                <p className="text-[4.5px] text-slate-600 leading-none mt-0.5">• Guipure laces & Embroidery</p>
                <p className="text-[4.5px] text-slate-600 leading-none mt-0.5">• Elastic tapes & Trims</p>
              </div>
              <div className="h-4 bg-slate-200/50 rounded flex items-center justify-center text-[4.5px] font-mono text-slate-400 uppercase mt-0.5 font-bold">Fabrics / Trims</div>
            </div>

            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[85px]">
              <div>
                <span className="font-bold text-[5.5px] text-amber-700 uppercase block tracking-wider mb-0.5 border-b pb-0.5">Finished Garments</span>
                <p className="text-[4.5px] text-slate-600 font-medium">• Intimate apparel & Lingerie</p>
                <p className="text-[4.5px] text-slate-600 font-medium mt-0.5">• Loungewear & Nightwear</p>
                <p className="text-[4.5px] text-slate-600 font-medium mt-0.5">• High compression activewear</p>
              </div>
              <div className="h-4 bg-slate-200/50 rounded flex items-center justify-center text-[4.5px] font-mono text-slate-400 uppercase mt-0.5 font-bold">SOIE & HEKTOR</div>
            </div>
          </div>
        </div>
      );

    case 9:
      return (
        <div id="slide-p9" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            FULLY INTEGRATED VALUE CHAIN (1)
          </h2>

          <div className="grid grid-cols-3 gap-1 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[115px]">
              <div>
                <h4 className="font-bold text-[6px] text-indigo-900 border-b pb-0.5 mb-1 uppercase leading-none">Warp Knit</h4>
                <ul className="text-[4.5px] text-slate-600 space-y-0.5 list-disc pl-2.5">
                  <li>Flagship division established back in 1990.</li>
                  <li>Spread over 120,000 sq ft with daily output capacity exceeding 200,000 metres.</li>
                  <li>Producing Raschel, Tricot, Jacquard, Stretch laces and rigid/stretch fabrics.</li>
                </ul>
              </div>
            </div>

            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[115px]">
              <div>
                <h4 className="font-bold text-[6px] text-indigo-900 border-b pb-0.5 mb-1 uppercase leading-none">Weft Knit</h4>
                <ul className="text-[4.5px] text-slate-600 space-y-0.5 list-disc pl-2.5">
                  <li>Essential components for intimate and activewear, boxers, and athleisure.</li>
                  <li>Knits nylon, cotton, polyester, spandex blends on state of the art machines.</li>
                  <li>Monthly output of 100 tons.</li>
                </ul>
              </div>
            </div>

            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[115px]">
              <div>
                <h4 className="font-bold text-[6px] text-indigo-900 border-b pb-0.5 mb-1 uppercase leading-none">Embroidery</h4>
                <ul className="text-[4.5px] text-slate-600 space-y-0.5 list-disc pl-2.5">
                  <li>Schiffli and multi-head machines for Guipure laces & allover embroideries.</li>
                  <li>Works on cambric, viscose, mesh, jersey bases with solid dyeing capabilities.</li>
                  <li>Daily capacity of 15 million stitches.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case 10:
      return (
        <div id="slide-p10" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            FULLY INTEGRATED VALUE CHAIN (2)
          </h2>

          <div className="grid grid-cols-3 gap-1 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[115px]">
              <div>
                <h4 className="font-bold text-[6px] text-indigo-900 border-b pb-0.5 mb-1 uppercase leading-none">Elastics</h4>
                <ul className="text-[4.5px] text-slate-600 space-y-0.5 list-disc pl-2.5">
                  <li>One of the largest domestic suppliers of quality elastic tapes.</li>
                  <li>Daily production of over 800,000 metres of woven, knitted, and jacquard tapes.</li>
                  <li>Premium quality utilizing authentic Invista Lycra fibers.</li>
                </ul>
              </div>
            </div>

            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[115px]">
              <div>
                <h4 className="font-bold text-[6px] text-indigo-900 border-b pb-0.5 mb-1 uppercase leading-none">Dyeing & Processing</h4>
                <ul className="text-[4.5px] text-slate-600 space-y-0.5 list-disc pl-2.5">
                  <li>Differentiating factor for premium stretch fabric finishing.</li>
                  <li>Equipped with jet dyeing machines; capacity of 500 tons/month.</li>
                  <li>In-house sublimation printing facility for fashion fabrics.</li>
                </ul>
              </div>
            </div>

            <div className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[115px]">
              <div>
                <h4 className="font-bold text-[6px] text-indigo-900 border-b pb-0.5 mb-1 uppercase leading-none">Torchan Lace</h4>
                <ul className="text-[4.5px] text-slate-600 space-y-0.5 list-disc pl-2.5">
                  <li>Excellent trimming and embellishments extensively used in beach wear.</li>
                  <li>Japanese braiding machinery for maximum visual and structural precision.</li>
                  <li>Daily production capacity of 30,000-35,000 metres.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case 11:
      return (
        <div id="slide-p11" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            FULLY INTEGRATED VALUE CHAIN (3)
          </h2>

          <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="p-1.5 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[115px]">
              <div>
                <h4 className="font-bold text-[6px] text-indigo-900 border-b pb-0.5 mb-1 uppercase leading-none">Trims</h4>
                <ul className="text-[4.5px] text-slate-600 space-y-0.5 list-disc pl-2.5">
                  <li>Offers a complete, integrated one-stop solution to customers.</li>
                  <li>In-house manufacturing of molded bra foam cups and eye & hook fastener tapes.</li>
                  <li>Moulding facilities ensuring precise contouring, recovery, and gauge control.</li>
                </ul>
              </div>
            </div>

            <div className="p-1.5 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between h-[115px]">
              <div>
                <h4 className="font-bold text-[6px] text-indigo-900 border-b pb-0.5 mb-1 uppercase leading-none">Apparel Manufacturing</h4>
                <ul className="text-[4.5px] text-slate-600 space-y-0.5 list-disc pl-2.5">
                  <li>Three dedicated garment plants with 1500+ sewing machinery and skilled workforce.</li>
                  <li>Specialized in intimate wear, sleepwear, athleisure, and sport garments.</li>
                  <li>Dedicated infrastructure to ensure perfect fit and style for the SOIE brand.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case 12:
      return (
        <div id="slide-p12" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            CAPABILITY SUMMARY
          </h2>

          <div className="flex-1 overflow-y-auto pr-0.5 z-10 space-y-0.5 py-0.5 scrollbar-thin">
            {[
              { label: 'YARN', text: 'Textured, crimp, Rotto yarn mfg; Cotton & Nylon twisting for embroidery and knitting.' },
              { label: 'FABRICS', text: 'Warp and Weft Knitted fabrics (Cotton, Poly, Nylon); GOTS Approved, Oeko-Tex 100 Certified.' },
              { label: 'ELASTICS', text: 'India’s leading Elastic manufacturer with woven, knitted, jacquard elastics utilizing Invista Lycra.' },
              { label: 'VALUE ADD', text: 'Digital & Sublimation printing, PUR Lamination, raising, embossing, foil print, laser cutting.' },
              { label: 'ACCESSORIES', text: 'In-house foam cups, hook & eye tapes, nylon laces, Schiffli embroidery, and Raschel laces.' },
              { label: 'GARMENTS', text: 'Pioneer in intimate apparel; exporting to US/Europe, and serving our domestic retail brands.' }
            ].map((row, idx) => (
              <div key={idx} className="flex border border-slate-150 rounded bg-slate-50/50">
                <div className="w-[60px] p-1 font-mono font-bold text-[5.5px] text-indigo-900 bg-slate-100 border-r border-slate-150 flex items-center justify-center shrink-0 uppercase tracking-wider text-center">
                  {row.label}
                </div>
                <div className="p-1 text-[4.8px] text-slate-600 leading-tight font-light flex-1">
                  {row.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 13:
      return (
        <div id="slide-p13" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            INTEGRATED VALUE CHAIN: GARMENT PARTS MAPPING
          </h2>

          <div className="grid grid-cols-2 gap-1.5 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="space-y-1">
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h5 className="font-bold text-[5.5px] text-indigo-900 uppercase leading-none">Embroidery Unit</h5>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-tight">• Lace developed by Embroidery Unit</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h5 className="font-bold text-[5.5px] text-indigo-900 uppercase leading-none">Support Engineering</h5>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-tight">• In-house interlining structures</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h5 className="font-bold text-[5.5px] text-indigo-900 uppercase leading-none">Weft Knitting</h5>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-tight">• Knit body fabric components</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h5 className="font-bold text-[5.5px] text-indigo-900 uppercase leading-none">Warp Knitting</h5>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-tight">• Fine mesh developed in-house</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h5 className="font-bold text-[5.5px] text-rose-900 uppercase leading-none">Hook & Clasp</h5>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-tight">• Eye & hook tapes manufactured in-house</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h5 className="font-bold text-[5.5px] text-rose-900 uppercase leading-none">Narrow Elastics</h5>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-tight">• Custom waistbands & strap elastics</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h5 className="font-bold text-[5.5px] text-rose-900 uppercase leading-none">Print Department</h5>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-tight">• Sublimation print patterns</p>
              </div>
              <div className="p-1 bg-slate-50 border border-slate-150 rounded text-left">
                <h5 className="font-bold text-[5.5px] text-rose-900 uppercase leading-none">Dyehouse</h5>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-tight">• Finished dyeing & stretch treatment</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 14:
      return (
        <div id="slide-p14" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            PRODUCT SPECTRUM
          </h2>

          <div className="flex-1 overflow-y-auto pr-0.5 z-10 grid grid-cols-2 gap-1 py-0.5 scrollbar-thin text-[4.8px] text-slate-600 font-light">
            {[
              "Raschel, Jaquardtronics & Textronic all over fabrics and laces",
              "Warp knit mesh, sports mesh, jersey - rigid & stretch",
              "Schiffili Embroideried Fabrics & Guipure trims",
              "Mutli-head embroidery with sequences and cords",
              "Single/Double jersey weft knits (cotton, polyester, nylon blends)",
              "Torchan laces and traditional crochet cotton laces",
              "Woven, knitted & jacquard elastics (scallop, frill, velvet, name tape)",
              "Nylon & Polyester crimp yarn and embroidery threads",
              "Sublimation prints, flock prints, PUR bonding, fleece peaching, raising",
              "Bra molded cups & hook-eye tapes",
              "Sublimation panels & customized print blocks",
              "Finished undergarments, nightwear, and activewear confection"
            ].map((item, idx) => (
              <div key={idx} className="p-1 bg-slate-50 border border-slate-150 rounded flex items-center space-x-1">
                <div className="w-1 h-1 bg-amber-500 rounded-full shrink-0" />
                <p className="leading-tight font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 15:
      return (
        <div id="slide-p15" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            ACCREDITATIONS & CERTIFICATES
          </h2>

          <div className="grid grid-cols-3 gap-1 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            {[
              { name: 'WRAP Compliance', code: 'WRAP', desc: 'Worldwide Responsible Accredited Production ensuring ethical labor and safety.' },
              { name: 'GOTS Organic Cotton', code: 'GOTS', desc: 'Global Organic Textile Standard certification from biological farming.' },
              { name: 'OHSAS 18001 Standard', code: 'OHSAS', desc: 'Occupational Health and Safety Assessment systems compliance.' },
              { name: 'Global Recycle Standard', code: 'GRS', desc: 'Validating post-consumer recycled polymer raw materials.' },
              { name: 'OEKO-TEX Standard 100', code: 'OEKO-TEX', desc: 'Skin-safe fabrics tested for hazardous chemical residues.' },
              { name: 'C-TPAT Certification', code: 'C-TPAT', desc: 'Customs-Trade Partnership Against Terrorism logistics validation.' }
            ].map((badge, idx) => (
              <div key={idx} className="p-1 bg-slate-50 border border-slate-150 rounded flex flex-col justify-between text-center h-[52px]">
                <div className="mx-auto w-4 h-4 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[5px] font-bold text-amber-800 font-mono">
                  {badge.code}
                </div>
                <div>
                  <h4 className="font-bold text-[5.5px] text-slate-900 leading-none">{badge.name}</h4>
                  <p className="text-[4.5px] text-slate-500 font-light leading-none truncate mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 16:
      return (
        <div id="slide-p16" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5 text-center">
            Major Customers
          </h2>

          <div className="grid grid-cols-3 gap-1.5 flex-1 overflow-y-auto pr-0.5 z-10 py-1.5 max-w-xl mx-auto w-full scrollbar-thin">
            {[
              { name: 'JOCKEY', tag: 'Licensed fit comfort' },
              { name: 'ENAMOR', tag: 'fabulous, as I am' },
              { name: 'NEXT SOURCING', tag: 'Global procurement' },
              { name: 'TRIUMPH', tag: 'Luxury lingerie' },
              { name: 'WALMART', tag: 'Global retail compliance' },
              { name: 'TCHIBO', tag: 'Premium European brand' },
              { name: 'SKECHERS', tag: 'Athletic wear components' },
              { name: 'CULT.SPORT', tag: 'Active compression wear' },
              { name: 'TRENDS', tag: 'Pan-India clothing partner' }
            ].map((client, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-1 rounded shadow-sm text-center flex flex-col justify-center min-h-[34px]">
                <span className="font-display font-extrabold text-[7px] text-slate-800 tracking-wider block leading-none">{client.name}</span>
                <span className="text-[4.5px] text-slate-400 font-light uppercase tracking-widest mt-0.5 block leading-none">{client.tag}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 17:
      return (
        <div id="slide-p17" className="w-full h-full flex flex-col justify-center items-center bg-white text-slate-800 relative overflow-hidden p-6 font-sans">
          <SlideBackground />
          <SlideLogoHeader />
          <div className="text-center relative z-10 max-w-lg">
            <h1 className="font-display font-light text-xl tracking-[0.12em] text-slate-800 uppercase">
              “Stretch” at the core
            </h1>
          </div>
        </div>
      );

    case 18:
      return (
        <div id="slide-p18" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            “Stretch” at the core
          </h2>

          <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="space-y-1 text-left text-[5px] text-slate-600 font-light leading-normal">
              <p>
                At Ginza we understand the importance of fit while maintaining the aesthetics of fashion and hence we lay special focus on the development of stretch fabrics. As a result of continuous innovation and improvements, we now make fabrics with upto 30% spandex. This has been achieved as a result of continuous investment in state of the art machinery to handle such delicate qualities.
              </p>
              <p className="font-semibold text-slate-800">
                • Our products find applications in Lingerie, underwear, shape wear & compression wear.
              </p>
              <p>
                • We specialize in stretch laces and allover fabrics, which give the finest design element along with functionality.
              </p>
              <p>
                • Active-wear fabrics represent a major segment where we offer a wide variety of blends in polyester, polyamide, viscose/modal with various spandex content and functional finishes.
              </p>
            </div>

            <div className="space-y-1 flex flex-col justify-center">
              <div className="p-1 bg-rose-50 border border-rose-100 rounded text-center">
                <span className="font-mono text-[5px] text-rose-800 block uppercase font-bold tracking-wider leading-none">Lingerie Fit</span>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-none">Posture corrector bras & support liners</p>
              </div>
              <div className="p-1 bg-blue-50 border border-blue-100 rounded text-center">
                <span className="font-mono text-[5px] text-blue-800 block uppercase font-bold tracking-wider leading-none">Active Engineering</span>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-none">Multi-directional stretch up to 30% spandex</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 19:
      return (
        <div id="slide-p19" className="w-full h-full flex flex-col justify-center items-center bg-white text-slate-800 relative overflow-hidden p-6 font-sans">
          <SlideBackground />
          <SlideLogoHeader />
          <div className="text-center relative z-10 max-w-lg">
            <h1 className="font-display font-light text-xl tracking-[0.12em] text-slate-800 uppercase">
              Retail Portfolio
            </h1>
          </div>
        </div>
      );

    case 20:
      return (
        <div id="slide-p20" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            RETAIL PORTFOLIO: SOIE
          </h2>

          <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="space-y-1 text-left text-[5px] text-slate-600 font-light leading-normal flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 mb-1 leading-none">
                  <span className="font-display font-black text-[9px] text-rose-600">SOIE</span>
                  <span className="text-[4px] font-mono text-slate-400">SWA-स्व</span>
                </div>
                <p className="leading-tight">
                  At SOIE, we embrace the magic of the possibilities within everyday life. SOIE is about ‘me’. Thus, it spearheads a fashion consciousness that defines how beautiful it is to be ‘me’ for a whole new generation. Each product is created with this special ‘I love me’ feeling representing our core identity. Focus on feminine strength, self-confidence and style.
                </p>
              </div>
              
              <button 
                onClick={() => window.open('https://www.soie.in', '_blank')}
                className="py-0.5 bg-slate-950 text-white rounded text-[4.5px] font-bold font-mono tracking-wider uppercase inline-flex items-center justify-center space-x-1 cursor-pointer w-20 hover:bg-slate-850"
              >
                <Globe className="w-1.5 h-1.5 text-amber-400" />
                <span>www.soie.in</span>
              </button>
            </div>

            <div className="space-y-1 flex flex-col justify-center">
              <div className="p-1 bg-rose-50/80 border border-rose-100 rounded text-center">
                <span className="font-mono text-[5px] text-rose-800 block uppercase font-bold tracking-wider leading-none">Celebrating you</span>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-none">"We love your curves as much as you do"</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 21:
      return (
        <div id="slide-p21" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          <SlideLogoHeader />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            RETAIL PORTFOLIO: HEKTOR
          </h2>

          <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="space-y-1 text-left text-[5px] text-slate-600 font-light leading-normal flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 mb-1 leading-none">
                  <span className="font-display font-black text-[9px] text-indigo-900">HEKTOR</span>
                  <span className="text-[4px] font-mono text-slate-400">Engineered Comfort</span>
                </div>
                <p className="leading-tight">
                  HEKTOR is Ginza Industries’ menswear brand, built on the philosophy of engineered comfort for Indian conditions. Designed with advanced bonded fabrics and nylon blends, Hektor delivers a modern wardrobe that balances performance, breathability, and everyday ease. Redesigned with contemporary aesthetics.
                </p>
              </div>
              
              <button 
                onClick={() => window.open('https://hektor.in/', '_blank')}
                className="py-0.5 bg-slate-950 text-white rounded text-[4.5px] font-bold font-mono tracking-wider uppercase inline-flex items-center justify-center space-x-1 cursor-pointer w-20 hover:bg-slate-850"
              >
                <Globe className="w-1.5 h-1.5 text-amber-400" />
                <span>hektor.in</span>
              </button>
            </div>

            <div className="space-y-1 flex flex-col justify-center">
              <div className="p-1 bg-indigo-50 border border-indigo-100 rounded text-center">
                <span className="font-mono text-[5px] text-indigo-850 block uppercase font-bold tracking-wider leading-none">Advanced Men's Wardrobe</span>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-none">Designed to Redefine performance essentials</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 22:
      return (
        <div id="slide-p22" className="w-full h-full flex flex-col bg-white text-slate-800 relative overflow-hidden p-3 font-sans justify-between text-left">
          <SlideBackground />
          
          <h2 className="font-display font-black text-[8px] text-slate-800 tracking-wider uppercase mb-1 z-10 border-b border-slate-100 pb-0.5">
            CONTACT US
          </h2>

          <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto pr-0.5 z-10 py-0.5 scrollbar-thin">
            <div className="text-left space-y-1.5">
              <div>
                <span className="text-[5px] uppercase tracking-wider font-mono text-amber-700 font-bold block leading-none">Head Office</span>
                <p className="font-bold text-[7px] text-slate-900 leading-tight">Ginza Industries Limited</p>
                <p className="text-[5px] text-slate-500 leading-tight font-light mt-0.5">
                  A-501, 502 Lotus Corporate Park, Off WEH, Goregaon East, Mumbai - 400063
                </p>
                <p className="text-[4.5px] text-slate-500 font-light mt-0.5 leading-none">Tel : +91 22 4065 9600</p>
                <p className="text-[4.5px] text-slate-500 font-light leading-none">Email : exports@ginzalimited.com</p>
              </div>

              <div className="border-t border-slate-150 pt-1">
                <span className="text-[4.5px] uppercase tracking-wider font-mono text-slate-400 font-bold block mb-0.5 leading-none font-semibold">Branches</span>
                <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[4px] text-slate-500 font-light leading-none">
                  <p>• Surat: Piyush (+91 77420 88735)</p>
                  <p>• Delhi: Vinay (+91 84486 99899)</p>
                  <p>• Mumbai: Vishal (+91 88057 96399)</p>
                  <p>• Ludhiana: Mahesh (+91 93229 76587)</p>
                  <p>• Bangalore: Murali (+91 95003 42401)</p>
                  <p>• Ahmedabad: Ravindra (+91 93761 68081)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center p-2 bg-slate-50/50 rounded-xl border border-slate-150 h-[105px]">
              <img 
                src="https://www.ginzalimited.com/cdn/shop/files/Ginza_logo.jpg?v=1668509673&width=500" 
                alt="Ginza Logo" 
                className="w-12 h-12 object-contain"
                referrerPolicy="no-referrer"
              />
              <p className="font-display font-black text-[9px] text-slate-900 tracking-wider mt-1 leading-none">GINZA</p>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-white text-slate-800">
          <p className="text-slate-400 text-xs font-mono">Page {page} Empty</p>
        </div>
      );
  }
}
