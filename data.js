(() => {
  const WHATSAPP_NUMBER = "573001234567";
  const CONTACT_EMAIL = "ventas@aromarte.com";
  const CONTACT_PHONE = "+57 300 123 4567";
  const CONTACT_INSTAGRAM = "https://www.instagram.com/aromarte";
  const CONTACT_PINTEREST = "https://www.pinterest.com/aromarte";
  const CONTACT_FACEBOOK = "https://www.facebook.com/aromarte";
  const PAYMENT_BRANDS = {
    visa: { key: "visa", label: "Visa", short: "V", className: "payment-logo-visa" },
    mastercard: { key: "mastercard", label: "Mastercard", short: "MC", className: "payment-logo-mastercard" },
    amex: { key: "amex", label: "AMEX", short: "AX", className: "payment-logo-amex" },
    mercadopago: { key: "mercadopago", label: "Mercado Pago", short: "MP", className: "payment-logo-mercadopago" },
    naranjax: { key: "naranjax", label: "Naranja X", short: "NX", className: "payment-logo-naranja" },
    sucredito: { key: "sucredito", label: "Sucrédito", short: "SC", className: "payment-logo-sucredito" },
    credicash: { key: "credicash", label: "Credicash", short: "CC", className: "payment-logo-credicash" },
    transferencia: { key: "transferencia", label: "Transferencia", short: "TR", className: "payment-logo-transfer" }
  };
  const products = [
    { id: "difusor-violeta", name: "Difusor Violeta y Flores Blancas", category: "Difusores", material: "Aroma floral", price: 18500, rating: 4.9, badge: "Destacado", featured: true, isNew: true, description: "Un aroma suave y floral que transmite calma, frescura y armonía para espacios serenos.", tags: ["Hasta 45 días", "Floral", "Artesanal"], type: "lamp", image: "assets/images/aromarte/violeta-flores.jpg", imagePosition: "center", palette: ["#e7ddce", "#66754d", "#fff9f1"] },
    { id: "set-calma", name: "Set La Calma", category: "Sets", material: "Difusor y deco", price: 24500, rating: 4.8, badge: "Regalo", featured: true, isNew: false, description: "Una composición delicada para regalar bienestar: difusor, flores secas y detalle decorativo.", tags: ["Regalo", "Decorativo", "Listo para entregar"], type: "lamp", image: "assets/images/aromarte/hero-product.jpg", imagePosition: "center", palette: ["#eadfce", "#6d7651", "#fff8ec"] },
    { id: "vela-aromarte", name: "Vela AromArte", category: "Velas", material: "Cera aromática", price: 12800, rating: 4.7, badge: "Nuevo", featured: false, isNew: true, description: "Vela de presencia suave para acompañar momentos de pausa, lectura o descanso.", tags: ["Hecha a mano", "Calma", "Detalle"], type: "lamp", image: "assets/images/aromarte/detalle-producto.jpg", imagePosition: "center", palette: ["#e8dccb", "#6b7652", "#fff9f2"] },
    { id: "ramo-seco", name: "Ramo Decorativo Natural", category: "Deco", material: "Flores secas", price: 9800, rating: 4.6, badge: "Artesanal", featured: false, isNew: false, description: "Flores secas para sumar textura, calidez y una presencia natural a bandejas o rincones.", tags: ["Natural", "Decorativo", "Liviano"], type: "lamp", image: "assets/images/aromarte/mission.jpg", imagePosition: "center", palette: ["#e9ddcb", "#63704d", "#fff8ef"] },
    { id: "kit-produccion-consciente", name: "Kit Producción Consciente", category: "Sets", material: "Selección responsable", price: 28900, rating: 4.9, badge: "Premium", featured: true, isNew: true, description: "Una selección especial con piezas pensadas para durar, reutilizarse y acompañar el día a día.", tags: ["Consciente", "Premium", "Regalo"], type: "lamp", image: "assets/images/aromarte/produccion-consciente.jpg", imagePosition: "center", palette: ["#e7daca", "#64724f", "#fff8ee"] }
  ];

  const currencyFormatter = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
  const loadCart = () => { try { return JSON.parse(localStorage.getItem("aromarte-cart")) || {}; } catch { return {}; } };
  const saveCart = (cart) => localStorage.setItem("aromarte-cart", JSON.stringify(cart));
  const formatPrice = (price) => currencyFormatter.format(price);
  const roundToThousands = (value) => Math.round(value / 1000) * 1000;
  const buildWhatsappUrl = (product) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(product ? `Hola, quiero información sobre ${product.name} (${formatPrice(product.price)}).` : "Hola, quiero asesoría para elegir un aroma de AromArte.")}`;
  const buildContactMailto = ({ name = "", email = "", phone = "", subject = "Consulta desde la web", message = "" } = {}) => {
    const lines = [
      `Nombre: ${name || "-"}`,
      `Correo: ${email || "-"}`,
      `Teléfono: ${phone || "-"}`,
      "",
      message || "Hola, quiero recibir asesoramiento sobre aromas, presentaciones y disponibilidad."
    ];

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  function createProductImage(product) {
    if (product.image) return product.image;
    const [base, accent, soft] = product.palette;
    const common = `<rect width="800" height="560" rx="32" fill="${soft}"/><rect x="26" y="26" width="748" height="508" rx="26" fill="${base}" opacity="0.18"/><circle cx="650" cy="110" r="84" fill="${accent}" opacity="0.10"/><text x="60" y="84" font-family="Arial, sans-serif" font-size="28" fill="${accent}" opacity="0.85">${product.name}</text>`;
    const illustrations = {
      sofa: `<rect x="175" y="240" width="450" height="130" rx="34" fill="${accent}"/><rect x="220" y="190" width="160" height="86" rx="24" fill="${accent}" opacity="0.82"/><rect x="420" y="190" width="160" height="86" rx="24" fill="${accent}" opacity="0.82"/><rect x="160" y="220" width="54" height="120" rx="20" fill="${accent}"/><rect x="586" y="220" width="54" height="120" rx="20" fill="${accent}"/><rect x="210" y="365" width="24" height="72" rx="12" fill="#5d4334"/><rect x="566" y="365" width="24" height="72" rx="12" fill="#5d4334"/>`,
      table: `<ellipse cx="400" cy="220" rx="210" ry="78" fill="${accent}"/><rect x="360" y="230" width="80" height="148" rx="18" fill="#6d4c3a"/><rect x="248" y="364" width="300" height="22" rx="11" fill="#5d4334"/><rect x="226" y="370" width="32" height="70" rx="14" fill="#5d4334"/><rect x="542" y="370" width="32" height="70" rx="14" fill="#5d4334"/>`,
      chair: `<rect x="300" y="140" width="200" height="180" rx="76" fill="${accent}" opacity="0.92"/><rect x="260" y="278" width="280" height="70" rx="28" fill="${accent}"/><rect x="292" y="340" width="24" height="110" rx="12" fill="#5d4334"/><rect x="484" y="340" width="24" height="110" rx="12" fill="#5d4334"/><rect x="330" y="340" width="24" height="110" rx="12" fill="#5d4334"/><rect x="446" y="340" width="24" height="110" rx="12" fill="#5d4334"/>`,
      bed: `<rect x="180" y="170" width="110" height="220" rx="24" fill="#6f4e3c"/><rect x="280" y="210" width="350" height="160" rx="28" fill="${accent}"/><rect x="302" y="190" width="130" height="72" rx="22" fill="${soft}"/><rect x="446" y="190" width="130" height="72" rx="22" fill="${soft}"/><rect x="290" y="370" width="20" height="64" rx="10" fill="#5d4334"/><rect x="590" y="370" width="20" height="64" rx="10" fill="#5d4334"/>`,
      shelf: `<rect x="210" y="120" width="28" height="320" rx="14" fill="#5d4334"/><rect x="562" y="120" width="28" height="320" rx="14" fill="#5d4334"/><rect x="220" y="150" width="360" height="18" rx="9" fill="${accent}"/><rect x="220" y="240" width="360" height="18" rx="9" fill="${accent}"/><rect x="220" y="330" width="360" height="18" rx="9" fill="${accent}"/><rect x="248" y="180" width="56" height="52" rx="12" fill="${soft}"/><rect x="334" y="180" width="70" height="52" rx="12" fill="${soft}"/><rect x="438" y="180" width="96" height="52" rx="12" fill="${soft}"/><rect x="258" y="270" width="86" height="52" rx="12" fill="${soft}"/><rect x="368" y="270" width="136" height="52" rx="12" fill="${soft}"/>`,
      desk: `<rect x="178" y="220" width="444" height="48" rx="18" fill="${accent}"/><rect x="214" y="266" width="44" height="162" rx="18" fill="#5d4334"/><rect x="542" y="266" width="44" height="162" rx="18" fill="#5d4334"/><rect x="332" y="268" width="134" height="104" rx="18" fill="${soft}"/><rect x="350" y="286" width="98" height="12" rx="6" fill="${accent}" opacity="0.55"/>`,
      lamp: `<rect x="386" y="144" width="28" height="234" rx="14" fill="#6d4c3a"/><path d="M290 188 Q400 98 510 188 L470 282 H330 Z" fill="${accent}"/><ellipse cx="400" cy="420" rx="118" ry="24" fill="#6d4c3a"/><circle cx="400" cy="240" r="14" fill="${soft}"/>`
    };
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560">${common}${illustrations[product.type] || illustrations.chair}</svg>`)}`;
  }

  function getProductFinancing(product) {
    const plansByCategory = {
      Sala: { installments: 12, leadMethod: "naranjax", methods: ["visa", "mastercard", "naranjax", "mercadopago"] },
      Comedor: { installments: 9, leadMethod: "mercadopago", methods: ["visa", "mastercard", "mercadopago", "transferencia"] },
      Dormitorio: { installments: 12, leadMethod: "sucredito", methods: ["visa", "amex", "naranjax", "sucredito"] },
      Estudio: { installments: 6, leadMethod: "credicash", methods: ["visa", "mastercard", "mercadopago", "credicash"] },
      Decoracion: { installments: 6, leadMethod: "mercadopago", methods: ["visa", "mastercard", "mercadopago", "transferencia"] }
    };

    const fallback = { installments: 6, leadMethod: "visa", methods: ["visa", "mastercard", "mercadopago", "transferencia"] };
    const config = plansByCategory[product.category] || fallback;
    const effectiveInstallments = product.price >= 2800000 ? Math.max(config.installments, 12) : config.installments;
    const installmentAmount = roundToThousands(product.price / effectiveInstallments);
    const leadMethod = config.leadMethod;
    const promoCopyByMethod = {
      naranjax: `Promo ${effectiveInstallments} cuotas con Naranja X`,
      mercadopago: `${effectiveInstallments} cuotas con Mercado Pago`,
      sucredito: `${effectiveInstallments} cuotas con Sucrédito`,
      credicash: `${effectiveInstallments} cuotas con Credicash`,
      transferencia: "Precio especial por transferencia",
      visa: `${effectiveInstallments} cuotas con Visa`
    };

    return {
      promoHeadline: promoCopyByMethod[leadMethod] || `${effectiveInstallments} cuotas disponibles`,
      installmentsText: `${effectiveInstallments} cuotas de ${formatPrice(installmentAmount)}`,
      cashText: "Precio publicado al contado",
      methods: config.methods.map((key) => PAYMENT_BRANDS[key]).filter(Boolean)
    };
  }

  window.RobleData = {
    WHATSAPP_NUMBER,
    CONTACT_EMAIL,
    CONTACT_PHONE,
    CONTACT_INSTAGRAM,
    CONTACT_PINTEREST,
    CONTACT_FACEBOOK,
    PAYMENT_BRANDS,
    products,
    loadCart,
    saveCart,
    formatPrice,
    getProductFinancing,
    buildWhatsappUrl,
    buildContactMailto,
    createProductImage
  };
})();
