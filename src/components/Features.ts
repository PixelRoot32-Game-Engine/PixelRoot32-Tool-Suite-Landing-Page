import { i18n } from '../i18n';

export function Features(): string {
  return `<section id="features" class="py-24 bg-surface/30 border-y border-border-ui">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-16">
      <h2 class="text-3xl lg:text-5xl font-black mb-4 tracking-tight">${i18n.t('features.title')}</h2>
      <p class="text-text-muted text-lg max-w-2xl">${i18n.t('features.subtitle')}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="p-8 bg-surface border border-border-ui hover:border-primary transition-all group shadow-block">
        <div class="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <h3 class="text-xl font-bold mb-3">${i18n.t('features.multi_layer.title')}</h3>
        <p class="text-text-muted text-sm leading-relaxed">${i18n.t('features.multi_layer.description')}</p>
      </div>

      <div class="p-8 bg-surface border border-border-ui hover:border-secondary transition-all group shadow-block">
        <div class="w-12 h-12 bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
          <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h3 class="text-xl font-bold mb-3">${i18n.t('features.performance.title')}</h3>
        <p class="text-text-muted text-sm leading-relaxed">${i18n.t('features.performance.description')}</p>
      </div>

      <div class="p-8 bg-surface border border-border-ui hover:border-retro transition-all group shadow-block">
        <div class="w-12 h-12 bg-retro/10 flex items-center justify-center mb-6 group-hover:bg-retro/20 transition-colors">
          <svg class="w-6 h-6 text-retro" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
        </div>
        <h3 class="text-xl font-bold mb-3">${i18n.t('features.binary.title')}</h3>
        <p class="text-text-muted text-sm leading-relaxed">${i18n.t('features.binary.description')}</p>
      </div>

      <div class="p-8 bg-surface border border-border-ui hover:border-primary transition-all group shadow-block">
        <div class="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        </div>
        <h3 class="text-xl font-bold mb-3">${i18n.t('features.export.title')}</h3>
        <p class="text-text-muted text-sm leading-relaxed">${i18n.t('features.export.description')}</p>
      </div>

      <div class="p-8 bg-surface border border-border-ui hover:border-secondary transition-all group shadow-block">
        <div class="w-12 h-12 bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
          <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
        </div>
        <h3 class="text-xl font-bold mb-3">${i18n.t('features.onion.title')}</h3>
        <p class="text-text-muted text-sm leading-relaxed">${i18n.t('features.onion.description')}</p>
      </div>

      <div class="p-8 bg-surface border border-border-ui hover:border-retro transition-all group shadow-block">
        <div class="w-12 h-12 bg-retro/10 flex items-center justify-center mb-6 group-hover:bg-retro/20 transition-colors">
          <svg class="w-6 h-6 text-retro" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
        </div>
        <h3 class="text-xl font-bold mb-3">${i18n.t('features.scenes.title')}</h3>
        <p class="text-text-muted text-sm leading-relaxed">${i18n.t('features.scenes.description')}</p>
      </div>
    </div>
  </div>
</section>`;
}
