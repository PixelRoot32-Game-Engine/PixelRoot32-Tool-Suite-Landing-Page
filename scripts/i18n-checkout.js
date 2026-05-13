/**
 * Checkout UI Translations
 * Exposes i18n translations for the checkout flow to be used by checkout.js
 * This file should be included BEFORE checkout.js in the HTML
 */

window.CHECKOUT_I18N = {
  en: {
    loading: 'Processing your license...',
    success_title: 'Thank you for your support!',
    success_message: 'Your purchase has been processed successfully.',
    success_license_info: 'You will receive an email with your license key shortly.',
    success_transaction_id: 'Transaction ID',
    success_email_warning: 'Check your spam folder if you don\'t see the email within a few minutes.',
    duplicate_title: 'Transaction Already Processed',
    duplicate_message: 'This transaction was already processed.',
    duplicate_id: 'ID',
    duplicate_email_hint: 'Check your email for the original license.',
    error_title: 'Error',
    error_retry: 'Retry',
    cancel_message: 'Payment cancelled. No charge was made.',
    error_order_creation: 'Unable to start payment. Please try again.',
    error_capture: 'Error processing payment',
    error_connection: 'Connection error. Please try again.',
    error_paypal: 'PayPal error. Please try again.'
  },
  es: {
    loading: 'Procesando tu licencia...',
    success_title: '¡Gracias por el apoyo!',
    success_message: 'Tu compra ha sido procesada correctamente.',
    success_license_info: 'Recibirás un correo electrónico con tu licencia.',
    success_transaction_id: 'ID de Transacción',
    success_email_warning: 'Revisa tu carpeta de spam si no ves el email en minutos.',
    duplicate_title: 'Transacción Ya Procesada',
    duplicate_message: 'Esta transacción ya fue procesada anteriormente.',
    duplicate_id: 'ID',
    duplicate_email_hint: 'Revisa tu correo para la licencia original.',
    error_title: 'Error',
    error_retry: 'Reintentar',
    cancel_message: 'Pago cancelado. No se ha realizado ningún cargo.',
    error_order_creation: 'No se pudo iniciar el pago. Por favor intenta de nuevo.',
    error_capture: 'Error procesando el pago',
    error_connection: 'Error de conexión. Por favor intenta de nuevo.',
    error_paypal: 'Error de PayPal. Por favor intenta de nuevo.'
  }
};
