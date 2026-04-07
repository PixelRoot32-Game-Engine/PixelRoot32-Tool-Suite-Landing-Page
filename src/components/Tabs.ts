type ModuleStatus = 'available' | 'coming-soon';
type ColorVariant = 'primary' | 'secondary' | 'retro';

interface ModuleFeature {
  titleKey: string;
  descriptionKey: string;
  image: string;
}

interface ModuleSpec {
  labelKey: string;
  icon: string;
}

interface Tab {
  id: string;
  titleKey: string;
  subtitleKey?: string;
  icon: string;
  color: ColorVariant;
  status: ModuleStatus;
  features: ModuleFeature[];
  specs: ModuleSpec[];
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  i18n: {
    t: (key: string, defaultValue?: string) => string;
  };
  translations?: {
    showcaseTitle?: string;
    specsTitle?: string;
    comingSoon?: string;
  };
}

function renderFeature(feature: ModuleFeature, index: number, color: ColorVariant, i18n: { t: (key: string) => string }): string {
  return `
    <div class="flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24">
      <div class="flex-1">
        <div class="inline-block px-3 py-1 bg-${color}/10 border border-${color}/20 text-${color} text-xs font-mono mb-4 uppercase">
          Tool Focus
        </div>
        <h4 class="text-3xl font-black mb-4">${i18n.t(feature.titleKey)}</h4>
        <p class="text-text-muted text-lg leading-relaxed mb-8">${i18n.t(feature.descriptionKey)}</p>
      </div>
      <div class="flex-1 w-full flex justify-center">
        <div class="bg-surface border-4 border-black shadow-block hover:shadow-block-hover transition-all">
          <img src="${feature.image}" alt="${i18n.t(feature.titleKey)}" class="h-auto pixel-art">
        </div>
      </div>
    </div>
  `;
}

function renderSpec(spec: ModuleSpec, color: ColorVariant, i18n: { t: (key: string) => string }): string {
  return `
    <div class="flex items-center gap-6 p-6 bg-surface border border-border-ui shadow-block">
      <div class="w-12 h-12 flex-shrink-0 bg-${color}/10 flex items-center justify-center">
        <div class="text-${color}">${spec.icon}</div>
      </div>
      <span class="font-mono font-bold text-base">${i18n.t(spec.labelKey)}</span>
    </div>
  `;
}

function renderTabContent(tab: Tab, i18n: { t: (key: string) => string }, translations: { showcaseTitle?: string; specsTitle?: string }): string {
  const featuresHTML = tab.features.length > 0 ? `
    <div class="mb-16">
      <h3 class="text-2xl font-black mb-8 text-${tab.color}">
        ${translations.showcaseTitle || 'Features'}
      </h3>
      <div class="space-y-16">
        ${tab.features.map((feature, index) => renderFeature(feature, index, tab.color, i18n)).join('')}
      </div>
    </div>
  ` : '';

  const specsHTML = tab.specs.length > 0 ? `
    <div>
      <h3 class="text-2xl font-black mb-8 text-${tab.color}">
        ${translations.specsTitle || 'Technical Specs'}
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        ${tab.specs.map(spec => renderSpec(spec, tab.color, i18n)).join('')}
      </div>
    </div>
  ` : '';

  return `
    <div class="bg-surface/30 border-4 border-border-ui p-8">
      ${featuresHTML}
      ${specsHTML}
    </div>
  `;
}

export function Tabs({
  tabs,
  defaultTabId,
  i18n,
  translations = {}
}: TabsProps): string {
  const activeTabId = defaultTabId || tabs.find((t: Tab) => t.status === 'available')?.id || tabs[0]?.id;
  const activeTab = tabs.find((t: Tab) => t.id === activeTabId) || tabs[0];
  
  if (!activeTab) {
    return '<section id="tabs" class="py-24"><div class="max-w-7xl mx-auto px-4">No tabs available</div></section>';
  }

  const availableTabs = tabs.filter((t: Tab) => t.status === 'available');
  const upcomingTabs = tabs.filter((t: Tab) => t.status === 'coming-soon');

  const comingSoonLabel = translations.comingSoon || 'Coming Soon';

  return `
    <section id="tabs" class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Tab Navigation -->
        <div class="flex flex-wrap gap-4 mb-12">
          ${availableTabs.map((tab: Tab) => {
            const isActive = tab.id === activeTabId;
            const activeClass = isActive ? 'bg-' + tab.color + ' text-black border-black shadow-block-hover' : 'bg-transparent text-text-muted border-border-ui hover:border-' + tab.color + ' hover:text-' + tab.color;
            return `
            <button 
              class="tab-btn px-6 py-3 font-mono font-bold uppercase tracking-wider border-2 transition-all cursor-pointer ${activeClass}"
              data-tab-id="${tab.id}"
            >
              <span class="inline-flex items-center gap-2">
                ${tab.icon}
                ${i18n.t(tab.titleKey)}
              </span>
            </button>`;
          }).join('')}
          
          ${upcomingTabs.map((tab: Tab) => `
            <div class="tab-btn px-6 py-3 font-mono font-bold uppercase tracking-wider border-2 border-dashed border-border-ui text-text-muted/50 opacity-60">
              <span class="inline-flex items-center gap-2">
                ${tab.icon}
                ${i18n.t(tab.titleKey)}
                <span class="text-xs px-2 py-0.5 bg-${tab.color}/20 text-${tab.color}">
                  ${comingSoonLabel}
                </span>
              </span>
            </div>
          `).join('')}
        </div>

        <!-- Tab Content -->
        ${renderTabContent(activeTab, i18n, translations)}

      </div>
    </section>

    <script>
      (function() {
        document.querySelectorAll('.tab-btn[data-tab-id]').forEach(btn => {
          btn.style.cursor = 'pointer';
          btn.addEventListener('click', function() {
            const tabId = this.dataset.tabId;
            window.dispatchEvent(new CustomEvent('tabChange', { detail: { tabId } }));
          });
        });
      })();
    </script>
  `;
}