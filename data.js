(() => {
  const WHATSAPP_NUMBER = "573001234567";
  const CONTACT_EMAIL = "ventas@roblecasa.com";
  const CONTACT_PHONE = "+57 300 123 4567";
  const CONTACT_INSTAGRAM = "https://www.instagram.com/roblecasa";
  const CONTACT_PINTEREST = "https://www.pinterest.com/roblecasa";
  const CONTACT_FACEBOOK = "https://www.facebook.com/roblecasa";
  const products = [
    { id: "sofa-aurora", name: "Sofa Aurora", category: "Sala", material: "Lino", price: 2890000, rating: 4.9, badge: "Top ventas", featured: true, isNew: false, description: "Sofa de tres puestos con apoyo lumbar suave y presencia calida para salas contemporaneas.", tags: ["3 puestos", "Beige calido", "Entrega rapida"], type: "sofa", image: "assets/images/catalog/catalog-01.jpg", palette: ["#dbc3af", "#8d6954", "#f8eee5"] },
    { id: "sofa-alba", name: "Sofa Alba", category: "Sala", material: "Chenille", price: 3090000, rating: 4.9, badge: "Premium", featured: true, isNew: true, description: "Sofa de volumen generoso con textura suave y presencia sobria.", tags: ["4 puestos", "Chenille", "Premium"], type: "sofa", image: "assets/images/catalog/catalog-02.jpg", imagePosition: "center 62%", palette: ["#dbc3af", "#8d6954", "#f8eee5"] },
    { id: "butaca-duna", name: "Butaca Duna", category: "Sala", material: "Boucle", price: 1180000, rating: 4.8, badge: "Favorito", featured: false, isNew: false, description: "Butaca acento con respaldo envolvente, perfecta para recibidores o rincones de lectura.", tags: ["Boucle", "Acento", "Compacta"], type: "chair", image: "assets/images/catalog/catalog-06.jpg", palette: ["#e9d6c8", "#8b644d", "#fff9f3"] },
    { id: "mesa-centro-origen", name: "Mesa de Centro Origen", category: "Sala", material: "Nogal", price: 890000, rating: 4.7, badge: "Top ventas", featured: false, isNew: false, description: "Mesa de centro de formato ovalado para complementar sofas de tonos claros.", tags: ["Ovalada", "Nogal", "Sala"], type: "table", image: "assets/images/catalog/catalog-09.jpg", palette: ["#e3cfbe", "#7a563f", "#fbf5ef"] },
    { id: "mesa-auxiliar-senda", name: "Mesa Auxiliar Senda", category: "Sala", material: "Madera", price: 520000, rating: 4.5, badge: "Accesorio", featured: false, isNew: true, description: "Mesa auxiliar ligera para apoyo junto a sofas o butacas.", tags: ["Auxiliar", "Ligera", "Versatil"], type: "table", image: "assets/images/catalog/catalog-10.jpg", palette: ["#e3cfbe", "#7a563f", "#fbf5ef"] },

    { id: "mesa-nogal", name: "Mesa Nogal Atelier", category: "Comedor", material: "Nogal", price: 1980000, rating: 4.8, badge: "Nuevo", featured: true, isNew: true, description: "Mesa para seis puestos con veta protagonista y proporcion elegante para reuniones memorables.", tags: ["6 puestos", "Madera natural", "Acabado mate"], type: "table", image: "assets/images/catalog/catalog-11.jpg", palette: ["#e3cfbe", "#7a563f", "#fbf5ef"] },
    { id: "mesa-encina", name: "Mesa Encina", category: "Comedor", material: "Roble", price: 2140000, rating: 4.9, badge: "Premium", featured: true, isNew: false, description: "Mesa rectangular con estructura firme y tono claro para comedores sobrios.", tags: ["6 puestos", "Roble", "Rectangular"], type: "table", image: "assets/images/catalog/catalog-12.jpg", palette: ["#e3cfbe", "#7a563f", "#fbf5ef"] },
    { id: "silla-cedro", name: "Silla Cedro Loop", category: "Comedor", material: "Madera", price: 620000, rating: 4.7, badge: "Oferta", featured: false, isNew: false, description: "Silla ergonomica de respaldo curvo, ideal para conjuntos de comedor o mesas auxiliares.", tags: ["Ergonomica", "Pack combinable", "Ligera"], type: "chair", image: "assets/images/catalog/catalog-15.jpg", palette: ["#eddccb", "#8b654e", "#fff8f0"] },
    { id: "silla-cala", name: "Silla Cala", category: "Comedor", material: "Madera", price: 680000, rating: 4.8, badge: "Favorito", featured: false, isNew: true, description: "Silla de comedor con asiento curvo y apoyo comodo para jornadas largas.", tags: ["Curva", "Comedor", "Madera"], type: "chair", image: "assets/images/catalog/catalog-16.jpg", palette: ["#eddccb", "#8b654e", "#fff8f0"] },
    { id: "aparador-luna", name: "Aparador Luna", category: "Comedor", material: "MDF", price: 1590000, rating: 4.7, badge: "Recomendado", featured: false, isNew: false, description: "Aparador bajo para guardar vajilla y vestir el comedor.", tags: ["Guardado", "Comedor", "Bajo"], type: "shelf", image: "assets/images/catalog/catalog-19.jpg", palette: ["#e4d0c0", "#775643", "#fff9f4"] },

    { id: "cama-bruma", name: "Cama Bruma Queen", category: "Dormitorio", material: "Roble", price: 3150000, rating: 4.9, badge: "Premium", featured: true, isNew: true, description: "Base queen con cabecero tapizado y estructura de roble para una escena de descanso elegante.", tags: ["Queen", "Cabecero alto", "Montaje incluido"], type: "bed", image: "assets/images/catalog/catalog-21.jpg", palette: ["#d7c0ac", "#88624d", "#fbf3eb"] },
    { id: "cama-aura", name: "Cama Aura", category: "Dormitorio", material: "Madera", price: 2680000, rating: 4.8, badge: "Top ventas", featured: true, isNew: false, description: "Cama de lineas rectas y tono natural para dormitorios serenos.", tags: ["Queen", "Natural", "Sobria"], type: "bed", image: "assets/images/catalog/catalog-22.jpg", palette: ["#d7c0ac", "#88624d", "#fbf3eb"] },
    { id: "mesa-noche-arce", name: "Mesa de Noche Arce", category: "Dormitorio", material: "MDF", price: 540000, rating: 4.6, badge: "Accesorio", featured: false, isNew: false, description: "Mesa de noche compacta con cajon y cubierta resistente.", tags: ["1 cajon", "Compacta", "Dormitorio"], type: "desk", image: "assets/images/catalog/catalog-25.jpg", palette: ["#e8d8ca", "#805d46", "#fff9f5"] },
    { id: "tocador-seda", name: "Tocador Seda", category: "Dormitorio", material: "MDF", price: 1290000, rating: 4.5, badge: "Recomendado", featured: false, isNew: true, description: "Tocador compacto con espejo y superficie de apoyo generosa.", tags: ["Espejo", "Tocador", "Compacto"], type: "desk", image: "assets/images/catalog/catalog-27.jpg", palette: ["#e8d8ca", "#805d46", "#fff9f5"] },
    { id: "comoda-valle", name: "Comoda Valle", category: "Dormitorio", material: "Melamina", price: 1420000, rating: 4.7, badge: "Funcional", featured: false, isNew: false, description: "Comoda de seis cajones para orden diario en dormitorios medios.", tags: ["6 cajones", "Orden", "Dormitorio"], type: "shelf", image: "assets/images/catalog/catalog-28.jpg", palette: ["#e4d0c0", "#775643", "#fff9f4"] },

    { id: "biblioteca-siena", name: "Biblioteca Siena", category: "Estudio", material: "Melamina", price: 1340000, rating: 4.6, badge: "Funcional", featured: false, isNew: false, description: "Biblioteca modular de cinco niveles para exhibir libros, piezas decorativas y archivo liviano.", tags: ["5 niveles", "Almacenamiento", "Facil armado"], type: "shelf", image: "assets/images/catalog/catalog-31.jpg", palette: ["#e4d0c0", "#775643", "#fff9f4"] },
    { id: "biblioteca-olmo", name: "Biblioteca Olmo", category: "Estudio", material: "Melamina", price: 1480000, rating: 4.7, badge: "Top ventas", featured: false, isNew: true, description: "Biblioteca alta con divisiones amplias para libros y objetos decorativos.", tags: ["Alta", "Divisiones", "Estudio"], type: "shelf", image: "assets/images/catalog/catalog-32.jpg", palette: ["#e4d0c0", "#775643", "#fff9f4"] },
    { id: "escritorio-sand", name: "Escritorio Sand Work", category: "Estudio", material: "MDF", price: 1490000, rating: 4.8, badge: "Recomendado", featured: false, isNew: true, description: "Escritorio amplio con cajon oculto y lineas limpias para home office o estudio personal.", tags: ["120 cm", "Minimal", "Organizador"], type: "desk", image: "assets/images/catalog/catalog-35.jpg", palette: ["#e8d8ca", "#805d46", "#fff9f5"] },
    { id: "escritorio-roble", name: "Escritorio Roble", category: "Estudio", material: "Roble", price: 1710000, rating: 4.8, badge: "Top ventas", featured: false, isNew: false, description: "Escritorio recto con buena profundidad y estructura firme.", tags: ["140 cm", "Roble", "Home office"], type: "desk", image: "assets/images/catalog/catalog-36.jpg", palette: ["#e8d8ca", "#805d46", "#fff9f5"] },
    { id: "silla-estudio-petra", name: "Silla Petra", category: "Estudio", material: "Madera", price: 690000, rating: 4.4, badge: "Accesorio", featured: false, isNew: false, description: "Silla de apoyo para escritorio con respaldo limpio y facil mantenimiento.", tags: ["Respaldo alto", "Madera", "Estudio"], type: "chair", image: "assets/images/catalog/catalog-39.jpg", palette: ["#eddccb", "#8b654e", "#fff8f0"] },

    { id: "lampara-ambar", name: "Lampara Ambar", category: "Decoracion", material: "Metal", price: 540000, rating: 4.5, badge: "Accesorio", featured: false, isNew: true, description: "Lampara de piso con pantalla textil para sumar luz calida y contraste suave al ambiente.", tags: ["Luz calida", "Base metalica", "Decorativa"], type: "lamp", image: "assets/images/catalog/catalog-41.jpg", palette: ["#f0decd", "#87624e", "#fffaf4"] },
    { id: "espejo-arco", name: "Espejo Arco", category: "Decoracion", material: "Metal", price: 780000, rating: 4.7, badge: "Favorito", featured: false, isNew: false, description: "Espejo vertical de silueta curva para sumar amplitud visual.", tags: ["Vertical", "Curvo", "Decoracion"], type: "lamp", image: "assets/images/catalog/catalog-44.jpg", palette: ["#f0decd", "#87624e", "#fffaf4"] },
    { id: "espejo-loma", name: "Espejo Loma", category: "Decoracion", material: "Madera", price: 690000, rating: 4.6, badge: "Nuevo", featured: false, isNew: true, description: "Espejo con marco calido para dormitorios y recibidores.", tags: ["Marco madera", "Recibidor", "Calido"], type: "lamp", image: "assets/images/catalog/catalog-45.jpg", palette: ["#f0decd", "#87624e", "#fffaf4"] },
    { id: "alfombra-siena", name: "Alfombra Siena", category: "Decoracion", material: "Textil", price: 1120000, rating: 4.8, badge: "Top ventas", featured: false, isNew: false, description: "Alfombra en tono neutro para integrar sala o dormitorio.", tags: ["Textil", "Neutra", "Sala"], type: "lamp", image: "assets/images/catalog/catalog-46.jpg", palette: ["#f0decd", "#87624e", "#fffaf4"] },
    { id: "consola-alba", name: "Consola Alba", category: "Decoracion", material: "Madera", price: 1240000, rating: 4.7, badge: "Premium", featured: false, isNew: true, description: "Consola angosta para recibidores y paredes de apoyo.", tags: ["Recibidor", "Consola", "Angosta"], type: "table", image: "assets/images/catalog/catalog-50.jpg", palette: ["#e3cfbe", "#7a563f", "#fbf5ef"] }
  ];

  const currencyFormatter = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
  const loadCart = () => { try { return JSON.parse(localStorage.getItem("roble-casa-cart")) || {}; } catch { return {}; } };
  const saveCart = (cart) => localStorage.setItem("roble-casa-cart", JSON.stringify(cart));
  const formatPrice = (price) => currencyFormatter.format(price);
  const buildWhatsappUrl = (product) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(product ? `Hola, quiero informacion sobre ${product.name} (${formatPrice(product.price)}).` : "Hola, quiero asesoria para elegir muebles de Roble Casa.")}`;
  const buildContactMailto = ({ name = "", email = "", phone = "", subject = "Consulta desde la web", message = "" } = {}) => {
    const lines = [
      `Nombre: ${name || "-"}`,
      `Correo: ${email || "-"}`,
      `Telefono: ${phone || "-"}`,
      "",
      message || "Hola, quiero recibir asesoramiento sobre muebles y entrega."
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

  window.RobleData = {
    WHATSAPP_NUMBER,
    CONTACT_EMAIL,
    CONTACT_PHONE,
    CONTACT_INSTAGRAM,
    CONTACT_PINTEREST,
    CONTACT_FACEBOOK,
    products,
    loadCart,
    saveCart,
    formatPrice,
    buildWhatsappUrl,
    buildContactMailto,
    createProductImage
  };
})();
