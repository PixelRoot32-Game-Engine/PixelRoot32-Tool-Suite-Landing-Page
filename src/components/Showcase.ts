import { i18n } from '../i18n';
import { Tabs } from './Tabs';

const tilemapIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>`;

const musicIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`;

// Icons for specs
const tileIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>`;

const mapIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A2 2 0 013 15.483V8.517a2 2 0 011.553-1.793L9 4m0 16v-8m0 8l5.447-2.724A2 2 0 0021 15.483V8.517a2 2 0 00-1.553-1.793L15 4m0 16v-8m0-8l-5.447 2.724L9 4m6 0l-5.447 2.724L15 4"></path></svg>`;

const layersIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"></path></svg>`;

const colorIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>`;

type ModuleStatus = 'available' | 'coming-soon';
type ColorVariant = 'primary' | 'secondary' | 'retro';

interface ModuleFeature {
  titleKey: string;
  descriptionKey: string;
  image: string;
}

interface ModuleSpec {
  labelKey: string;
  icon: string;
}

interface ModuleTab {
  id: string;
  titleKey: string;
  subtitleKey?: string;
  icon: string;
  color: ColorVariant;
  status: ModuleStatus;
  features: ModuleFeature[];
  specs: ModuleSpec[];
}

const modules: ModuleTab[] = [
  {
    id: 'tilemap',
    titleKey: 'showcase.module.tilemap.title',
    subtitleKey: 'showcase.module.tilemap.subtitle',
    icon: tilemapIcon,
    color: 'primary',
    status: 'available',
    features: [
      {
        titleKey: 'showcase.editor.title',
        descriptionKey: 'showcase.editor.description',
        image: './assets/tilemap/main-canvas-section.webp'
      },
      {
        titleKey: 'showcase.tileset.title',
        descriptionKey: 'showcase.tileset.description',
        image: './assets/tilemap/tileset-section.webp'
      },
      {
        titleKey: 'showcase.layers.title',
        descriptionKey: 'showcase.layers.description',
        image: './assets/tilemap/layers-section.webp'
      },
      {
        titleKey: 'showcase.scenes.title',
        descriptionKey: 'showcase.scenes.description',
        image: './assets/tilemap/scenes-section.webp'
      },
      {
        titleKey: 'showcase.animation.title',
        descriptionKey: 'showcase.animation.description',
        image: './assets/tilemap/animation-panel.webp'
      },
      {
        titleKey: 'showcase.export.title',
        descriptionKey: 'showcase.export.description',
        image: './assets/tilemap/export-settings.webp'
      }
    ],
    specs: [
      { labelKey: 'specs.tile_size', icon: tileIcon },
      { labelKey: 'specs.map_dim', icon: mapIcon },
      { labelKey: 'specs.layers', icon: layersIcon },
      { labelKey: 'specs.color', icon: colorIcon }
    ]
  },
  {
    id: 'music',
    titleKey: 'showcase.module.music.title',
    subtitleKey: 'showcase.module.music.subtitle',
    icon: musicIcon,
    color: 'secondary',
    status: 'coming-soon',
    features: [],
    specs: []
  }
];

export function Showcase(): string {
  return Tabs({
    tabs: modules,
    defaultTabId: 'tilemap',
    i18n,
    translations: {
      showcaseTitle: i18n.t('showcase.title'),
      specsTitle: i18n.t('specs.title'),
      comingSoon: i18n.t('showcase.module.coming_soon')
    }
  });
}