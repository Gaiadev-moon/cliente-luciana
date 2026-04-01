(() => {
  const { formatPrice } = window.RobleData;
  const orderRaw = localStorage.getItem("roble-casa-checkout");
  const paymentLayout = document.getElementById("paymentLayout");
  const paymentEmpty = document.getElementById("paymentEmpty");
  const paymentOrder = document.getElementById("paymentOrder");
  const paymentSummary = document.getElementById("paymentSummary");
  const invoiceCard = document.getElementById("invoiceCard");
  const paymentForm = document.getElementById("paymentForm");
  const paymentProcessing = document.getElementById("paymentProcessing");
  const paymentSuccess = document.getElementById("paymentSuccess");
  const paymentStatus = document.getElementById("paymentStatus");
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
  order.invoice = order.invoice || {
    number: `FC-${new Date().getFullYear()}-${String(order.code || "0000").slice(-4)}`,
    issuedAt: new Date(order.createdAt || Date.now()).toLocaleString("es-CO")
  };
  order.customer = {
    email: "cliente@correo.com",
    address: "Direccion a confirmar",
    ...order.customer
  };
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
    <div><span>Correo</span><strong>${order.customer.email}</strong></div>
    <div><span>Ciudad</span><strong>${order.customer.city}</strong></div>
    <div><span>Direccion</span><strong>${order.customer.address}</strong></div>
    <div><span>Telefono</span><strong>${order.customer.phone}</strong></div>
    <div><span>Pedido</span><strong>${order.code}</strong></div>
    <div><span>Subtotal</span><strong>${formatPrice(order.subtotal)}</strong></div>
    <div><span>Envio</span><strong>${formatPrice(order.shipping)}</strong></div>
    <div class="cart-total"><span>Total</span><strong>${formatPrice(order.total)}</strong></div>
  `;

  if (invoiceCard) {
    invoiceCard.innerHTML = `
      <span class="eyebrow">Factura</span>
      <h3>${order.invoice.number}</h3>
      <p>Emitida el ${order.invoice.issuedAt}. La confirmacion de pago y los datos de entrega se enviaran a <strong>${order.customer.email}</strong>.</p>
      <div class="invoice-meta">
        <span>Pago: ${order.customer.payment}</span>
        <span>Destino: ${order.customer.city}</span>
      </div>
    `;
  }

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
    const billingDocument = document.getElementById("billingDocument").value.trim();
    const billingName = document.getElementById("billingName").value.trim();
    const expiry = document.getElementById("cardExpiry").value.trim();
    const cvv = document.getElementById("cardCvv").value.trim();

    if (!holder || !number || !billingDocument || !billingName || !expiry || !cvv) return;

    const methodLabel = {
      visa: "Visa",
      mastercard: "Mastercard",
      amex: "American Express",
      pse: "PSE"
    }[activeMethod] || "Tarjeta";

    paymentForm.hidden = true;
    if (paymentProcessing) paymentProcessing.hidden = false;
    if (paymentStatus) {
      paymentStatus.classList.add("is-processing");
      paymentStatus.querySelector("strong").textContent = "Procesando pago";
      paymentStatus.querySelector("p").textContent = "Estamos validando el cobro y preparando la factura de compra.";
    }

    const steps = paymentProcessing ? [...paymentProcessing.querySelectorAll(".processing-steps span")] : [];
    steps.forEach((step, index) => {
      setTimeout(() => {
        steps.forEach((item, currentIndex) => {
          item.classList.toggle("is-active", currentIndex <= index);
        });
      }, index * 850);
    });

    window.setTimeout(() => {
      if (paymentProcessing) paymentProcessing.hidden = true;
      if (paymentStatus) {
        paymentStatus.classList.remove("is-processing");
        paymentStatus.classList.add("is-success");
        paymentStatus.querySelector("strong").textContent = "Pago acreditado";
        paymentStatus.querySelector("p").textContent = "Factura emitida y datos de entrega enviados al correo del cliente.";
      }

      paymentSuccess.hidden = false;
      paymentSuccess.classList.add("payment-success-card");
      paymentSuccess.innerHTML = `
        <div class="payment-success-badge">Pago realizado</div>
        <strong>Operacion aprobada</strong>
        <p>El pedido <b>${order.code}</b> quedo confirmado con ${methodLabel} por <b>${formatPrice(order.total)}</b>.</p>
        <p>La factura fue emitida a nombre de <b>${billingName}</b> (${billingDocument}).</p>
        <p>Enviamos al correo <b>${order.customer.email}</b> la confirmacion de compra y los datos de entrega para <b>${order.customer.address}, ${order.customer.city}</b>.</p>
        <div class="delivery-mail-card">
          <span class="eyebrow">Correo enviado</span>
          <h3>Entrega confirmada</h3>
          <p>Recibiras fecha tentativa, telefono de contacto y referencia del pedido en tu bandeja de entrada.</p>
        </div>
        <a class="button button-primary" href="index.html">Volver al inicio</a>
      `;

      localStorage.removeItem("roble-casa-cart");
      localStorage.removeItem("roble-casa-checkout");
    }, 2800);
  });
})();
