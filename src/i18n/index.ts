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
    'nav.showcase': 'Showcase',
    'nav.specs': 'Technical Specs',
    'nav.github': 'GitHub',
    
    'hero.version': 'v1.0.0 coming soon',
    'hero.title': 'The Native Tilemap Editor for PixelRoot32.',
    'hero.subtitle': 'Design multi-layer environments, manage tilesets, and export optimized C++ code directly for ESP32 hardware.',
    'hero.cta.download': 'COMING SOON',
    'hero.cta.github': 'VIEW SOURCE',
    
    'features.title': 'Technical Excellence',
    'features.subtitle': 'Optimized for high-performance level design and low-memory hardware.',
    'features.multi_layer.title': 'Multi-layer Support',
    'features.multi_layer.description': 'Up to 8 layers per scene with parallax support and translucent onion skinning.',
    'features.performance.title': 'High Performance',
    'features.performance.description': 'Incremental rendering and LRU caching ensure a smooth 60fps experience even on large maps.',
    'features.binary.title': 'Binary Storage',
    'features.binary.description': 'High-performance .pr32scene.bin format with up to 99.7% size reduction.',
    'features.export.title': 'Multi-BPP Export',
    'features.export.description': 'Export maps in 1bpp, 2bpp, or 4bpp with optimized bit-packing for ESP32 flash.',
    'features.onion.title': 'Onion Skinning',
    'features.onion.description': 'Visualize adjacent scenes as translucent overlays for seamless level transitions.',
    'features.scenes.title': 'Multi-scene System',
    'features.scenes.description': 'Manage multiple scenes within a single project with shared tilesets and settings.',
    
    'showcase.title': 'Powerful Design Tools',
    'showcase.subtitle': 'Everything you need to build complex retro worlds.',
    'showcase.editor.title': 'Integrated Workspace',
    'showcase.editor.description': 'Intuitive canvas with brush, eraser, rectangle fill, and pipette tools.',
    'showcase.layers.title': 'Layer Management',
    'showcase.layers.description': 'Organize your world with depth. Toggle visibility, lock layers, and adjust opacity.',
    'showcase.export.title': 'Hardware Optimization',
    'showcase.export.description': 'Fine-tune your export settings to match your hardware constraints.',
    
    'specs.title': 'Hardware Constraints',
    'specs.subtitle': 'Built to ensure compatibility with ESP32 and PixelRoot32 engine.',
    'specs.tile_size': 'Max Tile Size: 32x32 px',
    'specs.map_dim': 'Max Map Dimension: 255x255 tiles',
    'specs.layers': 'Max Layers: 8',
    'specs.color': 'Color Depth: 1/2/4 bpp',
    
    'footer.text': 'Part of the PixelRoot32 Ecosystem.',
    'footer.copyright': '© 2026 PixelRoot32. All rights reserved.',
    
    'language.english': 'English',
    'language.spanish': 'Español'
  },
  es: {
    'nav.features': 'Características',
    'nav.showcase': 'Galería',
    'nav.specs': 'Especificaciones',
    'nav.github': 'GitHub',
    
    'hero.version': 'v1.0.0 próximamente',
    'hero.title': 'El Editor de Mapas Nativo para PixelRoot32.',
    'hero.subtitle': 'Diseña entornos multi-capa, gestiona tilesets y exporta código C++ optimizado directamente para hardware ESP32.',
    'hero.cta.download': 'PRÓXIMAMENTE',
    'hero.cta.github': 'VER CÓDIGO',
    
    'features.title': 'Excelencia Técnica',
    'features.subtitle': 'Optimizado para diseño de niveles de alto rendimiento y hardware de baja memoria.',
    'features.multi_layer.title': 'Soporte Multi-capa',
    'features.multi_layer.description': 'Hasta 8 capas por escena con soporte para paralaje y onion skinning translúcido.',
    'features.performance.title': 'Alto Rendimiento',
    'features.performance.description': 'Renderizado incremental y caché LRU aseguran una experiencia fluida a 60fps.',
    'features.binary.title': 'Almacenamiento Binario',
    'features.binary.description': 'Formato .pr32scene.bin de alto rendimiento con reducción de tamaño de hasta el 99.7%.',
    'features.export.title': 'Exportación Multi-BPP',
    'features.export.description': 'Exporta mapas en 1bpp, 2bpp o 4bpp con empaquetado de bits optimizado para flash de ESP32.',
    'features.onion.title': 'Onion Skinning',
    'features.onion.description': 'Visualiza escenas adyacentes como capas translúcidas para transiciones de nivel perfectas.',
    'features.scenes.title': 'Sistema Multi-escena',
    'features.scenes.description': 'Gestiona múltiples escenas en un solo proyecto con tilesets y configuraciones compartidas.',
    
    'showcase.title': 'Herramientas de Diseño Potentes',
    'showcase.subtitle': 'Todo lo que necesitas para construir mundos retro complejos.',
    'showcase.editor.title': 'Espacio de Trabajo Integrado',
    'showcase.editor.description': 'Lienzo intuitivo con herramientas de pincel, borrador, relleno rectangular y pipeta.',
    'showcase.layers.title': 'Gestión de Capas',
    'showcase.layers.description': 'Organiza tu mundo con profundidad. Cambia visibilidad, bloquea capas y ajusta opacidad.',
    'showcase.export.title': 'Optimización de Hardware',
    'showcase.export.description': 'Ajusta la configuración de exportación para que coincida con las restricciones de tu hardware.',
    
    'specs.title': 'Restricciones de Hardware',
    'specs.subtitle': 'Construido para asegurar la compatibilidad con ESP32 y el motor PixelRoot32.',
    'specs.tile_size': 'Tamaño máx tile: 32x32 px',
    'specs.map_dim': 'Dimensión máx mapa: 255x255 tiles',
    'specs.layers': 'Capas máx: 8',
    'specs.color': 'Profundidad de color: 1/2/4 bpp',
    
    'footer.text': 'Parte del ecosistema PixelRoot32.',
    'footer.copyright': '© 2026 PixelRoot32. Todos los derechos reservados.',
    
    'language.english': 'English',
    'language.spanish': 'Español'
  }
});
