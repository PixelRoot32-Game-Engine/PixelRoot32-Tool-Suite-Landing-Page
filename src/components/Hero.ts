import { i18n } from '../i18n';

export function Hero(): string {
  return `<main class="pt-32 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden">
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
    <div class="absolute inset-0 bg-grid-pattern"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono mb-8">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
      </span>
      <span id="hero-version">${i18n.t('hero.version')}</span>
    </div>
    
    <h1 class="text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
      ${i18n.t('hero.title')}
    </h1>
    
    <p class="max-w-2xl mx-auto text-lg lg:text-xl text-text-muted mb-10 leading-relaxed">
      ${i18n.t('hero.subtitle')}
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
      <div class="w-full sm:w-auto px-8 py-4 bg-primary/50 text-black/50 font-mono font-black text-lg shadow-block cursor-not-allowed">
        ${i18n.t('hero.cta.download')}
      </div>
    </div>

    <div class="relative max-w-5xl mx-auto">
      <div class="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-retro opacity-20 blur-xl"></div>
      <div class="relative bg-surface border-4 border-black shadow-block-hover-lg">
        <img src="/assets/tilemap-editor.png" alt="PixelRoot32 Tilemap Editor" class="w-full h-auto">
      </div>
    </div>
  </div>
</main>`;
}
