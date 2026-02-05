import { i18n } from '../i18n';

export function Navigation(): string {
  return `<nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-ui">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">
      <div class="flex items-center gap-3">
        <img src="tool_suite_icon.png" alt="PixelRoot32 Logo" class="h-10 w-auto">
        <div class="hidden sm:block">
          <span class="text-xl font-black tracking-tighter">PIXELROOT32</span>
          <span class="block text-[10px] font-mono text-secondary leading-none uppercase tracking-widest">Tool Suite</span>
        </div>
      </div>
      
      <div class="hidden md:flex items-center gap-8">
        <a href="#features" class="text-sm font-mono font-bold hover:text-primary transition-colors">${i18n.t('nav.features')}</a>
        <a href="#showcase" class="text-sm font-mono font-bold hover:text-primary transition-colors">${i18n.t('nav.showcase')}</a>
        <a href="#specs" class="text-sm font-mono font-bold hover:text-primary transition-colors">${i18n.t('nav.specs')}</a>
        <a href="#pricing" class="text-sm font-mono font-bold hover:text-primary transition-colors">${i18n.t('nav.pricing')}</a>
      </div>

      <div class="flex items-center gap-4">
        <div id="language-switcher-container"></div>
      </div>
    </div>
  </div>
</nav>`;
}
