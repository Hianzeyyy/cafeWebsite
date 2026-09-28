// Menu Items Data
const menuItems = [
    {
        id: '1',
        name: 'Espresso',
        description: 'Rich and bold single shot',
        price: 85,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop'
    },
    {
        id: '2',
        name: 'Cappuccino',
        description: 'Espresso with steamed milk foam',
        price: 120,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop'
    },
    {
        id: '3',
        name: 'Caramel Macchiato',
        description: 'Vanilla syrup, steamed milk, espresso, caramel drizzle',
        price: 145,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&h=300&fit=crop'
    },
    {
        id: '4',
        name: 'Iced Latte',
        description: 'Smooth espresso over ice with cold milk',
        price: 130,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop'
    },
    {
        id: '5',
        name: 'Mocha Frappuccino',
        description: 'Blended chocolate coffee delight',
        price: 155,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop'
    },
    {
        id: '6',
        name: 'Matcha Latte',
        description: 'Premium Japanese green tea with steamed milk',
        price: 135,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1536013564-fcf8bc6b3824?w=400&h=300&fit=crop'
    },
    {
        id: '7',
        name: 'Croissant',
        description: 'Buttery, flaky French pastry',
        price: 95,
        category: 'food',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop'
    },
    {
        id: '8',
        name: 'Chocolate Muffin',
        description: 'Moist chocolate chip muffin',
        price: 85,
        category: 'food',
        image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop'
    },
    {
        id: '9',
        name: 'Blueberry Cheesecake',
        description: 'Creamy cheesecake with blueberry topping',
        price: 165,
        category: 'food',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop'
    },
    {
        id: '10',
        name: 'Arabica Beans',
        description: 'Premium single-origin coffee beans (250g)',
        price: 350,
        category: 'beans',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop'
    },
    {
        id: '11',
        name: 'Robusta Beans',
        description: 'Strong and full-bodied coffee beans (250g)',
        price: 280,
        category: 'beans',
        image: 'https://images.unsplash.com/photo-1587734195503-904fca47e6e9?w=400&h=300&fit=crop'
    },
    {
        id: '12',
        name: 'Extra Shot',
        description: 'Add an extra espresso shot',
        price: 35,
        category: 'add-ons',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop'
    }
];

// State
let cart = JSON.parse(localStorage.getItem('cupbrew_cart')) || [];
let favorites = JSON.parse(localStorage.getItem('cupbrew_favorites')) || [];
let selectedCategory = 'all';
let selectedOrderType = 'To Go';
const DELIVERY_FEE = 50;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartUI();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    document.getElementById('cartOverlay').addEventListener('click', toggleCart);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            selectedCategory = e.target.dataset.category;
            renderMenu();
        });
    });

    document.querySelectorAll('.order-type-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.order-type-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            selectedOrderType = e.currentTarget.dataset.type;
            updateCartUI();
        });
    });

    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            scrollToSection(section);
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

// Render Menu
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = selectedCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" role="button" tabindex="0" onclick="addToCart('${item.id}')" onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); addToCart('${item.id}'); }">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
                <button class="favorite-btn ${isFavorite(item.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${item.id}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <div class="menu-item-info">
                        <div class="menu-item-title">${item.name}</div>
                        <div class="menu-item-category">${item.category}</div>
                    </div>
                    <div class="menu-item-price">₱${item.price}</div>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${item.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(`${item.name} added to cart!`);
}

// Update Cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const deliveryFeeRow = document.getElementById('deliveryFeeRow');
    const vatEl = document.getElementById('vat');
    const totalEl = document.getElementById('total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Add some items to get started!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-header">
                        <div>
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₱${item.price}</div>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <span class="item-total">₱${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vat = subtotal * 0.12;
    const deliveryFee = selectedOrderType === 'Delivery' && subtotal > 0 ? DELIVERY_FEE : 0;
    const total = subtotal + vat + deliveryFee;

    subtotalEl.textContent = `₱${subtotal.toFixed(2)}`;
    if (deliveryFeeEl && deliveryFeeRow) {
        deliveryFeeEl.textContent = `₱${deliveryFee.toFixed(2)}`;
        deliveryFeeRow.style.display = deliveryFee > 0 ? 'flex' : 'none';
    }
    vatEl.textContent = `₱${vat.toFixed(2)}`;
    totalEl.textContent = `₱${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    saveCart();
    updateCartUI();
}

// Toggle Favorite
function toggleFavorite(itemId) {
    const index = favorites.indexOf(itemId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites');
    } else {
        favorites.push(itemId);
        showToast('Added to favorites!');
    }
    saveFavorites();
    renderMenu();
}

// Check if Favorite
function isFavorite(itemId) {
    return favorites.includes(itemId);
}

// Toggle Cart
function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    overlay.classList.toggle('active');
    sidebar.classList.toggle('active');
}

// Handle Checkout
function handleCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vat = subtotal * 0.12;
    const deliveryFee = selectedOrderType === 'Delivery' ? DELIVERY_FEE : 0;
    const total = subtotal + vat + deliveryFee;
    const orderNumber = `#${Math.floor(1000 + Math.random() * 9000)}`;
    const orderDate = new Date().toLocaleString();

    const orderData = {
        orderNumber,
        orderDate,
        orderType: selectedOrderType,
        items: cart,
        subtotal,
        vat,
        deliveryFee,
        total
    };

    showReceipt(orderData);
    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();
}

// Show Receipt Modal
function showReceipt(orderData) {
    const receiptBody = document.getElementById('receiptBody');

    let itemsHTML = orderData.items.map(item => `
        <div class="receipt-item">
            <div>
                <div class="receipt-item-name">${item.name}</div>
                <div class="receipt-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="receipt-item-details">
                <div class="receipt-item-price">₱${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        </div>
    `).join('');

    const receiptHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
            <h3 style="margin: 0; color: var(--primary);">Fpool Cafe</h3>
            <p style="margin: 0.25rem 0; font-size: 0.875rem; color: var(--text-light);">Order Receipt</p>
        </div>

        <div style="border-bottom: 1px solid var(--border); margin-bottom: 1rem; padding-bottom: 1rem;">
            <div class="receipt-info-row">
                <span>Order Number:</span>
                <strong>${orderData.orderNumber}</strong>
            </div>
            <div class="receipt-info-row">
                <span>Date & Time:</span>
                <strong>${orderData.orderDate}</strong>
            </div>
            <div class="receipt-info-row">
                <span>Order Type:</span>
                <strong>${orderData.orderType}</strong>
            </div>
        </div>

        <div style="margin-bottom: 1rem;">
            <h4 style="margin: 0 0 0.75rem 0; color: var(--primary); font-size: 0.95rem;">Items Ordered</h4>
            ${itemsHTML}
        </div>

        <div class="receipt-summary">
            <div class="receipt-summary-row">
                <span>Subtotal:</span>
                <span>₱${orderData.subtotal.toFixed(2)}</span>
            </div>
            ${orderData.deliveryFee > 0 ? `
            <div class="receipt-summary-row">
                <span>Delivery Fee:</span>
                <span>₱${orderData.deliveryFee.toFixed(2)}</span>
            </div>
            ` : ''}
            <div class="receipt-summary-row">
                <span>VAT (12%):</span>
                <span>₱${orderData.vat.toFixed(2)}</span>
            </div>
            <div class="receipt-summary-row total">
                <span>Total Amount:</span>
                <span>₱${orderData.total.toFixed(2)}</span>
            </div>
        </div>

        <div class="receipt-info">
            <div style="text-align: center; margin-bottom: 0.5rem;">
                <strong>Thank you for your order!</strong>
            </div>
            <p style="margin: 0; font-size: 0.8rem;">Please save this receipt for your records. Your order will be prepared shortly.</p>
        </div>
    `;

    receiptBody.innerHTML = receiptHTML;

    const receiptOverlay = document.getElementById('receiptOverlay');
    const receiptModal = document.getElementById('receiptModal');

    receiptOverlay.classList.add('active');
    receiptModal.classList.add('active');

    document.getElementById('printReceiptBtn').onclick = () => printReceipt(orderData);
    document.getElementById('closeReceiptBtn').onclick = () => closeReceipt();
    document.getElementById('closeReceipt').onclick = () => closeReceipt();
    receiptOverlay.onclick = () => closeReceipt();
}

// Close Receipt Modal
function closeReceipt() {
    document.getElementById('receiptOverlay').classList.remove('active');
    document.getElementById('receiptModal').classList.remove('active');
}

// Print Receipt as PDF — FIXED for jsPDF v2.x
function printReceipt(orderData) {
    try {
        const { jsPDF } = window.jspdf;

        if (!jsPDF) {
            throw new Error('jsPDF not loaded');
        }

        const doc = new jsPDF();

        let y = 15;
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 15;
        const contentWidth = pageWidth - margin * 2;

        // ── Header ──────────────────────────────────────────────
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(111, 78, 55);
        doc.text('Fpool Cafe', pageWidth / 2, y, { align: 'center' });
        y += 8;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 114, 128);
        doc.text('Order Receipt', pageWidth / 2, y, { align: 'center' });
        y += 4;

        // Divider line
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 8;

        // ── Order Info Box ───────────────────────────────────────
        doc.setFillColor(254, 243, 199); // bg-light amber
        doc.roundedRect(margin, y - 3, contentWidth, 26, 2, 2, 'F');

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(31, 41, 55);
        doc.text('Order Number:', margin + 4, y + 4);
        doc.text('Date & Time:', margin + 4, y + 11);
        doc.text('Order Type:', margin + 4, y + 18);

        doc.setFont('helvetica', 'normal');
        doc.text(orderData.orderNumber, margin + 38, y + 4);
        doc.text(orderData.orderDate, margin + 38, y + 11);
        doc.text(orderData.orderType, margin + 38, y + 18);
        y += 32;

        // ── Items Table ──────────────────────────────────────────
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(111, 78, 55);
        doc.text('Items Ordered', margin, y);
        y += 6;

        const tableRows = orderData.items.map(item => [
            item.name,
            String(item.quantity),
            `PHP ${item.price.toFixed(2)}`,
            `PHP ${(item.price * item.quantity).toFixed(2)}`
        ]);

        doc.autoTable({
            startY: y,
            head: [['Item', 'Qty', 'Unit Price', 'Amount']],
            body: tableRows,
            margin: { left: margin, right: margin },
            theme: 'grid',
            headStyles: {
                fillColor: [111, 78, 55],
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 9,
                textColor: [31, 41, 55]
            },
            alternateRowStyles: {
                fillColor: [254, 243, 199]
            },
            columnStyles: {
                1: { halign: 'center' },
                2: { halign: 'right' },
                3: { halign: 'right' }
            }
        });

        y = doc.lastAutoTable.finalY + 8;

        // ── Summary ──────────────────────────────────────────────
        const summaryX = margin + 80;
        const valueX = pageWidth - margin;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 114, 128);

        doc.text('Subtotal:', summaryX, y);
        doc.text(`PHP ${orderData.subtotal.toFixed(2)}`, valueX, y, { align: 'right' });
        y += 6;

        if (orderData.deliveryFee > 0) {
            doc.text('Delivery Fee:', summaryX, y);
            doc.text(`PHP ${orderData.deliveryFee.toFixed(2)}`, valueX, y, { align: 'right' });
            y += 6;
        }

        doc.text('VAT (12%):', summaryX, y);
        doc.text(`PHP ${orderData.vat.toFixed(2)}`, valueX, y, { align: 'right' });
        y += 6;

        // Total divider
        doc.setDrawColor(229, 231, 235);
        doc.line(summaryX, y, pageWidth - margin, y);
        y += 5;

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(111, 78, 55);
        doc.text('TOTAL:', summaryX, y);
        doc.text(`PHP ${orderData.total.toFixed(2)}`, valueX, y, { align: 'right' });
        y += 12;

        // ── Footer ───────────────────────────────────────────────
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 114, 128);
        doc.text('Thank you for your order! Your order will be prepared shortly.', pageWidth / 2, y, { align: 'center' });
        y += 5;
        doc.text('Fpool Cafe  |  FpoolCafe@gmail.com  |  (09)61 607 3063', pageWidth / 2, y, { align: 'center' });

        // Save
        const filename = `FpoolCafe_Receipt_${orderData.orderNumber.replace('#', '')}.pdf`;
        doc.save(filename);
        showToast(`Receipt saved: ${filename}`);

    } catch (err) {
        console.error('PDF generation failed:', err);
        showToast('PDF failed — opening print dialog instead.');
        window.print();
    }
}

// Show Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Save to LocalStorage
function saveCart() {
    localStorage.setItem('cupbrew_cart', JSON.stringify(cart));
}

function saveFavorites() {
    localStorage.setItem('cupbrew_favorites', JSON.stringify(favorites));
}