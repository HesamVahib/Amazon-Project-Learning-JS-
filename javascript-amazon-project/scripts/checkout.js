import { loadProducts } from '../data/products.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/cart-oop.js';
// import '../data/backend-practice.js';

new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderPaymentSummary();
    renderOrderSummary();
});

// I didn't add promiseall to the code. I am going to do that later. to handle loadProductsFetch.
