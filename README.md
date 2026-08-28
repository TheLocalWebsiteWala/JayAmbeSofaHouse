# 🛋️ Jay Ambe Sofa House — Official Website

> **Premium Handcrafted Sofas & Bespoke Furnishings | Dindoli, Surat, Gujarat**

[![Website Status](https://img.shields.io/badge/Status-Live-success?style=flat-square)](https://jayambesofa.com)
[![Rating](https://img.shields.io/badge/Google%20Rating-4.9%20★-f59e0b?style=flat-square)](https://maps.google.com)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20Vanilla%20CSS%20%7C%20ES6%20JS-blue?style=flat-square)](#-tech-stack)
[![PWA Ready](https://img.shields.io/badge/PWA-Supported-6366f1?style=flat-square)](site.webmanifest)

---

## 📖 Overview

**Jay Ambe Sofa House** is a modern, high-performance static web application built for an artisanal furniture showroom and manufacturing workshop based in Dindoli, Surat. 

The website showcases bespoke handcrafted sofas, teak/sagwan dining tables, accent chairs, luxury swings, fluted sideboards, mattresses, and designer curtains. It provides customers with an interactive furniture catalogue, real-time WhatsApp inquiry integration, showroom visiting details, and rich local SEO structured data.

---

## ✨ Key Features

### 🌟 Design & User Experience
- **Luxury Editorial Aesthetics**: Warm neutral tones (`#f4efe8`), brass/tan accents (`#b98f5e`), and elegant typography pairing (*Instrument Serif* & *DM Sans*).
- **Fully Responsive Layout**: Fluid typography and spacing using CSS `clamp()` for flawless display across mobile, tablet, and widescreen monitors.
- **Micro-Animations & Transitions**: Smooth scroll reveal effects using `IntersectionObserver`, interactive hover elevations, and accessible drawer navigation.
- **Media Optimization**: Next-gen WebP image formats with fallback assets for lightning-fast page loading.

### 🛍️ Dynamic Product Catalog (`collection.html`)
- Real-time client-side category filtering (Sofas, Sideboards, Chairs, Swings, Dining Tables).
- Detailed product cards featuring pricing in INR (₹), dimensions, materials, lead times, and ratings.
- Interactive **Product Detail Modal** with high-resolution image preview and one-click direct WhatsApp quotation links.

### 📍 Local Business & Trust Signals
- **Google Reviews Integration**: Highlighting a verified 4.9★ rating with customer testimonials.
- **Showroom Location & Contact**: Interactive Google Maps embed, showroom timings (10:00 AM – 10:00 PM), and complete address opposite DMart, Dindoli, Surat.
- **Direct WhatsApp Inquiry**: Auto-filled WhatsApp message templates for custom sizing, fabric selection, and showroom appointment scheduling.

### 🔍 Comprehensive SEO & Structured Data
- Schema.org JSON-LD microdata on every page (`FurnitureStore`, `FAQPage`, `BreadcrumbList`, `CollectionPage`, `ContactPage`, `AboutPage`).
- Complete OpenGraph and Twitter Card social sharing metadata.
- Pre-configured `sitemap.xml` and `robots.txt` for rapid search engine indexing.
- Progressive Web App manifest (`site.webmanifest`) and cross-platform icons.

---

## 🗂️ Project Structure

```text
Jay Ambe Sofa House/
├── index.html            # Homepage (Hero, Highlights, Workshop, Reviews, FAQ)
├── collection.html       # Furniture Catalog & Filterable Collection
├── about.html            # Brand Story, Materials & Master Craftsmanship
├── contact.html          # Contact Form, Map, Directions & Inquiries
├── 404.html              # Custom 404 Error Page
├── styles.css            # Complete Unified CSS Design System & Utility Classes
├── main.js               # Global UI Script (Navigation, Modals, Scroll Reveals, FAQs)
├── products.js           # Catalog Data & Client-side Filtering Logic
├── products.json         # Raw Product Data Schema
├── blog_data.json        # Supplementary Content & Guides
├── site.webmanifest      # PWA Web Application Manifest
├── sitemap.xml           # XML Sitemap for Search Engines
├── robots.txt            # Search Engine Crawler Directives
├── img/                  # Optimized Media Assets (WebP / PNG / JPG)
│   ├── logo.webp         # Brand Identity Logos
│   ├── sofa-1.webp       # Product Gallery & Showroom Visuals
│   ├── chair-1.webp      # Furniture Photography
│   └── favicon.png       # Site Favicons & Touch Icons
└── README.md             # Project Documentation
```

---

## 🛠️ Tech Stack & Architecture

- **Markup**: Semantic HTML5 with accessibility best practices (`aria-*` labels, role management).
- **Styles**: Vanilla CSS3 (Custom Properties / CSS Variables, Flexbox, CSS Grid, `clamp()`, zero external CSS frameworks).
- **Scripts**: Clean, vanilla ES6 JavaScript (Zero third-party library dependencies for high performance).
- **Typography**: Google Fonts (*Instrument Serif* and *DM Sans* via preconnect links).
- **Hosting / Deployment**: Ready for static hosting platforms like Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 🚀 Getting Started Locally

Since the project uses pure vanilla web technologies with no build steps required, you can run it locally with any simple HTTP server:

### Option 1: Using Python
```bash
# Python 3
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Option 2: Using Node.js / npx (`serve`)
```bash
npx serve .
```

### Option 3: VS Code Live Server
1. Install the **Live Server** extension in VS Code.
2. Right-click on `index.html` and select **"Open with Live Server"**.

---

## 🚢 Deployment

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=.
```

---

## 📍 Business Information

- **Brand**: Jay Ambe Sofa House
- **Showroom Address**: Shop No. 23, Green Residency, Near Madhav Crest, Opposite Dmart, Dindoli, Surat, Gujarat - 394210
- **Operating Hours**: Monday – Sunday: 10:00 AM – 10:00 PM
- **Instagram**: [@_jay_ambe_sofa_house_](https://www.instagram.com/_jay_ambe_sofa_house_)

---

## 📄 License & Attribution

All custom furniture designs, branding elements, photographs, and website content are proprietary to **Jay Ambe Sofa House**.  
Website codebase is configured for commercial deployment.
