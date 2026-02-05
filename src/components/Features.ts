import { i18n } from '../i18n';
import { Card } from 'pixelroot32-components-landing-page';

export function Features(): string {
  return `<section id="features" class="py-24 bg-surface/30 border-y border-border-ui">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-16">
      <h2 class="text-3xl lg:text-5xl font-black mb-4 tracking-tight">${i18n.t('features.title')}</h2>
      <p class="text-text-muted text-lg max-w-2xl">${i18n.t('features.subtitle')}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${Card({
        title: i18n.t('features.tilemap.title'),
        description: i18n.t('features.tilemap.description'),
        variant: 'primary',
        icon: `<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`
      })}

      ${Card({
        title: i18n.t('features.music.title'),
        description: i18n.t('features.music.description'),
        variant: 'secondary',
        icon: `<svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`
      })}

      ${Card({
        title: i18n.t('features.suite.title'),
        description: i18n.t('features.suite.description'),
        variant: 'retro',
        icon: `<svg class="w-6 h-6 text-retro" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"></path></svg>`
      })}
    </div>
  </div>
</section>`;
}
