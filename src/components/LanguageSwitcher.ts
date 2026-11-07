import { i18n, type Language } from '../i18n';

function mountSwitcher(switcherContainer: Element): void {
  const currentLang = i18n.getLanguage();
  switcherContainer.innerHTML = `
    <div class="flex items-center bg-surface border border-border-ui p-1 rounded-sm">
      <button 
        type="button"
        data-lang="en" 
        class="px-3 py-1 text-xs font-mono font-bold transition-all ${currentLang === 'en' ? 'bg-primary text-black' : 'text-text-muted hover:text-text-high'}"
      >
        EN
      </button>
      <button 
        type="button"
        data-lang="es" 
        class="px-3 py-1 text-xs font-mono font-bold transition-all ${currentLang === 'es' ? 'bg-primary text-black' : 'text-text-muted hover:text-text-high'}"
      >
        ES
      </button>
    </div>
  `;

  switcherContainer.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') as Language;
      i18n.setLanguage(lang);
      window.dispatchEvent(new CustomEvent('languageChanged'));
    });
  });
}

/**
 * Initialize language switcher in all mount points (desktop header + mobile drawer).
 */
export function initLanguageSwitcher(container: HTMLElement = document.body): void {
  const switcherContainers = container.querySelectorAll(
    '[data-language-switcher], #language-switcher-container, #language-switcher-container-mobile'
  );
  if (switcherContainers.length === 0) return;

  const seen = new Set<Element>();
  switcherContainers.forEach((el) => {
    if (seen.has(el)) return;
    seen.add(el);
    mountSwitcher(el);
  });
}
