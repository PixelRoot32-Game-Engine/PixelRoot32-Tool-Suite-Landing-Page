import './style.css'
import { Navigation, Hero, Features, Showcase, Specs, Footer, initLanguageSwitcher } from './components';

/**
 * Main Application Entry Point
 * Renders all components into the #app container
 */
function renderApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  
  if (!app) {
    console.error('App container not found');
    return;
  }

  // Render all components in order
  app.innerHTML = Navigation() + Hero() + Features() + Showcase() + Specs() + Footer();
  
  // Initialize language switcher functionality
  initLanguageSwitcher();

  console.log('PixelRoot32 Tilemap Editor Landing Page Rendered');
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Re-render app when language changes
window.addEventListener('languageChanged', renderApp);
