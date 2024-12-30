import { cart } from '../../data/cart.js'
import { products } from '../../data/products.js'
import { formatCurrency } from '../utils/money.js'
import { deliveryPrice } from '../../data/deliveryOptions.js';



export function renderPaymentSummary() {
    let html = '';
    let totalPrice = 0;
    let deliveryCostTotal = 0;
    let totalCost = 0;

    cart.forEach((item) => {
        products.forEach((product) => {
            if (item.productId === product.id) {
                totalPrice += (item.quantity * product.priceCents);
                deliveryCostTotal += deliveryPrice(item.deliveryOptionsId);
            }
            
        })
    });
    totalPrice = parseFloat(formatCurrency(totalPrice));
    deliveryCostTotal = parseFloat(formatCurrency(deliveryCostTotal));
    totalCost = parseFloat((deliveryCostTotal + totalPrice).toFixed(2));

    const taxPrice = parseFloat(formatCurrency((totalCost * 10)));
    const afterTax = (totalCost + taxPrice).toFixed(2);

    html += `<div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${totalPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${deliveryCostTotal}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalCost}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxPrice}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${afterTax}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`
    document.querySelector('.js-payment-summary').innerHTML = html;
}