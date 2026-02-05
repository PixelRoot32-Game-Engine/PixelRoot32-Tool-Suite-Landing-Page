import { i18n } from '../i18n';

export const Pricing = () => {
  return `
    <section id="pricing" class="py-24 bg-background relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-mono font-black mb-4 uppercase tracking-tighter">
            <span class="text-primary">${i18n.t('pricing.title')}</span>
          </h2>
          <p class="text-text-muted max-w-2xl mx-auto font-mono">
            ${i18n.t('pricing.subtitle')}
          </p>
          <div class="mt-8 max-w-2xl mx-auto">
            <div class="inline-block px-6 py-3 bg-primary/5 border border-primary/20 rounded-sm">
              <p class="text-primary text-xs font-mono uppercase tracking-widest leading-relaxed">
                ${i18n.t('pricing.engine_note')}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center max-w-6xl mx-auto">
          <!-- Collector's Edition Window -->
          <div class="w-full max-w-xl bg-[#333333] border-2 border-[#1a1a1a] shadow-block flex flex-col relative z-20">
            <!-- Window Header -->
            <div class="bg-[#444444] px-4 py-2 border-b-2 border-[#1a1a1a] flex justify-between items-center">
              <span class="text-white font-mono text-sm font-bold uppercase tracking-wider">${i18n.t('pricing.collector.title')}</span>
            </div>
            
            <!-- Window Content -->
            <div class="p-8 md:p-12 flex flex-col items-center flex-grow bg-gradient-to-b from-[#333333] to-[#2a2a2a]">
              <p class="text-primary text-xs font-mono uppercase tracking-[0.2em] mb-8 text-center px-4 leading-relaxed">
                ${i18n.t('pricing.collector.target')}
              </p>

              <!-- Tool Suite Image -->
              <div class="w-full aspect-video bg-[#1a1a1a] border border-[#444444] mb-10 flex items-center justify-center overflow-hidden group relative">
                <img 
                  src="./assets/tilemap-editor.webp" 
                  alt="PixelRoot32 Tilemap Editor" 
                  class="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60"></div>
                <div class="absolute bottom-4 left-4 text-primary font-mono text-[10px] uppercase tracking-widest">
                  Module 01: Tilemap Editor
                </div>
              </div>

              <div class="flex flex-col items-center mb-10">
                <div class="text-3xl md:text-4xl font-black font-mono text-white tracking-tighter uppercase text-center">
                  ${i18n.t('pricing.collector.price')}
                </div>
                <div class="text-primary font-mono text-xs uppercase tracking-[0.3em] mt-2 animate-pulse">
                  ${i18n.t('pricing.collector.price_sub')}
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 w-full mb-12 font-mono text-sm text-text-muted">
                <div class="space-y-4">
                  <li class="flex items-start gap-3 list-none">
                    <span class="text-primary mt-1">✓</span>
                    <span class="text-white font-bold">${i18n.t('pricing.collector.feat1')}</span>
                  </li>
                  <li class="flex items-start gap-3 list-none">
                    <span class="text-primary mt-1">✓</span>
                    <span>${i18n.t('pricing.collector.feat2')}</span>
                  </li>
                  <li class="flex items-start gap-3 list-none">
                    <span class="text-primary mt-1">✓</span>
                    <span>${i18n.t('pricing.collector.feat3')}</span>
                  </li>
                  <li class="flex items-start gap-3 list-none">
                    <span class="text-primary mt-1">✓</span>
                    <span>${i18n.t('pricing.collector.feat4')}</span>
                  </li>
                </div>
                <div class="space-y-4">
                  <li class="flex items-start gap-3 list-none">
                    <span class="text-primary mt-1">✓</span>
                    <span>${i18n.t('pricing.collector.feat5')}</span>
                  </li>
                  <li class="flex items-start gap-3 list-none">
                    <span class="text-primary mt-1">✓</span>
                    <span class="text-primary font-bold">${i18n.t('pricing.collector.feat6')}</span>
                  </li>
                  <li class="flex items-start gap-3 list-none">
                    <span class="text-primary mt-1">✓</span>
                    <span class="text-white">${i18n.t('pricing.collector.feat7')}</span>
                  </li>
                </div>
              </div>

              <div class="w-full mt-auto">
                <button class="open-waitlist-btn w-full py-5 bg-primary text-black font-mono font-black text-xl shadow-block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
                   📦 ${i18n.t('pricing.collector.cta')}
                </button>
              </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Background Elements -->
              <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <div class="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-[120px]"></div>
                <div class="absolute bottom-1/4 right-10 w-64 h-64 bg-primary rounded-full blur-[120px]"></div>
              </div>
            </section>
          `;
        };
