import './style.css'
import { 
  Navigation, initNavigation, Hero, Features, Showcase, Pricing, WaitlistModal, 
  Footer, initLanguageSwitcher, initWaitlistModal 
} from './components';

/**
 * Helper to create an element from an HTML string safely
 */
function appendComponent(container: HTMLElement, html: string): void {
  const temp = document.createElement('div');
  temp.innerHTML = html.trim();
  while (temp.firstChild) {
    container.appendChild(temp.firstChild);
  }
}

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

  // Clear container
  app.innerHTML = '';

  // Render all components in order
  const components = [
    Navigation(), 
    Hero(), 
    Features(), 
    Showcase(), 
    Pricing(), 
    Footer(), 
    WaitlistModal()
  ];

  components.forEach(html => appendComponent(app, html));
  
  // Initialize functionalities
  initNavigation(app);
  initLanguageSwitcher(app);
  initWaitlistModal(app);

  console.log('PixelRoot32 Tool Suite Landing Page Rendered');
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Re-render app when language changes
window.addEventListener('languageChanged', renderApp);
