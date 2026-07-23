import { i18n } from '../i18n';

const githubReleasesUrl = 'https://github.com/PixelRoot32-Game-Engine/PixelRoot32-Tool-Suite-Releases/releases';

const windowsIcon = `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>`;

const macosIcon = `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.09-3.11-1.06.05-2.31.74-3.04 1.61-.67.81-1.24 2.04-1.08 3.13 1.19.09 2.37-.79 3.03-1.63"/></svg>`;

const linuxIcon = `<svg class="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="#202124" stroke="#d9d9d9" stroke-width=".45" d="M12 1.5c-3.1 0-4.55 2.67-4.55 5.7 0 1.15-.3 2.07-.9 3.02-1.11 1.75-2.3 3.62-2.3 6.05 0 1.4.72 2.5 2 3.03 1.18.5 2.65.35 4.08-.3.58.35 1.12.52 1.67.52s1.1-.17 1.67-.52c1.43.65 2.9.8 4.08.3 1.28-.53 2-1.63 2-3.03 0-2.43-1.19-4.3-2.3-6.05-.6-.95-.9-1.87-.9-3.02 0-3.03-1.45-5.7-4.55-5.7Z"/>
  <ellipse cx="12" cy="13.35" rx="4.15" ry="5.1" fill="#f4f4f4"/>
  <ellipse cx="10.35" cy="6.25" rx="1.22" ry="1.55" fill="#f4f4f4"/>
  <ellipse cx="13.65" cy="6.25" rx="1.22" ry="1.55" fill="#f4f4f4"/>
  <circle cx="10.65" cy="6.15" r=".47" fill="#202124"/>
  <circle cx="13.35" cy="6.15" r=".47" fill="#202124"/>
  <path fill="#f6a800" d="m12 6.85 2.05 1.35L12 9.35 9.95 8.2 12 6.85Z"/>
  <path fill="#f6a800" d="M10.3 18.35c-.92.18-2.62.82-3.3 1.55-.47.5-.08 1.1.62 1.05l3.88-.3-.18-1.55-1.02-.75Zm3.4 0c.92.18 2.62.82 3.3 1.55.47.5.08 1.1-.62 1.05l-3.88-.3.18-1.55 1.02-.75Z"/>
</svg>`;

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
