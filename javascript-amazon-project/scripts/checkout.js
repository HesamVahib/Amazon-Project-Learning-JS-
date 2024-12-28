import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js'
import { products } from '../data/products.js'
import { formatCurrency } from './utils/money.js';
import { deliveryOptions, deliveryDate } from '../data/deliveryOptions.js';


function renderCart() {
    function deliveryOptionsHTML (productId, cartItem) {
        let html = '';

        deliveryOptions.forEach((option) => {
            const priceString = option.price === 0 ? 'FREE Shipping' : `$${formatCurrency(option.price)} - Shipping`;

            const isChecked = option.id === cartItem.deliveryOptionsId;
            html += 
            `<div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${option.id}">
                            <input type="radio" ${isChecked ? 'checked' : ''}
                                class="delivery-option-input"
                                name="delivery-option-${productId}">
                            <div>
                                <div class="delivery-option-date">
                                ${deliveryDate(option.id)}
                                </div>
                                <div class="delivery-option-price">
                                ${priceString}
                                </div>
                            </div>
                            </div>`
        });
        return html;
    };

    let cartHtml = '';
    cart.forEach((cartItem) => {
        const deliveryOptionId = cartItem.deliveryOptionsId;

        products.forEach((product) => {
            if (cartItem.productId === product.id) {
                let correctPrice = formatCurrency(product.priceCents);
                cartHtml += `<div class="cart-item-container js-cart-item-container-${product.id}">
                        <div class="delivery-date">
                        Delivery date: ${deliveryDate(cartItem.deliveryOptionsId)}
                        </div>

                        <div class="cart-item-details-grid">
                        <img class="product-image"
                            src="${product.image}">

                        <div class="cart-item-details">
                            <div class="product-name">
                            ${product.name}
                            </div>
                            <div class="product-price">
                            $${correctPrice}
                            </div>
                            <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">
                                Delete
                            </span>
                            </div>
                        </div>

                        <div class="delivery-options js-delivery-options">
                            <div class="delivery-options-title">
                            Choose a delivery option:
                            </div>
                        ${deliveryOptionsHTML(product.id, cartItem)}
                        </div>
                        </div>
                    </div>`
            };
        });
    });

    document.querySelector('.js-order-summary').innerHTML = cartHtml;

    document.querySelector('.js-return-to-home').innerHTML = `${cart.length} items`;

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);
                
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();
            });
        });

        document.querySelectorAll('.js-delivery-option').forEach((Element) => {
            Element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = Element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderCart();
            });
        });
    };

renderCart();