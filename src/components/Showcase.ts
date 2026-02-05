import { i18n } from '../i18n';

export function Showcase(): string {
  const items = [
    {
      title: i18n.t('showcase.editor.title'),
      description: i18n.t('showcase.editor.description'),
      image: 'assets/main-canvas-section.webp',
      color: 'primary'
    },
    {
      title: i18n.t('showcase.scenes.title'),
      description: i18n.t('showcase.scenes.description'),
      image: 'assets/scenes-section.webp',
      color: 'secondary'
    },
    {
      title: i18n.t('showcase.layers.title'),
      description: i18n.t('showcase.layers.description'),
      image: 'assets/layers-section.webp',
      color: 'retro'
    },
    {
      title: i18n.t('showcase.export.title'),
      description: i18n.t('showcase.export.description'),
      image: 'assets/export-settings.webp',
      color: 'primary'
    }
  ];

  return `<section id="showcase" class="py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl lg:text-5xl font-black mb-4 tracking-tight">${i18n.t('showcase.title')}</h2>
      <p class="text-text-muted text-lg max-w-2xl mx-auto">${i18n.t('showcase.subtitle')}</p>
    </div>

    <div class="space-y-24">
      ${items.map((item, index) => `
        <div class="flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24">
          <div class="flex-1">
            <div class="inline-block px-3 py-1 bg-${item.color}/10 border border-${item.color}/20 text-${item.color} text-xs font-mono mb-4 uppercase">
              Tool Focus
            </div>
            <h3 class="text-3xl font-black mb-4">${item.title}</h3>
            <p class="text-text-muted text-lg leading-relaxed mb-8">${item.description}</p>
          </div>
          <div class="flex-1 w-full flex justify-center">
            <div class="bg-surface border-4 border-black shadow-block hover:shadow-block-hover transition-all">
              <img src="${item.image}" alt="${item.title}" class="h-auto pixel-art">
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>`;
}
