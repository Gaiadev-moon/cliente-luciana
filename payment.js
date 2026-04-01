(() => {
  const { formatPrice } = window.RobleData;
  const orderRaw = localStorage.getItem("roble-casa-checkout");
  const paymentLayout = document.getElementById("paymentLayout");
  const paymentEmpty = document.getElementById("paymentEmpty");
  const paymentOrder = document.getElementById("paymentOrder");
  const paymentSummary = document.getElementById("paymentSummary");
  const paymentForm = document.getElementById("paymentForm");
  const paymentSuccess = document.getElementById("paymentSuccess");
  const methodButtons = [...document.querySelectorAll(".payment-method")];
  const menuToggle = document.getElementById("menuToggle");
  const navClose = document.getElementById("navClose");
  const mainNav = document.getElementById("mainNav");
  let activeMethod = "visa";

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const nextState = !mainNav.classList.contains("open");
      mainNav.classList.toggle("open", nextState);
      menuToggle.setAttribute("aria-expanded", String(nextState));
    });
  }

  if (navClose && mainNav) {
    navClose.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  }

  document.addEventListener("click", (event) => {
    if (!mainNav || !menuToggle || !mainNav.classList.contains("open")) return;
    if (mainNav.contains(event.target) || menuToggle.contains(event.target)) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !mainNav) return;
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });

  if (!orderRaw) {
    if (paymentEmpty) paymentEmpty.hidden = false;
    return;
  }

  const order = JSON.parse(orderRaw);
  if (paymentLayout) paymentLayout.hidden = false;

  paymentOrder.innerHTML = order.items.map((item) => `
    <article class="payment-order-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${item.quantity} x ${formatPrice(item.price)}</p>
      </div>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </article>
  `).join("");

  paymentSummary.innerHTML = `
    <div><span>Cliente</span><strong>${order.customer.name}</strong></div>
    <div><span>Ciudad</span><strong>${order.customer.city}</strong></div>
    <div><span>Telefono</span><strong>${order.customer.phone}</strong></div>
    <div><span>Pedido</span><strong>${order.code}</strong></div>
    <div><span>Subtotal</span><strong>${formatPrice(order.subtotal)}</strong></div>
    <div><span>Envio</span><strong>${formatPrice(order.shipping)}</strong></div>
    <div class="cart-total"><span>Total</span><strong>${formatPrice(order.total)}</strong></div>
  `;

  methodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      methodButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      activeMethod = button.dataset.method || "visa";
    });
  });

  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const holder = document.getElementById("cardHolder").value.trim();
    const number = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("cardExpiry").value.trim();
    const cvv = document.getElementById("cardCvv").value.trim();

    if (!holder || !number || !expiry || !cvv) return;

    const methodLabel = {
      visa: "Visa",
      mastercard: "Mastercard",
      amex: "American Express",
      pse: "PSE"
    }[activeMethod] || "Tarjeta";

    paymentForm.hidden = true;
    paymentSuccess.hidden = false;
    paymentSuccess.innerHTML = `
      <strong>Pago aprobado</strong>
      <p>El pedido <b>${order.code}</b> quedo confirmado con ${methodLabel}.</p>
      <p>Importe abonado: <b>${formatPrice(order.total)}</b>.</p>
      <p>Te contactaremos para coordinar entrega en ${order.customer.city}.</p>
      <a class="button button-primary" href="index.html">Volver al inicio</a>
    `;

    localStorage.removeItem("roble-casa-cart");
    localStorage.removeItem("roble-casa-checkout");
  });
})();
