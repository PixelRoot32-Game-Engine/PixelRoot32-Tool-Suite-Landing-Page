import { i18n } from '../i18n';

const githubReleasesUrl = 'https://github.com/PixelRoot32-Game-Engine/PixelRoot32-Tool-Suite-Releases/releases';

const windowsIcon = `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>`;

const macosIcon = `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.09-3.11-1.06.05-2.31.74-3.04 1.61-.67.81-1.24 2.04-1.08 3.13 1.19.09 2.37-.79 3.03-1.63"/></svg>`;

const linuxIcon = `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489.117.779.538 1.455 1.264 1.956.608.417 1.373.62 2.143.62.91 0 1.83-.27 2.65-.636.652-.295 1.303-.692 1.925-1.135.24-.172.48-.357.72-.553.653.576 1.344 1.102 2.069 1.554.99.607 2.07.927 3.187.927.95 0 1.858-.223 2.64-.621.789-.403 1.41-.974 1.81-1.652.41-.69.605-1.483.563-2.308-.044-.855-.323-1.741-.83-2.649-.988-1.756-2.324-3.328-3.35-5.052-.522-.885-1.083-1.792-1.24-2.783-.155-.98.076-2.178.718-2.986.314-.406.717-.72 1.17-.922.45-.204.965-.293 1.49-.257.528.036 1.053.173 1.533.414.48.24.9.592 1.22 1.013.322.42.54.91.64 1.415.097.503.08 1.023-.053 1.514-.265.98-.98 1.778-1.86 2.197-.88.42-1.9.433-2.81.036-.45-.198-.858-.49-1.19-.852-.33-.36-.585-.786-.746-1.255-.16-.47-.224-.973-.186-1.468.037-.494.174-.977.4-1.418.45-.88 1.24-1.53 2.16-1.79.92-.26 1.92-.13 2.76.35.83.48 1.46 1.25 1.73 2.14.27.89.18 1.86-.25 2.68-.42.83-1.13 1.47-1.97 1.77-.84.3-1.76.26-2.58-.11-.81-.37-1.47-1.02-1.84-1.83-.37-.8-.44-1.72-.21-2.56.23-.84.74-1.57 1.42-2.04.68-.47 1.52-.69 2.35-.62.83.07 1.62.42 2.21.99.59.56.97 1.32 1.07 2.13.1.8-.1 1.62-.56 2.29-.45.67-1.14 1.16-1.93 1.37"/></svg>`;

export function Download(): string {
  return `
    <section id="download" class="py-24 bg-surface/30 border-y border-border-ui relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono mb-6">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span id="download-version">${i18n.t('download.version')}</span>
          </div>
          <h2 class="text-3xl lg:text-5xl font-black mb-4 tracking-tight uppercase">
            ${i18n.t('download.title')}
          </h2>
          <p class="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            ${i18n.t('download.subtitle')}
          </p>
        </div>

        <!-- Single Download Card -->
        <div class="bg-[#333333] border-2 border-[#1a1a1a] shadow-block hover:shadow-block-hover transition-all duration-300 mb-10">
          <!-- Window Header -->
          <div class="bg-[#444444] px-4 py-3 border-b-2 border-[#1a1a1a] flex justify-between items-center">
            <span class="text-white font-mono text-sm font-bold uppercase tracking-wider">${i18n.t('download.available_os')}</span>
          </div>
          
          <!-- Window Content -->
          <div class="p-8 bg-gradient-to-b from-[#333333] to-[#2a2a2a]">
            <!-- Platform Icons -->
            <div class="flex items-center justify-center gap-8 mb-8">
              <div class="flex flex-col items-center gap-2 text-[#00a4ef]">
                ${windowsIcon}
                <span class="font-mono text-xs text-text-muted">Windows</span>
              </div>
              <div class="w-px h-12 bg-[#444444]"></div>
              <div class="flex flex-col items-center gap-2 text-text-muted">
                ${macosIcon}
                <span class="font-mono text-xs text-text-muted">macOS</span>
              </div>
              <div class="w-px h-12 bg-[#444444]"></div>
              <div class="flex flex-col items-center gap-2 text-secondary">
                ${linuxIcon}
                <span class="font-mono text-xs text-text-muted">Linux</span>
              </div>
            </div>
            
            <!-- Description -->
            <p class="text-center text-text-muted font-mono text-sm mb-8 leading-relaxed">
              ${i18n.t('download.description')}
            </p>
            
            <!-- GitHub Link Button -->
            <a 
              href="${githubReleasesUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="block w-full"
            >
              <button class="w-full bg-primary text-black font-mono font-bold uppercase tracking-wider py-4 px-6 border-2 border-black shadow-block hover:shadow-block-hover hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                ${i18n.t('download.cta_github')}
              </button>
            </a>
          </div>
        </div>
        
        <!-- Note -->
        <p class="text-center text-[#666666] font-mono text-xs uppercase tracking-tighter mb-4">
          ${i18n.t('download.note')}
        </p>
        
        <!-- License Disclaimer -->
        <p class="text-center text-text-muted font-mono text-xs max-w-2xl mx-auto leading-relaxed">
          ${i18n.t('download.license_note')}
        </p>
      </div>
      
      <!-- Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 -z-10">
        <div class="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary rounded-full blur-[120px]"></div>
      </div>
    </section>
  `;
}
