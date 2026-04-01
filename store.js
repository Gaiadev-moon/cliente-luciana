(() => {
  const { products, loadCart, saveCart, formatPrice, buildWhatsappUrl, createProductImage } = window.RobleData;
  const state = { cart: loadCart(), activeProductId: null, checkoutOpen: false, orderComplete: false };

  const cartButton = document.getElementById("cartButton");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navClose = document.getElementById("navClose");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCart = document.getElementById("closeCart");
  const overlay = document.getElementById("overlay");
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartShipping = document.getElementById("cartShipping");
  const cartTotal = document.getElementById("cartTotal");
  const cartSummary = cartDrawer ? cartDrawer.querySelector(".cart-summary") : null;
  const checkoutPanel = document.getElementById("checkoutPanel");
  const checkoutButton = document.getElementById("checkoutButton");
  const backToCart = document.getElementById("backToCart");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutReview = document.getElementById("checkoutReview");
  const checkoutSuccess = document.getElementById("checkoutSuccess");

  const productModal = document.getElementById("productModal");
  const closeModal = document.getElementById("closeModal");
  const modalImage = document.getElementById("modalImage");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");
  const modalPrice = document.getElementById("modalPrice");
  const modalInstallments = document.getElementById("modalInstallments");
  const modalRating = document.getElementById("modalRating");
  const modalAddToCart = document.getElementById("modalAddToCart");
  const modalWhatsapp = document.getElementById("modalWhatsapp");
  const toast = document.getElementById("toast");
  let toastTimeout = null;

  document.querySelectorAll("[data-whatsapp-link]").forEach((element) => {
    element.href = buildWhatsappUrl();
  });
  ["bannerWhatsapp"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.href = buildWhatsappUrl();
  });

  if (cartButton) cartButton.addEventListener("click", openCart);
  if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
  if (navClose) navClose.addEventListener("click", closeMenu);
  if (closeCart) closeCart.addEventListener("click", closePanels);
  if (closeModal) closeModal.addEventListener("click", closePanels);
  if (overlay) overlay.addEventListener("click", closePanels);
  if (mainNav) {
    mainNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => closePanels());
    });
  }
  if (modalAddToCart) {
    modalAddToCart.addEventListener("click", () => {
      if (!state.activeProductId) return;
      addToCart(state.activeProductId);
      showToast("Producto agregado al carrito.");
      closePanels();
    });
  }
  if (checkoutButton) checkoutButton.addEventListener("click", startCheckout);
  if (backToCart) backToCart.addEventListener("click", () => setCheckoutView(false));
  if (checkoutForm) checkoutForm.addEventListener("submit", submitCheckout);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePanels();
  });
  document.addEventListener("click", (event) => {
    if (!mainNav || !menuToggle || !mainNav.classList.contains("open")) return;
    if (mainNav.contains(event.target) || menuToggle.contains(event.target)) return;
    closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) closeMenu();
  });

  renderCart();

  function addToCart(productId) {
    state.orderComplete = false;
    state.cart[productId] = (state.cart[productId] || 0) + 1;
    renderCart();
  }

  function getCartDetails() {
    const items = Object.entries(state.cart)
      .map(([productId, quantity]) => {
        const product = products.find((item) => item.id === productId);
        return product ? { product, quantity } : null;
      })
      .filter(Boolean);

    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 70000 : 0;
    const quantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return { items, subtotal, shipping, total: subtotal + shipping, quantity };
  }

  function renderCart() {
    if (!cartItems) return;
    const details = getCartDetails();

    cartItems.innerHTML = details.items.length
      ? ""
      : `<article class="empty-state"><h3>Tu carrito esta vacio</h3><p>Agrega productos para comenzar tu compra.</p></article>`;

    details.items.forEach(({ product, quantity }) => {
      const item = document.createElement("article");
      item.className = "cart-item";
      item.innerHTML = `<img src="${createProductImage(product)}" alt="${product.name}"><div><h3>${product.name}</h3><p>${formatPrice(product.price)} c/u</p><div class="cart-actions"><button type="button" data-action="decrement">-</button><strong>${quantity}</strong><button type="button" data-action="increment">+</button></div></div><strong>${formatPrice(product.price * quantity)}</strong>`;
      item.querySelector('[data-action="decrement"]').addEventListener("click", () => updateQuantity(product.id, -1));
      item.querySelector('[data-action="increment"]').addEventListener("click", () => updateQuantity(product.id, 1));
      cartItems.appendChild(item);
    });

    if (cartCount) cartCount.textContent = String(details.quantity);
    if (cartSubtotal) cartSubtotal.textContent = formatPrice(details.subtotal);
    if (cartShipping) cartShipping.textContent = formatPrice(details.shipping);
    if (cartTotal) cartTotal.textContent = formatPrice(details.total);
    if (checkoutReview) {
      checkoutReview.innerHTML = details.quantity
        ? `<strong>Resumen del pedido</strong><span>${details.quantity} producto(s)</span><span>Subtotal: ${formatPrice(details.subtotal)}</span><span>Envio: ${formatPrice(details.shipping)}</span><span>Total: ${formatPrice(details.total)}</span><span>Factura y entrega por correo luego del pago.</span>`
        : `<strong>Resumen del pedido</strong><span>Agrega productos antes de continuar.</span>`;
    }

    if (!details.quantity && !state.orderComplete) {
      setCheckoutView(false);
      if (checkoutSuccess) checkoutSuccess.hidden = true;
    }

    saveCart(state.cart);
  }

  function updateQuantity(productId, delta) {
    state.orderComplete = false;
    const nextQuantity = (state.cart[productId] || 0) + delta;
    if (nextQuantity <= 0) delete state.cart[productId];
    else state.cart[productId] = nextQuantity;
    renderCart();
  }

  function openCart() {
    closeMenu();
    closeModalPanel();
    if (!cartDrawer) return;
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    if (overlay) overlay.hidden = false;
  }

  function openProductModal(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product || !productModal) return;

    state.activeProductId = productId;
    modalImage.src = createProductImage(product);
    modalImage.alt = product.name;
    modalImage.style.objectPosition = product.imagePosition || "center";
    modalCategory.textContent = product.category;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = formatPrice(product.price);
    modalInstallments.textContent = `Hasta 6 cuotas de ${formatPrice(Math.round(product.price / 6))}`;
    modalRating.textContent = `\u2605 ${product.rating.toFixed(1)}`;
    modalTags.innerHTML = "";
    product.tags.forEach((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      modalTags.appendChild(element);
    });
    modalWhatsapp.href = buildWhatsappUrl(product);

    closeCartPanel();
    productModal.classList.add("open");
    productModal.setAttribute("aria-hidden", "false");
    if (overlay) overlay.hidden = false;
  }

  function closePanels() {
    closeCartPanel();
    closeModalPanel();
    closeMenu();
    if (overlay) overlay.hidden = true;
  }

  function toggleMenu() {
    if (!mainNav) return;
    if (mainNav.classList.contains("open")) {
      closeMenu();
      return;
    }
    closeCartPanel();
    closeModalPanel();
    mainNav.classList.add("open");
    menuToggle?.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!mainNav) return;
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }

  function closeCartPanel() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  }

  function closeModalPanel() {
    if (!productModal) return;
    productModal.classList.remove("open");
    productModal.setAttribute("aria-hidden", "true");
    state.activeProductId = null;
  }

  function setCheckoutView(isOpen) {
    state.checkoutOpen = isOpen;
    if (cartItems) cartItems.hidden = isOpen;
    if (cartSummary) cartSummary.hidden = isOpen;
    if (checkoutPanel) checkoutPanel.hidden = !isOpen;
  }

  function startCheckout() {
    const details = getCartDetails();
    if (!details.quantity) {
      showToast("Agrega al menos un producto antes de continuar.");
      return;
    }
    state.orderComplete = false;
    if (checkoutSuccess) checkoutSuccess.hidden = true;
    if (checkoutForm) checkoutForm.hidden = false;
    setCheckoutView(true);
  }

  function submitCheckout(event) {
    event.preventDefault();
    const details = getCartDetails();
    if (!details.quantity) {
      showToast("Agrega productos antes de confirmar el pedido.");
      setCheckoutView(false);
      return;
    }

    const formData = new FormData(checkoutForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const payment = String(formData.get("payment") || "").trim();
    const notes = String(formData.get("notes") || "").trim();

    if (!name || !phone || !email || !city || !address || !payment) {
      showToast("Completa nombre, telefono, correo, direccion, ciudad y forma de pago.");
      return;
    }

    const orderCode = `RC-${Date.now().toString().slice(-6)}`;
    const paymentLabels = {
      transferencia: "Transferencia bancaria",
      tarjeta: "Tarjeta",
      contraentrega: "Contraentrega coordinada"
    };
    const order = {
      code: orderCode,
      invoice: {
        number: `FC-${new Date().getFullYear()}-${orderCode.slice(-4)}`,
        issuedAt: new Date().toLocaleString("es-CO")
      },
      customer: { name, phone, email, city, address, payment: paymentLabels[payment] || payment, notes },
      items: details.items.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: createProductImage(product),
        imagePosition: product.imagePosition || "center"
      })),
      subtotal: details.subtotal,
      shipping: details.shipping,
      total: details.total,
      createdAt: Date.now()
    };

    localStorage.setItem("roble-casa-checkout", JSON.stringify(order));
    window.location.href = "pago.html";
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("visible"), 2200);
  }

  window.RobleStore = { products, state, formatPrice, createProductImage, addToCart, openCart, openProductModal, showToast, renderCart };
})();
