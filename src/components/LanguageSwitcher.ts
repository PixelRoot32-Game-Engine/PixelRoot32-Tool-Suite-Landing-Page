import { i18n, type Language } from '../i18n';

export function initLanguageSwitcher(container: HTMLElement = document.body): void {
  const switcherContainer = container.querySelector('#language-switcher-container');
  if (!switcherContainer) return;

  const render = () => {
    const currentLang = i18n.getLanguage();
    switcherContainer.innerHTML = `
      <div class="flex items-center bg-surface border border-border-ui p-1 rounded-sm">
        <button 
          data-lang="en" 
          class="px-3 py-1 text-xs font-mono font-bold transition-all ${currentLang === 'en' ? 'bg-primary text-black' : 'text-text-muted hover:text-text-high'}"
        >
          EN
        </button>
        <button 
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
        // Dispatch custom event to trigger re-render of the whole app
        window.dispatchEvent(new CustomEvent('languageChanged'));
      });
    });
  };

  render();
}
