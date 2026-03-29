(() => {
  const { products, formatPrice } = window.RobleData;
  const { createProductImage, addToCart, openCart, openProductModal, showToast } = window.RobleStore;

  const productGrid = document.getElementById("productGrid");
  const featuredStrip = document.getElementById("featuredStrip");
  const productCardTemplate = document.getElementById("productCardTemplate");
  const featuredCardTemplate = document.getElementById("featuredCardTemplate");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const materialFilter = document.getElementById("materialFilter");
  const sortFilter = document.getElementById("sortFilter");
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");
  const resultsTitle = document.getElementById("resultsTitle");
  const resultsSummary = document.getElementById("resultsSummary");
  const resetFilters = document.getElementById("resetFilters");

  const state = {
    search: "",
    category: new URLSearchParams(window.location.search).get("categoria") || "all",
    material: "all",
    sort: "featured",
    maxPrice: 4200000
  };

  hydrateFilterOptions();
  bindEvents();
  renderFeatured(products.filter((product) => product.featured));
  renderCatalog();

  function hydrateFilterOptions() {
    const categories = [...new Set(products.map((product) => product.category))];
    const materials = [...new Set(products.map((product) => product.material))];

    categories.forEach((category) => {
      categoryFilter.appendChild(createOption(category, category));
    });

    materials.forEach((material) => {
      materialFilter.appendChild(createOption(material, material));
    });

    categoryFilter.value = state.category;
    priceValue.textContent = formatPrice(state.maxPrice);
  }

  function bindEvents() {
    searchInput.addEventListener("input", (event) => {
      state.search = event.target.value.trim().toLowerCase();
      renderCatalog();
    });

    categoryFilter.addEventListener("change", (event) => {
      state.category = event.target.value;
      renderCatalog();
    });

    materialFilter.addEventListener("change", (event) => {
      state.material = event.target.value;
      renderCatalog();
    });

    sortFilter.addEventListener("change", (event) => {
      state.sort = event.target.value;
      renderCatalog();
    });

    priceRange.addEventListener("input", (event) => {
      state.maxPrice = Number(event.target.value);
      priceValue.textContent = formatPrice(state.maxPrice);
      renderCatalog();
    });

    resetFilters.addEventListener("click", resetAllFilters);
  }

  function renderCatalog() {
    const filteredProducts = getFilteredProducts();
    productGrid.innerHTML = "";

    resultsTitle.textContent = `${filteredProducts.length} productos disponibles`;
    resultsSummary.textContent = filteredProducts.length
      ? `Mostrando ${filteredProducts.length} resultado(s) segun tu seleccion actual.`
      : "No encontramos coincidencias. Ajusta los filtros para descubrir mas piezas.";

    if (!filteredProducts.length) {
      productGrid.innerHTML = `
        <article class="empty-state">
          <h3>Sin resultados</h3>
          <p>Prueba otra categoria, material o amplia el rango de precio.</p>
        </article>
      `;
      return;
    }

    filteredProducts.forEach((product) => {
      const card = productCardTemplate.content.firstElementChild.cloneNode(true);
      populateProductCard(card, product);
      productGrid.appendChild(card);
    });
  }

  function renderFeatured(featuredProducts) {
    featuredStrip.innerHTML = "";
    featuredProducts.slice(0, 3).forEach((product) => {
      const card = featuredCardTemplate.content.firstElementChild.cloneNode(true);
      card.querySelector(".featured-name").textContent = product.name;
      card.querySelector(".featured-copy").textContent = product.description;
      card.querySelector(".featured-price").textContent = formatPrice(product.price);
      card.querySelector(".featured-action").addEventListener("click", () => openProductModal(product.id));
      featuredStrip.appendChild(card);
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

  function getFilteredProducts() {
    return products
      .filter((product) => {
        const matchesSearch = `${product.name} ${product.description} ${product.material}`.toLowerCase().includes(state.search);
        const matchesCategory = state.category === "all" || product.category === state.category;
        const matchesMaterial = state.material === "all" || product.material === state.material;
        const matchesPrice = product.price <= state.maxPrice;
        return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
      })
      .sort((left, right) => {
        switch (state.sort) {
          case "price-asc":
            return left.price - right.price;
          case "price-desc":
            return right.price - left.price;
          case "rating-desc":
            return right.rating - left.rating;
          default:
            return Number(right.featured) - Number(left.featured) || right.rating - left.rating;
        }
      });
  }

  function resetAllFilters() {
    state.search = "";
    state.category = "all";
    state.material = "all";
    state.sort = "featured";
    state.maxPrice = 4200000;

    searchInput.value = "";
    categoryFilter.value = "all";
    materialFilter.value = "all";
    sortFilter.value = "featured";
    priceRange.value = "4200000";
    priceValue.textContent = formatPrice(state.maxPrice);

    renderCatalog();
  }

  function createOption(value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    return option;
  }
})();
