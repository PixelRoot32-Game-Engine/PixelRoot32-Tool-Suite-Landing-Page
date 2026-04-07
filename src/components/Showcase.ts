import { i18n } from '../i18n';

type ModuleStatus = 'available' | 'coming-soon';
type ColorVariant = 'primary' | 'secondary' | 'retro';

interface ModuleFeature {
  titleKey: string;
  descriptionKey: string;
  image: string;
}

interface Module {
  id: string;
  titleKey: string;
  subtitleKey: string;
  icon: string;
  color: ColorVariant;
  status: ModuleStatus;
  features: ModuleFeature[];
}

const tilemapIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>`;

const musicIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`;

const modules: Module[] = [
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
        image: './assets/main-canvas-section.webp'
      },
      {
        titleKey: 'showcase.tileset.title',
        descriptionKey: 'showcase.tileset.description',
        image: './assets/tileset-section.webp'
      },
      {
        titleKey: 'showcase.layers.title',
        descriptionKey: 'showcase.layers.description',
        image: './assets/layers-section.webp'
      },
      {
        titleKey: 'showcase.scenes.title',
        descriptionKey: 'showcase.scenes.description',
        image: './assets/scenes-section.webp'
      },
      {
        titleKey: 'showcase.animation.title',
        descriptionKey: 'showcase.animation.description',
        image: './assets/animation-panel.webp'
      },
      {
        titleKey: 'showcase.export.title',
        descriptionKey: 'showcase.export.description',
        image: './assets/export-settings.webp'
      }
    ]
  },
  {
    id: 'music',
    titleKey: 'showcase.module.music.title',
    subtitleKey: 'showcase.module.music.subtitle',
    icon: musicIcon,
    color: 'secondary',
    status: 'coming-soon',
    features: []
  }
];

function renderModuleHeader(module: Module): string {
  const statusBadge = module.status === 'coming-soon'
    ? `<span class="inline-block px-3 py-1 bg-${module.color}/10 border border-${module.color}/20 text-${module.color} text-xs font-mono ml-3 uppercase">Coming Soon</span>`
    : '';

  return `
    <div class="flex items-center gap-4 mb-8">
      <div class="w-10 h-10 flex items-center justify-center bg-${module.color}/10 border border-${module.color}/20 text-${module.color}">
        ${module.icon}
      </div>
      <div>
        <h3 class="text-2xl font-black">${i18n.t(module.titleKey)}</h3>
        <p class="text-text-muted text-sm">${i18n.t(module.subtitleKey)}${statusBadge}</p>
      </div>
    </div>
  `;
}

function renderFeature(item: ModuleFeature, index: number, color: ColorVariant): string {
  return `
    <div class="flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24">
      <div class="flex-1">
        <div class="inline-block px-3 py-1 bg-${color}/10 border border-${color}/20 text-${color} text-xs font-mono mb-4 uppercase">
          Tool Focus
        </div>
        <h4 class="text-3xl font-black mb-4">${i18n.t(item.titleKey)}</h4>
        <p class="text-text-muted text-lg leading-relaxed mb-8">${i18n.t(item.descriptionKey)}</p>
      </div>
      <div class="flex-1 w-full flex justify-center">
        <div class="bg-surface border-4 border-black shadow-block hover:shadow-block-hover transition-all">
          <img src="${item.image}" alt="${i18n.t(item.titleKey)}" class="h-auto pixel-art">
        </div>
      </div>
    </div>
  `;
}

function renderModule(module: Module): string {
  if (module.status !== 'available' || module.features.length === 0) {
    return `
      <div class="py-12">
        ${renderModuleHeader(module)}
        <div class="text-center py-12 border-2 border-dashed border-border-ui rounded-lg">
          <p class="text-text-muted">${i18n.t('showcase.module.coming_soon') || 'More features coming soon...'}</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="py-8">
      ${renderModuleHeader(module)}
      <div class="space-y-16">
        ${module.features.map((feature, index) => renderFeature(feature, index, module.color)).join('')}
      </div>
    </div>
  `;
}

export function Showcase(): string {
  const availableModules = modules.filter(m => m.status === 'available');

  return `<section id="showcase" class="py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl lg:text-5xl font-black mb-4 tracking-tight">${i18n.t('showcase.title')}</h2>
      <p class="text-text-muted text-lg max-w-2xl mx-auto">${i18n.t('showcase.subtitle')}</p>
    </div>

    <div class="space-y-8">
      ${availableModules.map(module => renderModule(module)).join('')}
    </div>
  </div>
</section>`;
}