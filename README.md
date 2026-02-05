# PixelRoot32 Tool Suite Landing Page

Landing page for the PixelRoot32 Tool Suite, the definitive production suite for ESP32 and the PixelRoot32 ecosystem. Featuring the Tilemap Editor as its first module.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# (Optional) Link shared components library for local development
# Make sure to run 'npm link' in the components directory first
npm link pixelroot32-components-landing-page

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```text
├── public/                     # Static assets
│   ├── assets/                 # Feature screenshots & showcase images
│   ├── tool_suite_icon.png     # Branding assets (Square Icon)
│   ├── tool_suite_logo.png     # Alternative logo (Horizontal Text)
├── src/
│   ├── components/             # Modular UI components
│   │   ├── Navigation.ts       # Top navigation bar
│   │   ├── Hero.ts             # Hero section with CTA
│   │   ├── Features.ts         # Technical features grid
│   │   ├── Showcase.ts         # Visual gallery of editor sections
│   │   ├── Specs.ts            # Hardware constraints table
│   │   ├── Footer.ts           # Bottom credits and links
│   │   └── LanguageSwitcher.ts # Language toggle component
│   ├── i18n/                   # Internationalization system
│   │   └── index.ts            # Translations and store logic
│   ├── main.ts                # Application entry point
│   └── style.css              # Tailwind CSS v4 styles and theme
└── vite.config.ts             # Vite configuration
```

## 🛠️ Tech Stack

- **Vite** - Build tool and dev server
- **TypeScript** - Type safety and modern DX
- **Tailwind CSS v4** - Modern styling with `@tailwindcss/vite`
- **Vanilla JS** - Framework-less implementation for maximum performance
- **Custom i18n** - Built-in English and Spanish support
- **WebP Optimized** - Images served in .webp format for better performance

## 📊 Features

### ✅ Completed

- **Component-based architecture**: Modular and maintainable UI structure.
- **Internationalization (i18n)**: Native support for English and Spanish.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Brand Consistency**: Visual style aligned with the PixelRoot32 Tool Suite ecosystem.
- **Dark Mode UI**: Professional aesthetic designed for creators.

### 🔧 Configuration

#### Base Path for Deployment

Update the `base` path in `vite.config.ts` if deploying to a subpath (like GitHub Pages):

```typescript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

## 🚢 Deployment

### Manual Deployment

```bash
npm run build
# Deploy the `dist` folder to your hosting service
```

## 📝 Development

### Adding New Components

1. Create a new component in `src/components/ComponentName.ts`.
2. Export it from `src/components/index.ts`.
3. Import and render it in `src/main.ts`.

### Internationalization

To add or modify translations, edit the `i18n` object in `src/i18n/index.ts`. Keys are shared across languages to ensure consistency.

### Styling

- Use Tailwind utility classes directly in components.
- Custom theme variables (colors, fonts) are defined in `src/style.css` via `@theme`.
- Global styles and utility patterns are defined in `@layer base` and `@layer utilities`.

## 📄 License

See LICENSE file for details.
