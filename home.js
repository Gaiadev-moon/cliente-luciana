(() => {
  const { products, formatPrice } = window.RobleData;
  const { createProductImage, addToCart, openCart, openProductModal, showToast } = window.RobleStore;

  const categoryGrid = document.getElementById("categoryGrid");
  const bestSellerGrid = document.getElementById("bestSellerGrid");
  const newArrivalGrid = document.getElementById("newArrivalGrid");
  const productCardTemplate = document.getElementById("productCardTemplate");
  const featuredCardTemplate = document.getElementById("featuredCardTemplate");
  const categoryCardTemplate = document.getElementById("categoryCardTemplate");

  const categoryContent = {
    Sala: {
      label: "Sala",
      title: "Sofas y butacas",
      copy: "Piezas comodas y faciles de combinar para zonas sociales.",
      href: "tienda.html?categoria=Sala"
    },
    Comedor: {
      label: "Comedor",
      title: "Mesas y sillas",
      copy: "Propuestas sobrias para reuniones diarias y espacios compartidos.",
      href: "tienda.html?categoria=Comedor"
    },
    Dormitorio: {
      label: "Dormitorio",
      title: "Camas y descanso",
      copy: "Estructuras calidas y proporciones limpias para un ambiente sereno.",
      href: "tienda.html?categoria=Dormitorio"
    },
    Estudio: {
      label: "Estudio",
      title: "Escritorios y guardado",
      copy: "Muebles funcionales para trabajar o estudiar sin romper la estetica.",
      href: "tienda.html?categoria=Estudio"
    }
  };

  renderCategories();
  renderBestSellers();
  renderNewArrivals();

  function renderCategories() {
    Object.values(categoryContent).forEach((item) => {
      const card = categoryCardTemplate.content.firstElementChild.cloneNode(true);
      card.href = item.href;
      card.querySelector(".category-card-label").textContent = item.label;
      card.querySelector(".category-card-title").textContent = item.title;
      card.querySelector(".category-card-copy").textContent = item.copy;
      categoryGrid.appendChild(card);
    });
  }

  function renderBestSellers() {
    const items = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
    items.forEach((product) => {
      const card = productCardTemplate.content.firstElementChild.cloneNode(true);
      populateProductCard(card, product);
      bestSellerGrid.appendChild(card);
    });
  }

  function renderNewArrivals() {
    products.filter((product) => product.isNew).slice(0, 3).forEach((product) => {
      const card = featuredCardTemplate.content.firstElementChild.cloneNode(true);
      card.querySelector(".featured-name").textContent = product.name;
      card.querySelector(".featured-copy").textContent = product.description;
      card.querySelector(".featured-price").textContent = formatPrice(product.price);
      card.querySelector(".featured-action").addEventListener("click", () => openProductModal(product.id));
      newArrivalGrid.appendChild(card);
    });
  }

  function populateProductCard(card, product) {
    card.querySelector(".product-badge").textContent = product.badge;
    const image = card.querySelector("img");
    image.src = createProductImage(product);
    image.alt = product.name;
    card.querySelector(".product-category").textContent = product.category;
    card.querySelector(".product-rating").textContent = `★ ${product.rating.toFixed(1)}`;
    card.querySelector(".product-name").textContent = product.name;
    card.querySelector(".product-description").textContent = product.description;
    card.querySelector(".product-price").textContent = formatPrice(product.price);
    card.querySelector(".product-installments").textContent = `Hasta 6 cuotas de ${formatPrice(Math.round(product.price / 6))}`;

    const tagsContainer = card.querySelector(".product-tags");
    product.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });

    card.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCart(product.id);
      showToast(`${product.name} fue agregado al carrito.`);
      openCart();
    });

    card.querySelector(".view-product").addEventListener("click", () => {
      openProductModal(product.id);
    });
  }
})();
