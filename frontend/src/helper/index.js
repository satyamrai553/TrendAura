const CART_KEY = "cart";

// Get cart from localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Clear cart from localStorage
const clearCartFromLocalStorage = () => {
  localStorage.removeItem(CART_KEY);
};


export {
    getCartFromLocalStorage,
    saveCartToLocalStorage,
    clearCartFromLocalStorage
}