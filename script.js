// Product Data
const products = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 24.99,
        category: "fiction",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400",
        rating: 4.8
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 21.50,
        category: "non-fiction",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400",
        rating: 4.9
    },
    {
        id: 3,
        title: "Dune",
        author: "Frank Herbert",
        price: 18.20,
        category: "sci-fi",
        image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400",
        rating: 4.7
    },
    {
        id: 4,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 26.00,
        category: "non-fiction",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400",
        rating: 4.8
    },
    {
        id: 5,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 22.95,
        category: "sci-fi",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400",
        rating: 4.9
    },
    {
        id: 6,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 19.99,
        category: "fiction",
        image: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400",
        rating: 4.5
    },
    {
        id: 7,
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        price: 25.50,
        category: "non-fiction",
        image: "https://images.unsplash.com/photo-1555448248-2571daf6344b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400",
        rating: 4.6
    },
    {
        id: 8,
        title: "Tomorrow, and Tomorrow",
        author: "Gabrielle Zevin",
        price: 23.40,
        category: "fiction",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400",
        rating: 4.7
    }
];

// Cart State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElements = document.querySelectorAll('.cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const navbar = document.getElementById('navbar');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
    handleScroll();
});

// Render Products
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        // Generate stars
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fa-solid fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
        }

        const productHTML = `
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.title}" class="product-img">
                    <div class="add-to-cart-overlay">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-author">${product.author}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <div class="product-rating">
                            ${starsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsGrid.insertAdjacentHTML('beforeend', productHTML);
    });
}

// Event Listeners Setup
function setupEventListeners() {
    // Scroll for navbar
    window.addEventListener('scroll', handleScroll);

    // Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active class
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Filter products
            const filterValue = e.target.getAttribute('data-filter');
            if (filterValue === 'all') {
                renderProducts(products);
            } else {
                const filteredProducts = products.filter(p => p.category === filterValue);
                renderProducts(filteredProducts);
            }
        });
    });

    // Cart overlay toggles
    cartBtn.addEventListener('click', () => {
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeCartBtn.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Navbar Scroll Effect
function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`${product.title} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = totalItems);

    // Render items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your bag is empty.</div>';
        cartTotalPrice.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-author">${item.author}</p>
                    <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

// Toast Notification
function showToast(message) {
    // Check if toast already exists, remove it
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toastHTML = `
        <div class="toast-notification">
            <i class="fa-solid fa-circle-check toast-icon"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', toastHTML);
    
    const toast = document.querySelector('.toast-notification');
    
    // Trigger reflow
    void toast.offsetWidth;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            if (this.classList.contains('active') === false && this.closest('.nav-links')) {
                this.classList.add('active');
            }

            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
