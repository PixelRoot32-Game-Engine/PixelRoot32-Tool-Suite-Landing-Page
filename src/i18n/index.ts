/**
 * Internationalization (i18n) System
 * Manages language selection and translation functions
 */

export type Language = 'en' | 'es';

export interface Translations {
  [key: string]: string;
}

export class I18nStore {
  private currentLanguage: Language = 'en';
  private translations: Record<Language, Translations> = {
    en: {},
    es: {}
  };
  private listeners: Array<() => void> = [];

  constructor(translations: Record<Language, Translations>) {
    this.translations = translations;
    this.loadSavedLanguage();
  }

  private loadSavedLanguage(): void {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else {
      const browserLanguage = navigator.language.split('-')[0] as Language;
      if (['en', 'es'].includes(browserLanguage)) {
        this.currentLanguage = browserLanguage;
      }
    }
  }

  private saveLanguage(language: Language): void {
    localStorage.setItem('language', language);
  }

  setLanguage(language: Language): void {
    if (language !== this.currentLanguage) {
      this.currentLanguage = language;
      this.saveLanguage(language);
      this.notifyListeners();
    }
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: string, defaultValue?: string): string {
    return this.translations[this.currentLanguage][key] || defaultValue || key;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const i18n = new I18nStore({
  en: {
    'nav.features': 'Features',
    'nav.modules': 'Modules',
    'nav.pricing': 'Pricing',
    'nav.github': 'GitHub',
    'nav.download': 'Download',

    'hero.version': 'Tool Suite v1.0.0',
    'hero.version.available': 'coming soon',
    'hero.title': 'PixelRoot32 Tool Suite',
    'hero.subtitle': 'The definitive production suite for ESP32. The Tilemap Editor will be the first module to launch, granting you reserved access to the upcoming Music Editor and future tools.',
    'hero.cta.download': 'GET THE SUITE',

    'features.title': 'PixelRoot32 Tool Suite',
    'features.subtitle': 'A growing ecosystem of professional tools designed to enhance your experience with the free PixelRoot32 engine.',
    'features.tilemap.title': 'Tilemap Editor (Coming Soon)',
    'features.tilemap.description': 'Advanced multi-layer design, binary optimization, and native C++ export for ESP32 hardware.',
    'features.music.title': 'Music Editor (Upcoming)',
    'features.music.description': 'Native 4-channel NES synthesizer (Pulse, Triangle, Noise) for authentic 8-bit soundscapes.',
    'features.suite.title': 'Perpetual License',
    'features.suite.description': 'One-time payment for the entire suite. Pre-ordering the Tilemap Editor will reserve your access to all future modules at no extra cost.',

    'pricing.title': 'Ready to Level Up?',
    'pricing.engine_note': 'PixelRoot32 Engine remains 100% free and open source. These tools are optional power-ups designed to streamline your workflow and support the project.',
    'pricing.subtitle': 'Support the development and get lifetime access to the PixelRoot32 Tool Suite.',
    'pricing.collector.title': 'PixelRoot32 Tool Suite',
    'pricing.collector.target': 'Built for ESP32 & retro embedded game developers.',
    'pricing.collector.price': 'Lifetime License',
    'pricing.collector.price_sub': 'Limited Time Offer',
    'pricing.collector.feat1': 'Complete Tilemap Editor',
    'pricing.collector.feat2': 'Upcoming Music Editor module',
    'pricing.collector.feat3': 'Future Tool Suite modules',
    'pricing.collector.feat4': 'Native C++ export optimization',
    'pricing.collector.feat5': 'Works on Windows, Mac and Linux',
    'pricing.collector.feat6': 'Free lifetime updates',
    'pricing.collector.feat7': 'One-time purchase, yours forever!',
    'pricing.collector.buy_now': 'Buy the Suite',

    'download.title': 'Get the Suite',
    'download.subtitle': 'Download PixelRoot32 Tool Suite for Windows, macOS, or Linux.',
    'download.version': 'Tool Suite v1.0.0',
    'download.available_os': 'Available For',
    'download.description': 'Get the latest release for your platform from our GitHub releases page.',
    'download.cta_github': 'View Releases on GitHub',
    'download.note': 'Releases are distributed via GitHub. Windows (.exe), macOS (.dmg), Linux (.deb, .AppImage)',
    'download.license_note': 'Tilemap Editor is free to use for editing. Exporting to ESP32 binary requires a license.</br><a href="#pricing" class="text-secondary hover:underline">View pricing</a>.',

    'waitlist.title': 'Join the Waitlist',
    'waitlist.subtitle': 'We\'ll notify you when PixelRoot32 Tool Suite is available.',
    'waitlist.email_label': 'Email Address',
    'waitlist.email_placeholder': 'your@email.com',
    'waitlist.checkbox': 'I\'m interested in early access',
    'waitlist.submit': 'Keep me posted',
    'waitlist.disclaimer': 'No spam. Unsubscribe anytime.',
    'waitlist.success': 'You\'re on the list! We\'ll be in touch soon.',
    'waitlist.close': 'Close',

    'showcase.title': 'Powerful Design Tools',
    'showcase.subtitle': 'Everything you need to build complex retro worlds.',
    'showcase.module.tilemap.title': 'Tilemap Editor',
    'showcase.module.tilemap.subtitle': 'The definitive tilemap design suite for ESP32',
    'showcase.module.music.title': 'Music Editor',
    'showcase.module.music.subtitle': 'Native 4-channel NES synthesizer for authentic 8-bit soundscapes',
    'showcase.module.coming_soon': 'More features coming soon...',
    'showcase.editor.title': 'Integrated Workspace',
    'showcase.editor.description': 'Intuitive canvas with brush, eraser, rectangle fill, pipette tools, attribute tools, and animations tools.',
    'showcase.layers.title': 'Layer Management',
    'showcase.layers.description': 'Organize your world with depth. Toggle visibility, lock layers, and adjust opacity.',
    'showcase.export.title': 'Hardware Optimization',
    'showcase.export.description': 'Fine-tune your export settings to match your hardware constraints.',
    'showcase.scenes.title': 'Multi-Scene Workflow',
    'showcase.scenes.description': 'Manage multiple levels within a single project. Use Onion Skinning to align transitions and see adjacent scenes as overlays.',
    'showcase.animation.title': 'Tile Animation System',
    'showcase.animation.description': 'Create tile-linked animations with ESP32-synchronized timing. Live preview on canvas, automatic C++ export with PROGMEM storage. Supports up to 64 animations per scene.',
    'showcase.preferences.title': 'Global Preferences',
    'showcase.preferences.description': 'Customize your environment with grid intensity controls, background colors, and performance-saving history compression.',
    'showcase.tileset.title': 'Intelligent Tileset Management',
    'showcase.tileset.description': 'Import and organize your assets locally. Use advanced selection tools to build your world faster.',

    'specs.title': 'Hardware Constraints',
    'specs.subtitle': 'Built to ensure compatibility with ESP32 and PixelRoot32 engine.',
    'specs.module.tilemap.title': 'Tilemap Editor',
    'specs.engine_title': 'Engine Limits',
    'specs.visual_title': 'Visual System',
    'specs.data_title': 'Data & Palette',
    'specs.tile_size': 'Max Tile Size: 32x32 px',
    'specs.map_dim': 'Max Map Dimension: 255x255 tiles',
    'specs.layers': 'Max Layers: 8',
    'specs.unique_tiles': 'Max Unique Tiles: 256',
    'specs.color': 'Color Depth: 1/2/4 bpp',
    'specs.animations': 'Max Animations: 64',
    'specs.anim_frames': 'Max Animation Frames: 256',
    'specs.resolution': 'Screen: 320x240 / 240x320',
    'specs.palette': 'Palette: RGB565 (16 colors)',
    'specs.multi_palette': 'Multi-Palette: 8 slots (P0-P7)',
    'specs.binary_format': 'Binary: 1 byte/tile',

    'footer.text': 'PixelRoot32 Tool Suite - The Native ESP32 Production Suite.',
    'footer.copyright': '© 2026 PixelRoot32. All rights reserved.',

    'language.english': 'English',
    'language.spanish': 'Español',

    // Checkout UI
    'checkout.loading': 'Processing your license...',
    'checkout.success.title': 'Purchase Complete!',
    'checkout.success.message': 'Your purchase has been processed successfully.',
    'checkout.success.license_info': 'You will receive an email with your license key shortly.',
    'checkout.success.transaction_id': 'Transaction ID',
    'checkout.success.email_warning': 'Check your spam folder if you don\'t see the email within a few minutes.',
    'checkout.duplicate.title': 'Transaction Already Processed',
    'checkout.duplicate.message': 'This transaction was already processed.',
    'checkout.duplicate.id': 'ID',
    'checkout.duplicate.email_hint': 'Check your email for the original license.',
    'checkout.error.title': 'Error',
    'checkout.error.retry': 'Retry',
    'checkout.cancel.message': 'Payment cancelled. No charge was made.',
    'checkout.error.order_creation': 'Unable to start payment. Please try again.',
    'checkout.error.capture': 'Error processing payment',
    'checkout.error.connection': 'Connection error. Please try again.',
    'checkout.error.paypal': 'PayPal error. Please try again.'
  },
  es: {
    'nav.features': 'Suite',
    'nav.modules': 'Módulos',
    'nav.pricing': 'Precios',
    'nav.github': 'GitHub',
    'nav.download': 'Descargar',

    'hero.version': 'Tool Suite v1.0.0',
    'hero.version.available': 'próximamente',
    'hero.title': 'PixelRoot32 Tool Suite',
    'hero.subtitle': 'La suite de producción definitiva para ESP32. El Tilemap Editor será el primer módulo en lanzarse, otorgándote acceso reservado al próximo Music Editor y futuras herramientas.',
    'hero.cta.download': 'PRÓXIMAMENTE',

    'features.title': 'PixelRoot32 Tool Suite',
    'features.subtitle': 'Un ecosistema creciente de herramientas profesionales diseñadas para potenciar tu experiencia con el motor gratuito PixelRoot32.',
    'features.tilemap.title': 'Tilemap Editor (Próximamente)',
    'features.tilemap.description': 'Diseño avanzado multi-capa, optimización binaria y exportación nativa a C++ para hardware ESP32.',
    'features.music.title': 'Music Editor (En Desarrollo)',
    'features.music.description': 'Sintetizador nativo NES de 4 canales (Pulse, Triangle, Noise) para paisajes sonoros auténticos de 8 bits.',
    'features.suite.title': 'Licencia Perpetua',
    'features.suite.description': 'Pago único por toda la suite. La reserva del Tilemap Editor te dará acceso a todos los módulos futuros sin costo adicional.',

    'pricing.title': '¿Listo para el Siguiente Nivel?',
    'pricing.engine_note': 'El motor PixelRoot32 sigue siendo 100% gratuito y de código abierto. Estas herramientas son potenciadores opcionales diseñados para agilizar tu flujo de trabajo y apoyar el proyecto.',
    'pricing.subtitle': 'Apoya el desarrollo y obtén acceso de por vida a la PixelRoot32 Tool Suite.',
    'pricing.collector.title': 'PixelRoot32 Tool Suite',
    'pricing.collector.target': 'Diseñado para desarrolladores de juegos retro y sistemas embebidos en ESP32.',
    'pricing.collector.price': 'Licencia Perpetua',
    'pricing.collector.price_sub': 'Oferta de tiempo limitado',
    'pricing.collector.feat1': 'Tilemap Editor completo',
    'pricing.collector.feat2': 'Próximo módulo Music Editor',
    'pricing.collector.feat3': 'Futuros módulos de la Suite',
    'pricing.collector.feat4': 'Optimización de exportación C++',
    'pricing.collector.feat5': 'Funciona en Windows, macOS y Linux',
    'pricing.collector.feat6': 'Actualizaciones gratuitas de por vida',
    'pricing.collector.feat7': '¡Compra única, tuya para siempre!',
    'pricing.collector.buy_now': 'Comprar la Suite',

    'download.title': 'Obtén la Suite',
    'download.subtitle': 'Descarga PixelRoot32 Tool Suite para Windows, macOS o Linux.',
    'download.version': 'Tool Suite v1.0.0',
    'download.available_os': 'Disponible Para',
    'download.description': 'Obtén la última versión para tu plataforma desde nuestra página de releases en GitHub.',
    'download.cta_github': 'Ver Releases en GitHub',
    'download.note': 'Las releases se distribuyen vía GitHub. Windows (.exe), macOS (.dmg), Linux (.deb, .AppImage)',
    'download.license_note': 'Tilemap Editor es gratuito para editar. Exportar a binario para ESP32 requiere licencia.</br><a href="#pricing" class="text-secondary hover:underline">Ver precios</a>.',

    'waitlist.title': 'Únete a la Lista de Espera',
    'waitlist.subtitle': 'Te notificaremos cuando PixelRoot32 Tool Suite esté disponible.',
    'waitlist.email_label': 'Correo Electrónico',
    'waitlist.email_placeholder': 'tu@email.com',
    'waitlist.checkbox': 'Me interesa el acceso anticipado',
    'waitlist.submit': 'Manténme informado',
    'waitlist.disclaimer': 'Sin spam. Cancela en cualquier momento.',
    'waitlist.success': '¡Ya estás en la lista! Nos pondremos en contacto pronto.',
    'waitlist.close': 'Cerrar',

    'showcase.title': 'Herramientas de Diseño Potentes',
    'showcase.subtitle': 'Todo lo que necesitas para construir mundos retro complejos.',
    'showcase.module.tilemap.title': 'Tilemap Editor',
    'showcase.module.tilemap.subtitle': 'La suite de diseño de tilemaps definitiva para ESP32',
    'showcase.module.music.title': 'Music Editor',
    'showcase.module.music.subtitle': 'Sintetizador nativo NES de 4 canales para paisajes sonoros auténticos de 8 bits',
    'showcase.module.coming_soon': 'Más funcionalidades pronto...',
    'showcase.editor.title': 'Espacio de Trabajo Integrado',
    'showcase.editor.description': 'Lienzo intuitivo con herramientas de pincel, borrador, relleno rectangular, pipeta, atributos y animaciones.',
    'showcase.layers.title': 'Gestión de Capas',
    'showcase.layers.description': 'Organiza tu mundo con profundidad. Cambia visibilidad, bloquea capas y ajusta opacidad.',
    'showcase.export.title': 'Optimización de Hardware',
    'showcase.export.description': 'Ajusta la configuración de exportación para que coincida con las restricciones de tu hardware.',
    'showcase.scenes.title': 'Flujo de Trabajo Multi-Escena',
    'showcase.scenes.description': 'Gestiona múltiples niveles en un solo proyecto. Usa Onion Skinning para alinear transiciones y ver escenas adyacentes como capas.',
    'showcase.animation.title': 'Sistema de Animación de Tiles',
    'showcase.animation.description': 'Crea animaciones vinculadas a tiles con sincronización ESP32. Preview en tiempo real en el canvas, exportación automática a C++ con almacenamiento PROGMEM. Soporta hasta 64 animaciones por escena.',
    'showcase.preferences.title': 'Preferencias Globales',
    'showcase.preferences.description': 'Personaliza tu entorno con controles de intensidad de rejilla, colores de fondo y compresión de historial para ahorrar memoria.',
    'showcase.tileset.title': 'Gestión Inteligente de Tilesets',
    'showcase.tileset.description': 'Importa y organiza tus recursos localmente. Usa herramientas de selección avanzada para construir tu mundo más rápido.',

    'specs.title': 'Restricciones de Hardware',
    'specs.subtitle': 'Construido para asegurar la compatibilidad con ESP32 y el motor PixelRoot32.',
    'specs.module.tilemap.title': 'Tilemap Editor',
    'specs.engine_title': 'Límites del Motor',
    'specs.visual_title': 'Sistema Visual',
    'specs.data_title': 'Datos y Paleta',
    'specs.tile_size': 'Tamaño máx tile: 32x32 px',
    'specs.map_dim': 'Dimensión máx mapa: 255x255 tiles',
    'specs.layers': 'Capas máx: 8',
    'specs.unique_tiles': 'Tiles únicos máx: 256',
    'specs.color': 'Profundidad de color: 1/2/4 bpp',
    'specs.animations': 'Animaciones máx: 64',
    'specs.anim_frames': 'Frames animación máx: 256',
    'specs.resolution': 'Pantalla: 320x240 / 240x320',
    'specs.palette': 'Paleta: RGB565 (16 colores)',
    'specs.multi_palette': 'Multi-Paleta: 8 slots (P0-P7)',
    'specs.binary_format': 'Binario: 1 byte/tile',

    'footer.text': 'PixelRoot32 Tool Suite - La Suite de Producción Nativa para ESP32.',
    'footer.copyright': '© 2026 PixelRoot32. Todos los derechos reservados.',

    'language.english': 'English',
    'language.spanish': 'Español',

    // Checkout UI
    'checkout.loading': 'Procesando tu licencia...',
    'checkout.success.title': '¡Compra Completada!',
    'checkout.success.message': 'Tu compra ha sido procesada correctamente.',
    'checkout.success.license_info': 'Recibirás un correo electrónico con tu licencia.',
    'checkout.success.transaction_id': 'ID de Transacción',
    'checkout.success.email_warning': 'Revisa tu carpeta de spam si no ves el email en minutos.',
    'checkout.duplicate.title': 'Transacción Ya Procesada',
    'checkout.duplicate.message': 'Esta transacción ya fue procesada anteriormente.',
    'checkout.duplicate.id': 'ID',
    'checkout.duplicate.email_hint': 'Revisa tu correo para la licencia original.',
    'checkout.error.title': 'Error',
    'checkout.error.retry': 'Reintentar',
    'checkout.cancel.message': 'Pago cancelado. No se ha realizado ningún cargo.',
    'checkout.error.order_creation': 'No se pudo iniciar el pago. Por favor intenta de nuevo.',
    'checkout.error.capture': 'Error procesando el pago',
    'checkout.error.connection': 'Error de conexión. Por favor intenta de nuevo.',
    'checkout.error.paypal': 'Error de PayPal. Por favor intenta de nuevo.'
  }
});
