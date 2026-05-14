/**
 * PayPal Checkout Integration
 * Handles createOrder and onApprove for the Smart Payment Buttons
 *
 * Usage:
 *   1. Load i18n-checkout.js BEFORE this script
 *   2. Load this script after the PayPal SDK
 *   3. Call initPayPalCheckout() when DOM is ready
 */

// IIFE to avoid global scope pollution
(function() {
  'use strict';

  // ─── Configuration ───
  const CONFIG = {
    /**
     * DEV: default '' → /api/… on the Vite origin (proxy + bypass to PREVIEW_PROXY_TARGET).
     *      Set VITE_DEV_API_DIRECT=true and VITE_API_BASE to call the backend URL directly (no proxy).
     * PROD: VITE_API_BASE (absolute URL).
     */
    apiBase: (function resolveApiBase() {
      if (typeof import.meta === 'undefined') {
        return 'https://pr32-paypal-payment.vercel.app';
      }
      if (!import.meta.env.DEV) {
        var prodBase = import.meta.env.VITE_API_BASE || 'https://pr32-paypal-payment.vercel.app';
        return String(prodBase).replace(/\/$/, '');
      }
      if (import.meta.env.VITE_DEV_API_DIRECT === 'true' && import.meta.env.VITE_API_BASE) {
        return String(import.meta.env.VITE_API_BASE).replace(/\/$/, '');
      }
      return '';
    })(),

    // Product ID only - price comes from backend
    productId: 'pr32-license',

    // Currency
    currency: 'USD'
  };

  // ─── DOM Elements ───
  const PAYPAL_BUTTON_CONTAINER = 'paypal-button-container';
  const RESULT_CONTAINER = 'checkout-result';

  // ─── State ───
  let sdkLoaded = false;
  let buttonsHidden = false;
  let lastResult = null; // { type: 'success'|'error'|'duplicate', data: any }
  let currentSessionToken = null; // Session binding token

  // ─── i18n Helper ───
  // Get translation with fallback to English
  function t(key) {
    const i18n = window.CHECKOUT_I18N || { en: {}, es: {} };

    // Detect language from localStorage or browser
    let lang = localStorage.getItem('language');
    if (!lang || !i18n[lang]) {
      lang = navigator.language.split('-')[0];
      if (!i18n[lang]) {
        lang = 'en';
      }
    }

    return i18n[lang]?.[key] || i18n.en?.[key] || key;
  }

  // ─── Initialize PayPal Checkout ───
  function initPayPalCheckout() {
    // If buttons should be hidden (after success/error), don't re-init
    if (buttonsHidden) {
      console.log('[Checkout] Buttons are hidden, skipping initialization');
      
      // If we have a last result, restore it (important for language changes)
      if (lastResult) {
        if (lastResult.type === 'success') showSuccess(lastResult.data);
        else if (lastResult.type === 'error') showError(lastResult.data);
        else if (lastResult.type === 'duplicate') showDuplicate(lastResult.data);
        else if (lastResult.type === 'loading') showLoading(lastResult.data);
      }
      return;
    }

    // Wait for PayPal SDK to be loaded
    if (typeof paypal === 'undefined') {
      console.error('[Checkout] PayPal SDK not loaded');
      return;
    }

    // Restore message if any (even if buttons are visible)
    if (lastResult && lastResult.type === 'message') {
      showMessage(lastResult.data);
    }

    sdkLoaded = true;
    console.log('[Checkout] Initializing PayPal buttons');

    // Clear existing buttons if any
    const container = document.getElementById(PAYPAL_BUTTON_CONTAINER);
    if (container) {
      container.innerHTML = '';
    }

    // Render PayPal Buttons
    paypal.Buttons({
      // ─── Style ───
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        height: 55
      },

      // ─── createOrder ───
      // Called when user clicks the button
      createOrder: function(data, actions) {
        console.log('[Checkout] createOrder called');

        return fetch(`${CONFIG.apiBase}/api/paypal/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product: CONFIG.productId,
            currency: CONFIG.currency
          })
        })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || 'Failed to create order');
            });
          }
          return response.json();
        })
        .then(data => {
          if (!data.orderId) {
            throw new Error('No order ID returned');
          }
          // Store session token for binding validation
          currentSessionToken = data.sessionToken || null;
          console.log('[Checkout] Order created:', data.orderId, 'sessionToken:', currentSessionToken ? 'present' : 'missing');
          return data.orderId;
        })
        .catch(error => {
          console.error('[Checkout] createOrder error:', error);
          showError(t('error_order_creation'));
          return null;
        });
      },

      // ─── onApprove ───
      // Called after user approves on PayPal
      onApprove: function(data, actions) {
        console.log('[Checkout] onApprove called, orderID:', data.orderID);

        showLoading(t('loading'));

        return fetch(`${CONFIG.apiBase}/api/paypal/capture-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: data.orderID,
            sessionToken: currentSessionToken // Session binding validation
          })
        })
        .then(response => response.json())
        .then(result => {
          console.log('[Checkout] Capture result:', result);

          // Backend returns 'ok: true', frontend checks 'success'
          if (result.ok || result.success) {
            if (result.duplicate) {
              showDuplicate(result);
            } else {
              showSuccess(result);
            }
          } else {
            showError(result.error || result.message || t('error_capture'));
          }
        })
        .catch(error => {
          console.error('[Checkout] onApprove error:', error);
          showError(t('error_connection'));
        });
      },

      // ─── onCancel ───
      // Called when user cancels on PayPal
      onCancel: function(data) {
        console.log('[Checkout] onCancel, orderID:', data.orderID);
        showMessage(t('cancel_message'));
      },

      // ─── onError ───
      // Called when PayPal SDK has an error
      onError: function(err) {
        console.error('[Checkout] PayPal SDK error:', err);
        showError(t('error_paypal'));
      }
    }).render(`#${PAYPAL_BUTTON_CONTAINER}`);
  }

  // ─── UI Functions ───

  function hidePayPalButtons() {
    buttonsHidden = true;
    const container = document.getElementById(PAYPAL_BUTTON_CONTAINER);
    if (container) {
      container.style.display = 'none';
    }
  }

  function showLoading(message) {
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

  function showSuccess(result) {
    hidePayPalButtons();
    lastResult = { type: 'success', data: result };
    const container = getOrCreateResultContainer();
    container.innerHTML = `
      <div class="checkout-success">
        <div class="text-center">
          <div class="text-4xl mb-4">✅</div>
          <h3 class="text-primary text-2xl font-mono font-bold uppercase tracking-wider mb-4">
            ${t('success_title')}
          </h3>
          <p class="text-text-muted mb-6">
            ${t('success_message')}
          </p>

          <div class="bg-[#1a1a1a] border-2 border-[#888] p-6 mb-6">
            <p class="font-mono text-white text-lg font-bold leading-relaxed">
              ${t('success_license_info')}
            </p>
          </div>

          <div class="text-text-muted text-sm space-y-1">
            <p>${t('success_transaction_id')}: <span class="font-mono text-xs">${escapeHtml(result.transactionId)}</span></p>
          </div>

          ${result.emailSent ? '' : `
            <p class="text-yellow-500 text-sm mt-4">
              ⚠️ ${t('success_email_warning')}
            </p>
          `}
        </div>
      </div>
    `;
    container.style.display = 'block';

    // Scroll to result
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function showDuplicate(result) {
    hidePayPalButtons();
    lastResult = { type: 'duplicate', data: result };
    const container = getOrCreateResultContainer();
    container.innerHTML = `
      <div class="checkout-duplicate">
        <div class="text-center">
          <div class="text-4xl mb-4">ℹ️</div>
          <h3 class="text-primary text-2xl font-mono font-bold uppercase tracking-wider mb-4">
            ${t('duplicate_title')}
          </h3>
          <p class="text-text-muted mb-4">
            ${t('duplicate_message')}
          </p>
          <p class="text-text-muted text-sm">
            ${t('duplicate_id')}: <span class="font-mono">${escapeHtml(result.transactionId)}</span>
          </p>
          <p class="text-text-muted text-sm mt-2">
            ${t('duplicate_email_hint')}
          </p>
        </div>
      </div>
    `;
    container.style.display = 'block';
  }

  function showError(message) {
    hidePayPalButtons();
    lastResult = { type: 'error', data: message };
    const container = getOrCreateResultContainer();
    container.innerHTML = `
      <div class="checkout-error">
        <div class="text-center">
          <div class="text-4xl mb-4">❌</div>
          <h3 class="text-red-500 text-2xl font-mono font-bold uppercase tracking-wider mb-4">
            ${t('error_title')}
          </h3>
          <p class="text-text-muted">${escapeHtml(message)}</p>
          <button
            onclick="location.reload()"
            class="mt-6 px-6 py-3 bg-primary text-white font-mono font-bold uppercase tracking-wider hover:bg-primary-hover transition-colors"
          >
            ${t('error_retry')}
          </button>
        </div>
      </div>
    `;
    container.style.display = 'block';
  }

  function showMessage(message) {
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

  function getOrCreateResultContainer() {
    let container = document.getElementById(RESULT_CONTAINER);
    if (!container) {
      container = document.createElement('div');
      container.id = RESULT_CONTAINER;
      container.className = 'checkout-result-container mt-6';

      // Find the paypal button container and insert after it
      const buttonContainer = document.getElementById(PAYPAL_BUTTON_CONTAINER);
      if (buttonContainer) {
        buttonContainer.parentNode.insertBefore(container, buttonContainer.nextSibling);
      } else {
        document.body.appendChild(container);
      }
    }
    return container;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ─── SDK Loader ───

  function getPayPalLocale() {
    let lang = localStorage.getItem('language');
    if (!lang) {
      lang = navigator.language.split('-')[0];
    }
    return lang === 'es' ? 'es_ES' : 'en_US';
  }

  function loadPayPalSDK() {
    // If buttons should be hidden, don't load SDK again if not needed
    if (buttonsHidden && sdkLoaded) return;

    const currentLocale = getPayPalLocale();

    // Check if we need to reload due to locale change
    const oldScript = document.getElementById('paypal-sdk-script');
    if (oldScript) {
      if (oldScript.getAttribute('data-locale') === currentLocale) {
        return; // Already loaded with correct locale
      }
      // Different locale, remove old one to reload with new locale
      oldScript.remove();
      // Note: We don't delete window.paypal as it might cause issues with 
      // scripts already holding references, but the new SDK script 
      // will overwrite the global object.
      sdkLoaded = false;
    }

    const clientId = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PAYPAL_CLIENT_ID)
      ? import.meta.env.VITE_PAYPAL_CLIENT_ID
      : 'sb'; // 'sb' for sandbox

    const script = document.createElement('script');
    script.id = 'paypal-sdk-script';
    script.setAttribute('data-locale', currentLocale);
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${CONFIG.currency}&locale=${currentLocale}`;
    script.setAttribute('data-sdk-integration-source', 'button-factory');
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

  // ─── Export for manual initialization ───
  window.PayPalCheckout = {
    init: initPayPalCheckout,
    loadSDK: loadPayPalSDK,
    CONFIG,
    t: t // Expose translation function
  };

  // ─── Auto-initialize when DOM is ready ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPayPalSDK);
  } else {
    loadPayPalSDK();
  }

  // ─── Re-initialize on language change ───
  // The whole app re-renders on language change, so we need to re-inject the buttons
  window.addEventListener('languageChanged', () => {
    console.log('[Checkout] Language changed, checking SDK locale');
    // Wait a bit for the DOM to be updated by the main app render
    setTimeout(loadPayPalSDK, 100);
  });
})();
