import { cart } from '../../data/cart.js'
import { products } from '../../data/products.js'
import { formatCurrency } from '../utils/money.js'
import { deliveryPrice } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';



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

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
        </div>`
    document.querySelector('.js-payment-summary').innerHTML = html;

    const orderButton = document.querySelector('.js-place-order');
    orderButton.addEventListener('click', async () => {

      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        })

        const order = await response.json();
        addOrder(order);

        alert('Thank you for your order!');
        console.log('Order placed');
      } catch (error) {
        console.log('There was an error placing your order. Please try again.');
      }

      window.location.href = 'orders.html';
    });
}

