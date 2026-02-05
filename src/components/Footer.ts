import { i18n } from '../i18n';

export function Footer(): string {
  return `<footer class="py-12 border-t border-border-ui">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
      <div class="flex items-center gap-3">
        <img src="./tool_suite_icon.png" alt="PixelRoot32 Logo" class="h-8 w-auto grayscale opacity-50">
        <span class="text-text-muted font-mono text-sm">${i18n.t('footer.text')}</span>
      </div>
      
      <div class="flex gap-8">
        <a href="https://pixelroot32.org" target="_blank" class="text-text-muted hover:text-primary transition-colors">PixelRoot32.org</a>
      </div>
      
      <div class="text-text-muted text-xs font-mono">
        ${i18n.t('footer.copyright')}
      </div>
    </div>
  </div>
</footer>`;
}
