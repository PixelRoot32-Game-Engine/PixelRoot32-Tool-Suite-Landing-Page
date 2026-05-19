export const PayPalFrontendConfig = Object.freeze({
  API_BASE: {
    DEFAULT: 'https://pr32-paypal-payment.vercel.app',
    DEV_FALLBACK: '',
  },
  PAYPAL_SDK: {
    BASE_URL: 'https://www.paypal.com/sdk/js',
    DEFAULT_LOCALE: 'en_US',
    SUPPORTED_LOCALES: ['en_US', 'es_ES'],
  },
  PRODUCT: {
    ID: 'pr32-license',
    DEFAULT_CURRENCY: 'USD',
  },
  UI: {
    BUTTON_CONTAINER_ID: 'paypal-button-container',
    RESULT_CONTAINER_ID: 'checkout-result',
  },
  TIMEOUT_MS: 30000,
});

export const PayPalBrand = Object.freeze({
  NAME: 'PixelRoot32',
});