import { i18n } from '../i18n';
import { Footer as SharedFooter } from 'pixelroot32-components-landing-page';

export function Footer(): string {
  return SharedFooter({
    logoUrl: '/logo_v2.png',
    logoAlt: 'PixelRoot32 Logo',
    title: 'PIXELROOT32',
    subtitle: 'Tool Suite',
    socialLinks: [
      { label: 'PixelRoot32.org', href: 'https://pixelroot32.org' }
    ],
    footerText: i18n.t('footer.text'),
    copyrightText: i18n.t('footer.copyright'),
    i18n: i18n
  });
}
