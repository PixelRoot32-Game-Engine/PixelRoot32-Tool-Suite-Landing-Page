import {
  PayPalFrontendConfig,
  PayPalApiEndpoints,
  PayPalSdkParams,
} from './paypal-config';
import { i18n } from '../i18n';

declare global {
  interface Window {
    paypal: {
      Buttons: (config: unknown) => { render: (selector: string) => void };
    };
  }
}

interface CheckoutResult {
  type: 'success' | 'error' | 'duplicate' | 'loading' | 'message';
  data: unknown;
}

interface CreateOrderResponse {
  orderId?: string;
  sessionToken?: string;
  ok?: boolean;
  success?: boolean;
  error?: string;
  message?: string;
}

interface CaptureResponse {
  ok?: boolean;
  success?: boolean;
  duplicate?: boolean;
  transactionId?: string;
  emailSent?: boolean;
  error?: string;
  message?: string;
}

const CheckoutConfig = {
  apiBase: (() => {
    if (typeof import.meta === 'undefined') {
      return PayPalFrontendConfig.API_BASE.DEFAULT;
    }
    if (!import.meta.env.DEV) {
      const prodBase = import.meta.env.VITE_API_BASE || PayPalFrontendConfig.API_BASE.DEFAULT;
      return String(prodBase).replace(/\/$/, '');
    }
    if (import.meta.env.VITE_DEV_API_DIRECT === 'true' && import.meta.env.VITE_API_BASE) {
      return String(import.meta.env.VITE_API_BASE).replace(/\/$/, '');
    }
    return PayPalFrontendConfig.API_BASE.DEV_FALLBACK;
  })(),
  productId: PayPalFrontendConfig.PRODUCT.ID,
  currency: PayPalFrontendConfig.PRODUCT.DEFAULT_CURRENCY,
};

let sdkLoaded = false;
let buttonsHidden = false;
let lastResult: CheckoutResult | null = null;
let currentSessionToken: string | null = null;

function t(key: string): string {
  return i18n.t(`checkout.${key}`, key);
}

function initPayPalCheckout(): void {
  if (buttonsHidden) {
    console.log('[Checkout] Buttons are hidden, skipping initialization');

    if (lastResult) {
      if (lastResult.type === 'success') showSuccess(lastResult.data as CaptureResponse);
      else if (lastResult.type === 'error') showError(lastResult.data as string);
      else if (lastResult.type === 'duplicate') showDuplicate(lastResult.data as CaptureResponse);
      else if (lastResult.type === 'loading') showLoading(lastResult.data as string);
    }
    return;
  }

  if (typeof window.paypal === 'undefined') {
    console.error('[Checkout] PayPal SDK not loaded');
    return;
  }

  if (lastResult && lastResult.type === 'message') {
    showMessage(lastResult.data as string);
  }

  sdkLoaded = true;
  console.log('[Checkout] Initializing PayPal buttons');

  const container = document.getElementById(PayPalFrontendConfig.UI.BUTTON_CONTAINER_ID);
  if (container) {
    container.innerHTML = '';
  }

  window.paypal.Buttons({
    style: {
      layout: 'vertical',
      color: 'gold',
      shape: 'rect',
      label: 'paypal',
      height: 55,
    },

    createOrder: function (_data: unknown, _actions: unknown) {
      console.log('[Checkout] createOrder called');

      return fetch(`${CheckoutConfig.apiBase}${PayPalApiEndpoints.CREATE_ORDER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: CheckoutConfig.productId,
          currency: CheckoutConfig.currency,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(err.message || 'Failed to create order');
            });
          }
          return response.json();
        })
        .then((data: CreateOrderResponse) => {
          if (!data.orderId) {
            throw new Error('No order ID returned');
          }
          currentSessionToken = data.sessionToken || null;
          console.log('[Checkout] Order created:', data.orderId, 'sessionToken:', currentSessionToken ? 'present' : 'missing');
          return data.orderId;
        })
        .catch((error) => {
          console.error('[Checkout] createOrder error:', error);
          showError(t('error.order_creation'));
          return null;
        });
    },

    onApprove: function (data: { orderID: string }, _actions: unknown) {
      console.log('[Checkout] onApprove called, orderID:', data.orderID);

      showLoading(t('loading'));

      return fetch(`${CheckoutConfig.apiBase}${PayPalApiEndpoints.CAPTURE_ORDER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data.orderID,
          sessionToken: currentSessionToken,
        }),
      })
        .then((response) => response.json())
        .then((result: CaptureResponse) => {
          console.log('[Checkout] Capture result:', result);

          if (result.ok || result.success) {
            if (result.duplicate) {
              showDuplicate(result);
            } else {
              showSuccess(result);
            }
          } else {
            showError(result.error || result.message || t('error.capture'));
          }
        })
        .catch((error) => {
          console.error('[Checkout] onApprove error:', error);
          showError(t('error.connection'));
        });
    },

    onCancel: function (_data: unknown) {
      console.log('[Checkout] onCancel');
      showMessage(t('cancel.message'));
    },

    onError: function (err: unknown) {
      console.error('[Checkout] PayPal SDK error:', err);
      showError(t('error.paypal'));
    },
  }).render(`#${PayPalFrontendConfig.UI.BUTTON_CONTAINER_ID}`);
}

function hidePayPalButtons(): void {
  buttonsHidden = true;
  const container = document.getElementById(PayPalFrontendConfig.UI.BUTTON_CONTAINER_ID);
  if (container) {
    container.style.display = 'none';
  }
}

function showLoading(message: string): void {
  hidePayPalButtons();
  lastResult = { type: 'loading', data: message };
  const container = getOrCreateResultContainer();
  container.innerHTML = `
    <div class="checkout-loading">
      <div class="spinner"></div>
      <p class="text-white font-mono text-lg">${escapeHtml(message)}</p>
    </div>
  `;
  container.style.display = 'block';
}

function showSuccess(result: CaptureResponse): void {
  hidePayPalButtons();
  lastResult = { type: 'success', data: result };
  const container = getOrCreateResultContainer();
  container.innerHTML = `
    <div class="checkout-success">
      <div class="text-center">
        <div class="text-4xl mb-4">✅</div>
        <h3 class="text-primary text-2xl font-mono font-bold uppercase tracking-wider mb-4">
          ${t('success.title')}
        </h3>
        <p class="text-text-muted mb-6">
          ${t('success.message')}
        </p>

        <div class="bg-[#1a1a1a] border-2 border-[#888] p-6 mb-6">
          <p class="font-mono text-white text-lg font-bold leading-relaxed">
            ${t('success.license_info')}
          </p>
        </div>

        <div class="text-text-muted text-sm space-y-1">
          <p>${t('success.transaction_id')}: <span class="font-mono text-xs">${escapeHtml(result.transactionId || '')}</span></p>
        </div>

        ${result.emailSent ? '' : `
          <p class="text-yellow-500 text-sm mt-4">
            ⚠️ ${t('success.email_warning')}
          </p>
        `}
      </div>
    </div>
  `;
  container.style.display = 'block';
  container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showDuplicate(result: CaptureResponse): void {
  hidePayPalButtons();
  lastResult = { type: 'duplicate', data: result };
  const container = getOrCreateResultContainer();
  container.innerHTML = `
    <div class="checkout-duplicate">
      <div class="text-center">
        <div class="text-4xl mb-4">ℹ️</div>
        <h3 class="text-primary text-2xl font-mono font-bold uppercase tracking-wider mb-4">
          ${t('duplicate.title')}
        </h3>
        <p class="text-text-muted mb-4">
          ${t('duplicate.message')}
        </p>
        <p class="text-text-muted text-sm">
          ${t('duplicate.id')}: <span class="font-mono">${escapeHtml(result.transactionId || '')}</span>
        </p>
        <p class="text-text-muted text-sm mt-2">
          ${t('duplicate.email_hint')}
        </p>
      </div>
    </div>
  `;
  container.style.display = 'block';
}

function showError(message: string): void {
  hidePayPalButtons();
  lastResult = { type: 'error', data: message };
  const container = getOrCreateResultContainer();
  container.innerHTML = `
    <div class="checkout-error">
      <div class="text-center">
        <div class="text-4xl mb-4">❌</div>
        <h3 class="text-red-500 text-2xl font-mono font-bold uppercase tracking-wider mb-4">
          ${t('error.title')}
        </h3>
        <p class="text-text-muted">${escapeHtml(message)}</p>
        <button
          onclick="location.reload()"
          class="mt-6 px-6 py-3 bg-primary text-white font-mono font-bold uppercase tracking-wider hover:bg-primary-hover transition-colors"
        >
          ${t('error.retry')}
        </button>
      </div>
    </div>
  `;
  container.style.display = 'block';
}

function showMessage(message: string): void {
  lastResult = { type: 'message', data: message };
  const container = getOrCreateResultContainer();
  container.innerHTML = `
    <div class="checkout-message">
      <div class="text-center">
        <div class="text-4xl mb-4">ℹ️</div>
        <p class="text-text-muted">${escapeHtml(message)}</p>
      </div>
    </div>
  `;
  container.style.display = 'block';
}

function getOrCreateResultContainer(): HTMLElement {
  let container = document.getElementById(PayPalFrontendConfig.UI.RESULT_CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = PayPalFrontendConfig.UI.RESULT_CONTAINER_ID;
    container.className = 'checkout-result-container mt-6';

    const buttonContainer = document.getElementById(PayPalFrontendConfig.UI.BUTTON_CONTAINER_ID);
    if (buttonContainer && buttonContainer.parentNode) {
      buttonContainer.parentNode.insertBefore(container, buttonContainer.nextSibling);
    } else {
      document.body.appendChild(container);
    }
  }
  return container;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getPayPalLocale(): string {
  const lang = i18n.getLanguage();
  return lang === 'es' ? 'es_ES' : 'en_US';
}

function loadPayPalSDK(): void {
  if (buttonsHidden && sdkLoaded) return;

  const currentLocale = getPayPalLocale();

  const oldScript = document.getElementById('paypal-sdk-script');
  if (oldScript) {
    if (oldScript.getAttribute('data-locale') === currentLocale) {
      return;
    }
    oldScript.remove();
    sdkLoaded = false;
  }

  const clientId = typeof import.meta !== 'undefined' && import.meta.env?.VITE_PAYPAL_CLIENT_ID
    ? import.meta.env.VITE_PAYPAL_CLIENT_ID
    : 'sb';

  const script = document.createElement('script');
  script.id = 'paypal-sdk-script';
  script.setAttribute('data-locale', currentLocale);
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${CheckoutConfig.currency}&locale=${currentLocale}`;
  script.setAttribute('data-sdk-integration-source', PayPalSdkParams.BUTTON_FACTORY);
  script.onload = () => {
    console.log(`[Checkout] PayPal SDK loaded (${currentLocale})`);
    sdkLoaded = true;
    initPayPalCheckout();
  };
  script.onerror = () => {
    console.error('[Checkout] Failed to load PayPal SDK');
  };
  document.head.appendChild(script);
}

export const PayPalCheckout = {
  init: initPayPalCheckout,
  loadSDK: loadPayPalSDK,
  CONFIG: CheckoutConfig,
  t: t,
};

export function initPayPalCheckoutMain(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPayPalSDK);
  } else {
    loadPayPalSDK();
  }

  window.addEventListener('languageChanged', () => {
    console.log('[Checkout] Language changed, checking SDK locale');
    setTimeout(loadPayPalSDK, 100);
  });
}

initPayPalCheckoutMain();