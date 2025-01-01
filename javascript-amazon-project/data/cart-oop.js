class Cart {
   items;
   #localStorageKey;
    
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.items = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.items));
    }

    addItemToCart(productId) {
        let matchingItem;
    
        this.items.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
    
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.items.push({
                productId: productId,
                quantity: 1,
                deliveryOptionsId: '1'
            });
        };
        this.saveToStorage();
    }

    removeFromCart(productId) {
        let cartAfterDelete = [];
        this.items.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                cartAfterDelete.push(cartItem);
            };
            
        });
        this.items = cartAfterDelete;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        this.items.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.deliveryOptionsId = deliveryOptionId;
            };
        });
        this.saveToStorage();
    }
};




const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

