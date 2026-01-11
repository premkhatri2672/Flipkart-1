document.addEventListener('DOMContentLoaded', function () {
  // ===== SEARCH BAR FUNCTIONALITY =====
  const searchBar = document.querySelector('.search');
  const searchSpan = document.querySelector('.search span');
  
  if (searchBar) {
    searchBar.addEventListener('click', function() {
      const userInput = prompt('Search for Products, Brands And More');
      if (userInput && userInput.trim()) {
        console.log('Search query:', userInput);
        alert('Searching for: ' + userInput);
      }
    });
  }

  // ===== MENU ITEMS CLICK HANDLER =====
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const category = this.innerText.trim();
      console.log('Navigating to:', category);
      alert('Category: ' + category);
    });
  });

  // ===== HEADER ICONS CLICK HANDLER =====
  const headerIcons = document.querySelectorAll('.header .icon');
  headerIcons.forEach((icon, index) => {
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', function() {
      const labels = ['Login', 'Cart', 'More'];
      if (index === 0) {
        // Login icon - redirect to login page
        window.location.href = 'login.html';
      } else if (index === 1) {
        // Cart icon - redirect to cart page
        window.location.href = 'cart.html';
      } else {
        console.log(labels[index] + ' clicked');
        alert(labels[index] + ' - Coming soon!');
      }
    });
  });

  // ===== TOP DEALS CARDS CLICK =====
  const dealCards = document.querySelectorAll('.deal');
  dealCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
      e.preventDefault();
      const title = this.querySelector('.deal-title').innerText;
      console.log('Deal selected:', title);
      window.flipkartApp.addToCart(title);
      alert('✓ Added to cart: ' + title + '\n\nClick Cart icon to view your cart');
    });
  });

  // ===== PROMO CARDS CLICK =====
  const promoCards = document.querySelectorAll('.promo-card:not(.promo-shop-now)');
  promoCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      const title = this.querySelector('h3').innerText;
      console.log('Promo selected:', title);
      alert('View ' + title + ' deals');
    });
  });

  // ===== PROMO IMAGES CLICK =====
  const promoImages = document.querySelectorAll('.promo-images img');
  promoImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      const alt = this.alt;
      console.log('Product clicked:', alt);
      alert('Product: ' + alt + ' - View details');
    });
  });

  // ===== SHOP NOW CLICK =====
  const shopNowCard = document.querySelector('.promo-shop-now');
  if (shopNowCard) {
    shopNowCard.style.cursor = 'pointer';
    shopNowCard.addEventListener('click', function() {
      alert('Shop Now - Browse all products!');
    });
  }

  // ===== CATEGORY CARDS CLICK =====
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      const categoryTitle = this.querySelector('.category-title').innerText;
      console.log('Category selected:', categoryTitle);
      alert('Browsing ' + categoryTitle + ' category');
    });
  });

  // ===== CATEGORY ITEMS CLICK =====
  const categoryItems = document.querySelectorAll('.category-items a');
  categoryItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const product = this.innerText;
      console.log('Product selected:', product);
      window.flipkartApp.addToCart(product);
      alert('✓ Added to cart: ' + product + '\n\nClick Cart icon to view your cart');
    });
  });

  // ===== INFO CARDS CLICK =====
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      const title = this.querySelector('h3').innerText;
      console.log('Info card clicked:', title);
      alert('Learn more about: ' + title);
    });
  });

  // ===== FOOTER LINKS CLICK =====
  const footerLinks = document.querySelectorAll('.footer a');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const text = this.innerText;
      console.log('Footer link clicked:', text);
      alert('Navigate to: ' + text);
    });
  });

  // ===== PAYMENT CARDS CLICK =====
  const paymentCards = document.querySelectorAll('.payment-card');
  paymentCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      const paymentMethod = this.querySelector('span:last-child').innerText;
      console.log('Payment method selected:', paymentMethod);
      alert('Payment method: ' + paymentMethod);
    });
  });

  // ===== SOCIAL ICONS CLICK =====
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach((icon, index) => {
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      const platforms = ['Facebook', 'Twitter', 'Instagram', 'YouTube'];
      console.log('Social platform:', platforms[index]);
      alert('Follow us on ' + platforms[index]);
    });
  });

  // ===== SMOOTH SCROLL TO SECTIONS =====
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href === '#') {
      e.preventDefault();
    }
  });

  // ===== LOGO CLICK - HOME =====
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log('Home - scroll to top');
    });
  }

  // ===== KEYBOARD SHORTCUTS =====
  document.addEventListener('keydown', function(e) {
    if (e.key === 's' || e.key === 'S') {
      searchBar.click();
    }
  });

  // ===== RESPONSIVE MOBILE MENU =====
  function handleResponsive() {
    const width = window.innerWidth;
    if (width < 600) {
      console.log('Mobile view detected');
    } else if (width < 1000) {
      console.log('Tablet view detected');
    } else {
      console.log('Desktop view detected');
    }
  }

  window.addEventListener('resize', handleResponsive);
  handleResponsive();

  // ===== CART STORAGE (LOCAL STORAGE) =====
  let cart = JSON.parse(localStorage.getItem('flipkartCart')) || [];

  function addToCart(productName) {
    const item = { name: productName, date: new Date().toLocaleString() };
    cart.push(item);
    localStorage.setItem('flipkartCart', JSON.stringify(cart));
    console.log('Cart updated:', cart);
  }

  // Store reference for external use
  window.flipkartApp = {
    addToCart: addToCart,
    getCart: () => cart,
    clearCart: () => { cart = []; localStorage.removeItem('flipkartCart'); }
  };

  // ===== FORM VALIDATION FOR SEARCH =====
  function validateSearch(query) {
    return query && query.trim().length > 0;
  }

  // ===== CONSOLE GREETING =====
  console.log('%cWelcome to Flipkart!', 'color: #00a4ef; font-size: 20px; font-weight: bold;');
  console.log('Interactive features enabled. Click on products and cards to see actions.');

});
