/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogueItem, InstagramPost } from './types';

export const GINZA_INFO = {
  name: "Ginza Limited",
  booth: "Hall 2FF , STALL No.2F-B1",
  exhibition: "Bharat Tex 2026",
  location: "Pragati Maidan,New Delhi, India",
  tagline: " ",
  phone: "+91 22 4030 1111",
  email: "exports@ginzalimited.com",
  website: "https://www.ginzalimited.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAS5zGZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAafc2s3IwyB8mg60bfPUFmfUs5VK0iAB-G8lplM0IRIx5vPYRHccLlv4JeTZnw_aem_PGS-oS4tnTxC9N_bzP8PNQ",
  instagram: "https://www.instagram.com/ginza.industries.limited?igsh=NTZsbHZjenl2YTh1",
  about: "Established in 1986, Ginza Limited is India's leading integrated manufacturer of premium warp-knitted fabrics, exquisite Raschel & embroidery laces, and high-performance narrow elastics. Catering to major global brands in intimate wear, athleisure, and technical textiles, our state-of-the-art facilities in Surat and Mumbai employ European technologies to deliver unmatched quality, precision, and sustainable innovation.",
  stats: [
    { label: "Years of Excellence", value: "39+" },
    { label: "Global Brand Partners", value: "120+" },
    { label: "Daily Production Capacity", value: "15 Tons" },
    { label: "Sustainability Certifications", value: "Oeko-Tex / GRS" }
  ],
  certifications: [
    { title: "Oeko-Tex Standard 100", issuer: "OEKO-TEX Association", desc: "Guarantees textile products are free of harmful substances and completely safe for skin contact." },
    { title: "Global Recycled Standard (GRS)", issuer: "Textile Exchange", desc: "Verifies recycled content in our eco-line polyesters and tracking materials from source to final fabric." },
    { title: "ISO 9001:2015", issuer: "TUV SUD", desc: "Certified quality management system across design, development, and manufacturing of warp knits and elastics." },
    { title: "Higg Index Verified", issuer: "Sustainable Apparel Coalition", desc: "Measures and evaluates our environmental and social sustainability performance across production cycles." }
  ]
};

export const CATEGORIES = [
  "All Products",
  "NYLON LACE",
  "GPO DULL POLYESTER LACE",
  "GPO COTTON LACE",
  "COTTON ALLOVER"
];

export const CATALOGUE_ITEMS: CatalogueItem[] = [
  {
    id: "nylon-lace",
    code: "GZ-LACE-NYLON-01",
    title: "Nylon Lace",
    category: "NYLON LACE",
    image: "https://images.unsplash.com/photo-1599933589046-9b8308b5b50d?w=600&auto=format&fit=crop&q=80",
    description: "Premium nylon lace featuring exquisite floral detailing, high tensile strength, and a luxurious soft hand feel. Ideal for high-end lingerie, intimate wear, and couture paneling.",
    composition: "100% Nylon",
    weight: "85 GSM",
    width: "44 Inches (112 cm)",
    features: ["Intricate floral details", "High-gauge stitch definition", "Ultra-soft touch", "Excellent dye consistency"],
    pdfUrl: "https://drive.google.com/file/d/1A0JJ6q0Nad4SqIZuJyZw8la0BZuMrUKq/view?usp=drive_link"
  },
  {
    id: "gpo-dull-polyester",
    code: "GZ-LACE-GPO-DULL",
    title: "GPO Dull Polyester Lace",
    category: "GPO DULL POLYESTER LACE",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=80",
    description: "Elegant Guipure (GPO) dull polyester lace with a classic matte finish. Featuring detailed chemical lace openwork and high dimensional stability, perfect for premium womenswear.",
    composition: "100% Dull Polyester",
    weight: "150 GSM",
    width: "52 Inches (132 cm)",
    features: ["Sophisticated matte appearance", "Intricate Guipure openwork", "Robust wear durability", "Excellent crease recovery"],
    pdfUrl: "https://drive.google.com/file/d/1z-wmaMcm5SWrydgx80P-GUyeMs97jkT2/view?usp=drive_link"
  },
  {
    id: "gpo-cotton-lace",
    code: "GZ-LACE-GPO-COTTON",
    title: "GPO Cotton Lace",
    category: "GPO COTTON LACE",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
    description: "Exquisite Guipure (GPO) lace made of 100% premium combed cotton yarns. Offers a rich, natural hand-feel and high breathability, ideal for resort wear and summer dresses.",
    composition: "100% Combed Cotton",
    weight: "185 GSM",
    width: "48 Inches (122 cm)",
    features: ["100% natural combed cotton", "Heavy dimensional stitch profile", "Skin-friendly & breathable", "Biodegradable composition"],
    pdfUrl: "https://drive.google.com/file/d/1UFOgsaRrJ1sbTXlWEEDVGIydUGUzMwfY/view?usp=drive_link"
  },
  {
    id: "cotton-allover",
    code: "GZ-ALLOVER-COTTON",
    title: "Cotton Allover",
    category: "COTTON ALLOVER",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80",
    description: "Delicate continuous allover cotton fabric featuring lovely embroidered eyelets and floral patterns. Highly breathable and absorbent, designed for premium feminine garments.",
    composition: "100% Organic Cotton",
    weight: "110 GSM",
    width: "54 Inches (137 cm)",
    features: ["Airy lightweight comfort", "Intricate eyelet embroidery", "High moisture absorption", "Eco-friendly natural fibers"],
    pdfUrl: "https://drive.google.com/file/d/1JSfeq6USIaD8KMtiloI8l4ZZYmQpI60C/view?usp=drive_link"
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "post-1",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80",
    caption: "Live from #BharatTex2026! 🇮🇳 Our team is thrilled to welcome global buyers at Hall 2, Booth H2-B14. Step in to explore our latest collection of sustainable tricots and luxury stretch laces. #TextileInnovation #MakeInIndia #WarpKnitting #SustainableFashion #GinzaLimited",
    likes: 412,
    commentsCount: 24,
    date: "1 day ago"
  },
  {
    id: "post-2",
    image: "https://images.unsplash.com/photo-1582142306909-195724d33ab0?w=600&auto=format&fit=crop&q=80",
    caption: "Crafting perfection, thread by thread. Our premium high-gauge Tricots offer an incomparable buttery-soft hand feel coupled with medical-grade compression. Certified safe by OEKO-TEX Standard 100. 🌸🌿 #LingerieFabrics #ActivewearIndia #OekoTexCertified #StretchFabrics #GinzaTextiles",
    likes: 328,
    commentsCount: 15,
    date: "3 days ago"
  },
  {
    id: "post-3",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&auto=format&fit=crop&q=80",
    caption: "Introducing ECO-STRETCH: Our circular-economy collection engineered using 100% GRS-certified post-consumer recycled polyamide. Retains the identical strength and premium stretch profile of virgin fibers, with a drastically lower carbon footprint. ♻️🌎 #CircularFashion #GRSCertified #EcoFriendlyTextiles #GreenFashion #SuratTextiles",
    likes: 562,
    commentsCount: 38,
    date: "5 days ago"
  },
  {
    id: "post-4",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    caption: "High-modulus narrow elastics designed for sportspersons. High tension stability, wave-applied premium medical silicone, and skin-friendly plush backs. Built to withstand over 100 industrial wash cycles. 🚴‍♂️🏃‍♀️ #ActivewearConstruction #TrimManufacturing #SiliconeGripper #NarrowFabrics #GinzaNarrowElastic",
    likes: 219,
    commentsCount: 9,
    date: "1 week ago"
  },
  {
    id: "post-5",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80",
    caption: "Delicacy meets strength. Our Raschel stretch laces feature intricate floral motifs outlined in heavy corded yarns for an exquisite 3D effect. Designed in collaboration with European fashion ateliers. 👗✨ #RaschelLace #StretchLace #CoutureLingerie #FashionDesignersIndia #ApparelManufacturing",
    likes: 489,
    commentsCount: 31,
    date: "1 week ago"
  },
  {
    id: "post-6",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=600&auto=format&fit=crop&q=80",
    caption: "Warp-knitting technological advancement. A look inside our Surat production unit, operating 24/7 with computerized Karl Mayer machines to deliver maximum consistency and lead-time reductions. ⚙️📐 #KarlMayer #WarpKnittingLooms #SuratIndustry #AutomatedTextiles #IndustrialWarpKnits",
    likes: 388,
    commentsCount: 19,
    date: "2 weeks ago"
  }
];
