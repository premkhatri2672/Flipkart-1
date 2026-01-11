document.addEventListener('DOMContentLoaded', function () {
  // Cart product database with prices
  const productDatabase = {
    'Projectors from 1999': { price: 1999, emoji: '🎬', description: 'HD Quality Projector' },
    'Electronics Accessories from 1299': { price: 1299, emoji: '🔌', description: 'Quality Electronics' },
    'Monitors From 2999': { price: 2999, emoji: '🖥️', description: 'HD Monitor' },
    'Cameras from 4199': { price: 4199, emoji: '📷', description: 'Digital Camera' },
    'Watches from 599': { price: 599, emoji: '⌚', description: 'Stylish Watch' },
    'Today\'s Special': { price: 899, emoji: '✨', description: 'Special Offer Product' },
    'Electronics Offer': { price: 1599, emoji: '⚡', description: 'Electronics Deal' },
    'Fashion Picks': { price: 799, emoji: '👗', description: 'Latest Fashion' },
    'Limited Combo': { price: 1299, emoji: '🎁', description: 'Combo Deal' },
    'Free Delivery': { price: 499, emoji: '🚚', description: 'Free Shipping Item' },
    'Winter Essentials': { price: 349, emoji: '🧥', description: 'Winter Collection' },
    'Fashion Top Deals': { price: 649, emoji: '👟', description: 'Fashion Deal' },
    'Big Fashion Sale': { price: 799, emoji: '👕', description: 'Fashion Item' },
    'Up to 50% Off': { price: 599, emoji: '💰', description: 'Discounted Item' },
    'New Arrivals': { price: 1099, emoji: '📦', description: 'New Product' },
    'Limited Time Deal': { price: 449, emoji: '⏰', description: 'Time Limited Offer' },
    'Free Delivery Today': { price: 299, emoji: '📦', description: 'Fast Delivery Item' },
    'Power Banks': { price: 799, emoji: '🔋', description: 'Portable Charger' },
    'Earbuds': { price: 1299, emoji: '🎧', description: 'Wireless Earbuds' },
    'Screen Protectors': { price: 199, emoji: '🛡️', description: 'Device Protection' },
    'Phone Cases': { price: 299, emoji: '📱', description: 'Phone Case' }
  };

  // Get current user
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Check if user is logged in
  if (!currentUser) {
    document.getElementById('loginPrompt').style.display = 'block';
    document.getElementById('cartContent').style.display = 'none';
    document.getElementById('emptyCart').style.display = 'none';
    return;
  }

  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('flipkartCart')) || [];

  // Process cart - merge duplicate items
  const processedCart = {};
  cart.forEach(item => {
    if (processedCart[item.name]) {
      processedCart[item.name].quantity += 1;
    } else {
      processedCart[item.name] = {
        name: item.name,
        quantity: 1,
        ...productDatabase[item.name] || { price: 0, emoji: '📦', description: 'Product' }
      };
    }
  });

  const cartItemsArray = Object.values(processedCart);

  // Display cart or empty message
  if (cartItemsArray.length === 0) {
    document.getElementById('cartContent').style.display = 'none';
    document.getElementById('emptyCart').style.display = 'block';
  } else {
    document.getElementById('cartContent').style.display = 'grid';
    document.getElementById('emptyCart').style.display = 'none';
    displayCart(cartItemsArray);
  }

  function displayCart(items) {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    items.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <div class="cart-item-image">${item.emoji}</div>
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">₹${item.price}</div>
          <div class="cart-item-desc">${item.description}</div>
          <div class="quantity-control">
            <button onclick="decreaseQuantity(${index})">-</button>
            <span id="qty-${index}">${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      `;
      cartItemsDiv.appendChild(itemElement);
    });

    // Make functions global
    window.decreaseQuantity = function(index) {
      if (cartItemsArray[index].quantity > 1) {
        cartItemsArray[index].quantity--;
        document.getElementById('qty-' + index).innerText = cartItemsArray[index].quantity;
        updateSummary(cartItemsArray);
      }
    };

    window.increaseQuantity = function(index) {
      cartItemsArray[index].quantity++;
      document.getElementById('qty-' + index).innerText = cartItemsArray[index].quantity;
      updateSummary(cartItemsArray);
    };

    window.removeItem = function(index) {
      if (confirm('Are you sure you want to remove this item?')) {
        cartItemsArray.splice(index, 1);
        if (cartItemsArray.length === 0) {
          localStorage.removeItem('flipkartCart');
          document.getElementById('cartContent').style.display = 'none';
          document.getElementById('emptyCart').style.display = 'block';
        } else {
          displayCart(cartItemsArray);
          updateSummary(cartItemsArray);
        }
      }
    };

    updateSummary(cartItemsArray);
  }

  function updateSummary(items) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCharge = subtotal > 2000 ? 0 : 50;
    const discount = Math.floor(subtotal * 0.1);
    const total = subtotal + deliveryCharge - discount;

    document.getElementById('subtotal').innerText = '₹' + subtotal;
    document.getElementById('delivery').innerText = deliveryCharge === 0 ? 'Free' : '₹' + deliveryCharge;
    document.getElementById('discount').innerText = '-₹' + discount;
    document.getElementById('totalPrice').innerText = '₹' + total;
  }

  // Continue Shopping Button
  const continueBtn = document.querySelector('.continue-shopping');
  if (continueBtn) {
    continueBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }

  // Checkout Button
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      const total = document.getElementById('totalPrice').innerText;
      alert('Proceeding to checkout with total: ' + total + '\n\nThis is a demo checkout. Thank you for shopping!');
      // Clear cart after checkout
      localStorage.removeItem('flipkartCart');
      window.location.href = 'index.html';
    });
  }

  console.log('%cCart System Loaded', 'color: #00a4ef; font-size: 16px; font-weight: bold;');

});
