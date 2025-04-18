
/// <reference types="vite/client" />
/// <reference types="razorpay-checkout" />

interface Window {
  Razorpay: typeof import('razorpay-checkout');
}
