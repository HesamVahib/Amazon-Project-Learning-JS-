export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addItemToCart(button) {
    const productId = button.dataset.productId;
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    };
    saveToStorage();
};

export function removeFromCart(productId) {
    let cartAfterDelete = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            cartAfterDelete.push(cartItem);
        };
        
    });
    cart = cartAfterDelete;
    saveToStorage();
};