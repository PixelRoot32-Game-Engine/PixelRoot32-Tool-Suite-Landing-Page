import { i18n } from '../i18n';

type ModuleStatus = 'available' | 'coming-soon';
type ColorVariant = 'primary' | 'secondary' | 'retro';

interface ModuleSpec {
  labelKey: string;
  icon: string;
}

interface Module {
  id: string;
  titleKey: string;
  color: ColorVariant;
  status: ModuleStatus;
  specs: ModuleSpec[];
}

const tilemapIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>`;

const mapIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A2 2 0 013 15.483V8.517a2 2 0 011.553-1.793L9 4m0 16v-8m0 8l5.447-2.724A2 2 0 0021 15.483V8.517a2 2 0 00-1.553-1.793L15 4m0 16v-8m0-8l-5.447 2.724L9 4m6 0l-5.447 2.724L15 4"></path></svg>`;

const layersIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"></path></svg>`;

const colorIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>`;

const modules: Module[] = [
  {
    id: 'tilemap',
    titleKey: 'specs.module.tilemap.title',
    color: 'primary',
    status: 'available',
    specs: [
      { labelKey: 'specs.tile_size', icon: tilemapIcon },
      { labelKey: 'specs.map_dim', icon: mapIcon },
      { labelKey: 'specs.layers', icon: layersIcon },
      { labelKey: 'specs.color', icon: colorIcon }
    ]
  }
];

function renderModuleSpecs(module: Module): string {
  return `
    <div class="mb-12 last:mb-0">
      <div class="flex items-center gap-3 mb-6">
        <h3 class="text-xl font-black text-${module.color}">${i18n.t(module.titleKey)}</h3>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
        ${module.specs.map(spec => `
          <div class="flex items-center gap-6 p-6 bg-surface border border-border-ui shadow-block">
            <div class="w-12 h-12 flex-shrink-0 bg-${module.color}/10 flex items-center justify-center">
              <div class="text-${module.color}">${spec.icon}</div>
            </div>
            <span class="font-mono font-bold text-base">${i18n.t(spec.labelKey)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function Specs(): string {
  const availableModules = modules.filter(m => m.status === 'available');

  return `<section id="specs" class="py-24 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row items-center gap-16">
      <div class="lg:w-1/3">
        <h2 class="text-3xl lg:text-5xl font-black mb-4 tracking-tight">${i18n.t('specs.title')}</h2>
        <p class="text-text-muted text-lg">${i18n.t('specs.subtitle')}</p>
      </div>
      
      <div class="lg:w-2/3">
        ${availableModules.map(module => renderModuleSpecs(module)).join('')}
      </div>
    </div>
  </div>
</section>`;
}