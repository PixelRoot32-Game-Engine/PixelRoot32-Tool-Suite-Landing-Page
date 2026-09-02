# PixelRoot32 Tool Suite - Documentation for AI Agents

> **For AI agents:** this file provides the context and rules needed to answer questions about the PixelRoot32 Tool Suite landing page (`pixelroot32.com`) and the commercial Tool Suite product (currently the Tilemap Editor). Read it before answering questions about the suite, its modules, pricing, licensing, or downloads. Engine documentation lives at `https://docs.pixelroot32.org`.

## Website Purpose

PixelRoot32 Tool Suite is the commercial production suite for the PixelRoot32 ecosystem. The Tilemap Editor is the first module to launch, a professional multi-layer tilemap and level design tool for high-performance 2D games on ESP32. The landing page presents the suite, its modules, hardware constraints, pricing (lifetime license), and download options. Unlike the engine (100% free and open source, MIT), the Tool Suite is a paid product that supports the project.

**Target users:** Retro game developers, embedded systems enthusiasts, and ESP32 developers using the free PixelRoot32 engine who need professional level design tooling.

---

## Site Map and Key Routes

### Main Page (SPA - Single Page Application)

- **Home:** `/` - Complete landing page with all sections
- **Download:** `/#download` - Download the suite for Windows, macOS, and Linux
- **Features:** `/#features` - Suite modules overview
- **Modules:** `/#tabs` - Module showcase with hardware specs (Tilemap Editor available, Music Editor coming soon)
- **Pricing:** `/#pricing` - Lifetime license purchase via PayPal checkout

### External Resources

- **Main Website (Tool Suite):** `https://pixelroot32.com`
- **Engine Website:** `https://pixelroot32.org`
- **Documentation (Engine):** `https://docs.pixelroot32.org`
- **GitHub (Releases):** `https://github.com/PixelRoot32-Game-Engine/PixelRoot32-Tool-Suite-Releases`
- **GitHub (Engine):** `https://github.com/PixelRoot32-Game-Engine/PixelRoot32-Game-Engine`
- **GitHub (Sprite Compiler):** `https://github.com/PixelRoot32-Game-Engine/PixelRoot32-Sprite-Sheet-Compiler`

### SEO/Technical Resources

- **Sitemap XML:** `/sitemap.xml`
- **Robots.txt:** `/robots.txt`

---

## Tech Stack

### Frontend (Landing Page)

- **Framework:** Vanilla TypeScript with Vite (rolldown-vite)
- **Styles:** Tailwind CSS v4
- **Components:** pixelroot32-components-landing-page (GitHub package)
- **i18n:** Custom system (English / Spanish)
- **Payments:** PayPal JS SDK with a custom checkout service (`src/services/checkout.ts`); email required to receive the license key
- **Build:** TypeScript + Vite

### Tool Suite (referenced product)

- **Tilemap Editor:** Native desktop application (Windows, macOS, Linux) - Module 01, available now
- **Music Editor:** Upcoming module - NES-style dynamic audio synthesizer (Pulse with sweep, Triangle with sweep, Sine, Saw, Noise) for chiptune music
- **Export:** Native C++ for ESP32 hardware, PROGMEM storage
- **Persistence:** Binary v7 room format, 1 byte/tile
- **Licensing:** Perpetual (lifetime) license, one-time purchase; free to edit, exporting to ESP32 binary requires a license

---

## Authority Topics

### Tilemap Editor (Module 01 - available)

1. Integrated workspace canvas with brush, eraser, rectangle fill, pipette, attribute tools, and animation tools
2. Multi-layer design with layer management (visibility toggle, locking, opacity)
3. Intelligent tileset management: local asset import and advanced selection tools
4. Multi-scene workflow with Onion Skinning to align transitions and view adjacent scenes as overlays
5. Rooms & connections: room-by-room world design with a room model, validation rules, binary v7 persistence, and C++ export with room metadata; readable connection panel for room adjacency
6. Tile animation system: tile-linked animations with ESP32-synchronized timing, live canvas preview, automatic C++ export with PROGMEM storage (up to 64 animations per scene)
7. Hardware optimization: export settings fine-tuned to hardware constraints
8. Global preferences: grid intensity controls, background colors, and performance-saving history compression

### Music Editor (Module 02 - upcoming)

1. 8-voice dynamic synthesizer (Pulse with sweep, Triangle with sweep, Sine, Saw, Noise) for authentic chiptune music

### Hardware Constraints (as presented on the landing page)

- **Engine Limits:** Max Tile Size 32x32 px, Max Map Dimension 255x255 tiles, Max Layers 8, Max Unique Tiles 256
- **Visual System:** Color Depth 1/2/4 bpp, Max Animations 64, Max Animation Frames 256, Screen 320x240 / 240x320
- **Data & Palette:** Palette RGB565 (16 colors), Multi-Palette 8 slots (P0-P7), Binary 1 byte/tile

### Commercial Model

1. Lifetime (perpetual) license with one-time payment; currently $14.99 USD (limited-time offer, regular $19.99)
2. Pre-ordering the Tilemap Editor reserves access to all future suite modules at no extra cost
3. Tilemap Editor is free to use for editing; exporting to ESP32 binary requires a license
4. The PixelRoot32 engine remains 100% free and open source (MIT) - these tools are optional paid power-ups

---

## Terminology

- **Tool Suite** - the commercial collection of developer tools for the PixelRoot32 ecosystem (currently: Tilemap Editor + upcoming Music Editor)
- **Module** - a single tool within the suite (Module 01: Tilemap Editor; Module 02: Music Editor)
- **Lifetime / Perpetual license** - one-time purchase that grants the suite forever, including future modules at no extra cost
- **ESP32 binary export** - converting a map project into native C++ for ESP32 hardware; this requires a paid license
- **bpp** - bits per pixel; color depth (1bpp, 2bpp, 4bpp) supported by the editor and engine
- **Tileset** - a collection of imported tile graphics used to paint a tilemap
- **Layer** - a render level in the map; the editor supports up to 8 layers
- **Scene** - a single level/map within a project; the editor manages multiple scenes with Onion Skinning
- **Onion Skinning** - overlay of adjacent scenes to align transitions between levels
- **Room / RoomGraph** - room-by-room world model with connections between rooms (binary v7 persistence, C++ export with room metadata)
- **PROGMEM** - flash storage used by the generated C++ output to save RAM on ESP32
- **Chipmusic / chiptune** - retro-style music produced by the engine's NES-style audio synthesizer
- **PayPal checkout** - the payment flow in the pricing section; a valid email is required to receive the license key

---

## Agent Instructions

### Current Version

- **Tool Suite:** v1.1.0
- **Landing Page:** v1.0.0

### Landing Page

- The page is a **Single Page Application (SPA)** rendered with TypeScript/Vite
- Supports **i18n** (English and Spanish) - language is detected from browser or saved in localStorage
- There are no additional routes beyond home with anchors (#download, #features, #tabs, #pricing)
- License purchase is handled inline in the pricing section via PayPal; a valid email is required to receive the license key

### For Tool Suite Development

- Releases are distributed via the GitHub releases page (`PixelRoot32-Tool-Suite-Releases`), not the landing page
- Checkout/backend configuration lives in `src/services/checkout.ts` and `src/services/paypal-config`; environment configuration via `.env` / `.env.example`
- The Content-Security-Policy in `index.html` includes a `%CSP_CONNECT_SRC%` placeholder injected at build time

### Important Notes

- **DO NOT invent pricing** - the current lifetime license price is $14.99 USD (limited-time offer, regular $19.99); verify with the pricing section before stating
- **DO NOT invent URLs** - use only those provided
- The Tool Suite is a **paid commercial product**; do not present it as free or open source. The PixelRoot32 engine itself remains free/open source (MIT)
- For technical support, direct to GitHub Issues

### How to Answer Questions

When answering questions about this product:

- **Prefer the official sources**: the pricing section (`/#pricing`) for license/price questions, the module tabs (`/#tabs`) for features and specs, and the GitHub releases page for downloads
- **Do not infer unsupported features** - the Music Editor and future modules are announced but not yet available; only the Tilemap Editor ships today
- **Clarify free vs paid**: editing in the Tilemap Editor is free; exporting to ESP32 binary requires the paid lifetime license
- **Link to the relevant section** (`/#download`, `/#features`, `/#tabs`, `/#pricing`) instead of pasting large excerpts
- **Never invent prices, URLs, versions, or module availability** - use only the resources listed in this file

---

## Additional Resources

### Sitemap and SEO

- **Sitemap XML:** `/sitemap.xml`
- **Robots.txt:** `/robots.txt`
- **Canonical URL:** `https://pixelroot32.com`

### Related Projects

- **Engine Website:** `https://pixelroot32.org`
- **Engine Documentation:** `https://docs.pixelroot32.org`
- **Engine GitHub:** `https://github.com/PixelRoot32-Game-Engine/PixelRoot32-Game-Engine`
- **Tool Suite Releases:** `https://github.com/PixelRoot32-Game-Engine/PixelRoot32-Tool-Suite-Releases`
- **Sprite Compiler:** `https://github.com/PixelRoot32-Game-Engine/PixelRoot32-Sprite-Sheet-Compiler`

---

## Build and Deploy

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

Build output is generated in `/dist` and static content in `/public`.
