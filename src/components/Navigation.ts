import { i18n } from '../i18n';
import { Navigation as SharedNavigation, initNavigation as initSharedNavigation } from 'pixelroot32-components-landing-page';

export function Navigation(): string {
  return SharedNavigation({
    logoUrl: '/logo.png',
    logoAlt: 'PixelRoot32 Logo',
    title: '',
    subtitle: '',
    links: [
      { label: i18n.t('nav.features'), href: '#features' },
      { label: i18n.t('nav.showcase'), href: '#showcase' },
      { label: i18n.t('nav.specs'), href: '#specs' },
      { label: i18n.t('nav.pricing'), href: '#pricing' }
    ],
    i18n: i18n
  });
}

export const initNavigation = initSharedNavigation;
