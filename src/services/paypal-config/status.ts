export const CheckoutResultStatus = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  DUPLICATE: 'duplicate',
  LOADING: 'loading',
  MESSAGE: 'message',
} as const);

export type CheckoutResultStatusType = typeof CheckoutResultStatus[keyof typeof CheckoutResultStatus];

export const PayPalButtonState = Object.freeze({
  INITIAL: 'initial',
  LOADING: 'loading',
  READY: 'ready',
  HIDDEN: 'hidden',
} as const);