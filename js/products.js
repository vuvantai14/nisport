import { formatMoney, initCommonLayout, normalizeText, saveData, getData } from "./common.js";

export const productSeed = [
  ["Dam hoa pastel", "Nu", 329000, 420000, "Dam hoa pastel nhe nhang, phu hop di choi, di cafe hoac dao pho cuoi tuan.", "Sale"],
  ["Dam du tiec den", "Nu", 499000, 650000, "Dam du tiec mau den sang trong, thiet ke don gian nhung noi bat.", "Hot"],
  ["Ao blouse tay phong", "Nu", 289000, 350000, "Ao blouse tay phong nu tinh, de phoi cung chan vay chu A hoac quan jeans.", "New"],
  ["Chan vay midi xep ly", "Nu", 319000, 390000, "Chan vay midi xep ly mem mai, tao chuyen dong nhe khi di chuyen.", "Sale"],
  ["Ao kieu co no", "Nu", 299000, 360000, "Ao kieu co no tao diem nhan thanh lich, hop voi phong cach cong so nhe nhang.", "New"],
  ["Vay cong so thanh lich", "Nu", 369000, 450000, "Vay cong so dang dai vua phai, thanh lich, phu hop di lam va gap khach hang.", "Sale"],
  ["Dam satin hai day", "Nu", 459000, 560000, "Dam satin hai day mem ru, thich hop cho cac buoi tiec toi va hen ho.", "Hot"],
  ["Chan vay jean chu A", "Nu", 309000, 0, "Chan vay jean chu A tre trung, de phoi voi ao thun, so mi hoac croptop.", "New"],
  ["Ao so mi nam Oxford", "Nam", 329000, 420000, "Ao so mi nam Oxford dung form, phu hop di lam, gap khach hang hoac phoi smart casual.", "New"],
  ["Ao polo nam basic", "Nam", 249000, 320000, "Ao polo nam basic thoang mat, de phoi cung quan jeans, kaki hoac short.", "Sale"],
  ["Quan tay nam slimfit", "Nam", 429000, 520000, "Quan tay nam slimfit co do co gian nhe, phu hop cong so va su kien lich su.", "Hot"],
  ["Ao thun nam cotton", "Nam", 199000, 0, "Ao thun nam cotton mem, form de mac cho outfit hang ngay.", "New"],
  ["Ao khoac bomber nam", "Nam", 559000, 690000, "Ao khoac bomber nam nang dong, de phoi voi ao thun, jeans va sneaker.", "Hot"],
  ["Quan jeans nam straight", "Nam", 459000, 560000, "Quan jeans nam dang straight gon gang, ben mau va de ung dung.", "Sale"],
  ["Ao so mi nam caro", "Nam", 349000, 430000, "Ao so mi nam caro tre trung, phu hop di choi cuoi tuan hoac mac khoac ngoai.", "New"],
  ["Quan short kaki nam", "Nam", 289000, 350000, "Quan short kaki nam thoai mai, phu hop dao pho, du lich va ngay cuoi tuan.", "Sale"],
  ["Ao hoodie unisex", "Unisex", 449000, 560000, "Ao hoodie unisex phom rong vua phai, phu hop ca nam va nu trong thoi tiet se lanh.", "Hot"],
  ["Ao thun oversize unisex", "Unisex", 229000, 290000, "Ao thun oversize unisex chat cotton mem, de phoi theo phong cach tre trung.", "New"],
  ["So mi trang unisex", "Unisex", 319000, 390000, "So mi trang unisex toi gian, co the phoi cong so hoac casual.", "Sale"],
  ["Quan jogger unisex", "Unisex", 359000, 450000, "Quan jogger unisex thoai mai, phu hop van dong nhe va mac hang ngay.", "New"],
  ["Ao cardigan unisex", "Unisex", 389000, 480000, "Ao cardigan unisex mem nhe, de khoac ngoai ao basic cho ca nam va nu.", "Sale"],
  ["Set the thao unisex", "Unisex", 529000, 650000, "Set the thao unisex nang dong, phu hop di choi, tap nhe hoac du lich.", "Hot"],
  ["Mu luoi trai basic", "Phu kien", 149000, 0, "Mu luoi trai basic de phoi cung outfit nam, nu hoac unisex.", "New"],
  ["Tui deo cheo unisex", "Phu kien", 259000, 320000, "Tui deo cheo unisex nho gon, dung vat dung ca nhan khi di hoc, di lam hoac dao pho.", "Sale"],
  ["That lung da nam", "Phu kien", 229000, 290000, "That lung da nam toi gian, phu hop quan tay, kaki va jeans.", "New"],
  ["Tui xach mini nu", "Phu kien", 229000, 0, "Tui xach mini nu tinh, de phoi cung dam, vay hoac set cong so.", "New"],
  ["Khan lua hoa tiet", "Phu kien", 149000, 0, "Khan lua hoa tiet nhe nhang, co the buoc co, buoc toc hoac trang tri tui.", "New"],
  ["Vi da mini unisex", "Phu kien", 199000, 250000, "Vi da mini unisex gon nhe, phu hop su dung hang ngay hoac lam qua tang.", "Sale"]
];

export let products = productSeed.map(([name, category, price, oldPrice, description, tag], index) => ({
  id: index + 1,
  name,
  category,
  price,
  oldPrice,
  image: `../assets/product-${index + 1}.jpg`,
  description,
  tag
}));

export const defaultProducts = products.map((product) => ({ ...product }));
export const PRODUCT_ADMIN_STATE_VERSION = "men-women-v2";

let currentFilter = new URLSearchParams(window.location.search).get("category") || "Tat ca";
let currentPage = 1;
let appliedSidebarFilters = { priceValue: "all", colors: [] };
const productsPerPage = window.location.pathname.endsWith("products.html") ? 8 : 10;

export function getProductAdminState() {
  const savedState = getData("lunaProductAdminState", {});

  if (savedState.version !== PRODUCT_ADMIN_STATE_VERSION) {
    const customOnly = (savedState.customProducts || []).filter((product) => product.id > defaultProducts.length);
    const freshState = {
      version: PRODUCT_ADMIN_STATE_VERSION,
      customProducts: customOnly,
      hiddenProductIds: []
    };
    saveProductAdminState(freshState);
    return freshState;
  }

  return {
    version: PRODUCT_ADMIN_STATE_VERSION,
    customProducts: savedState.customProducts || [],
    hiddenProductIds: savedState.hiddenProductIds || []
  };
}

export function saveProductAdminState(state) {
  saveData("lunaProductAdminState", state);
}

export function refreshProductsFromAdminState() {
  const state = getProductAdminState();
  const customById = new Map(state.customProducts.map((product) => [product.id, product]));
  const hiddenIds = new Set(state.hiddenProductIds);
  const mergedDefaults = defaultProducts
    .filter((product) => !hiddenIds.has(product.id))
    .map((product) => customById.get(product.id) || product);
  const customOnly = state.customProducts.filter((product) => !defaultProducts.some((item) => item.id === product.id));

  products = [...mergedDefaults, ...customOnly].filter((product) => !hiddenIds.has(product.id));
}

export function getProductById(productId) {
  refreshProductsFromAdminState();
  return products.find((item) => Number(item.id) === Number(productId));
}

export function getProductColors(product) {
  const colorsByCategory = {
    "Nam": ["Black", "Beige", "Navy"],
    "Nu": ["Pastel Pink", "Ivory", "Black"],
    "Unisex": ["Black", "Ivory", "Beige"],
    "Phu kien": ["Black", "Beige", "Pastel Pink"]
  };
  return colorsByCategory[product.category] || ["Black"];
}

export function getProductSizes() {
  return ["S", "M", "L", "XL", "XXL"];
}

function getCheckedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function getSidebarFilters() {
  const priceValue = document.querySelector('input[name="priceFilter"]:checked')?.value || "all";
  const colors = getCheckedValues("colorFilter");
  return { priceValue, colors };
}

function syncCategoryControls(category) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === category);
  });
  document.querySelectorAll('input[name="sidebarCategory"]').forEach((input) => {
    input.checked = input.value === category;
  });
}

function resetSidebarFilters() {
  document.querySelector('input[name="priceFilter"][value="all"]')?.click();
  document.querySelectorAll('input[name="colorFilter"]').forEach((input) => {
    input.checked = false;
  });
}

function interleaveProductsByCategory(productList) {
  const categoryOrder = ["Nam", "Nu", "Unisex", "Phu kien"];
  const groups = categoryOrder.map((category) => productList.filter((product) => product.category === category));
  const mixedProducts = [];
  let index = 0;

  while (groups.some((group) => index < group.length)) {
    groups.forEach((group) => {
      if (group[index]) mixedProducts.push(group[index]);
    });
    index += 1;
  }

  return mixedProducts;
}

function getProductPagination(productGrid) {
  if (!productGrid) return null;

  let pagination = document.getElementById("productPagination");
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "productPagination";
    pagination.className = "product-pagination";
    productGrid.insertAdjacentElement("afterend", pagination);
  }
  return pagination;
}

function renderProductPagination(totalPages) {
  const productGrid = document.getElementById("productGrid");
  const pagination = getProductPagination(productGrid);
  if (!pagination) return;

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<button class="${page === currentPage ? "active" : ""}" onclick="goToProductPage(${page})">${page}</button>`;
  }).join("");

  pagination.innerHTML = `
    <button ${currentPage === 1 ? "disabled" : ""} onclick="goToProductPage(${currentPage - 1})">‹</button>
    ${pageButtons}
    <button ${currentPage === totalPages ? "disabled" : ""} onclick="goToProductPage(${currentPage + 1})">›</button>
  `;
}

export function goToProductPage(page) {
  currentPage = page;
  renderProducts();
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function renderProducts() {
  refreshProductsFromAdminState();
  const productGrid = document.getElementById("productGrid");
  const emptyMessage = document.getElementById("emptyMessage");
  const searchInput = document.getElementById("searchInput");
  if (!productGrid || !searchInput || !emptyMessage) return;

  const keyword = normalizeText(searchInput.value.trim());
  const filteredProducts = products.filter((product) => {
    const matchCategory = currentFilter === "Tat ca" || product.category === currentFilter;
    const matchSearch = normalizeText(product.name).includes(keyword);
    const matchPrice = appliedSidebarFilters.priceValue === "all"
      || (() => {
        const [min, max] = appliedSidebarFilters.priceValue.split("-").map(Number);
        return product.price >= min && product.price <= max;
      })();
    const matchColor = appliedSidebarFilters.colors.length === 0
      || appliedSidebarFilters.colors.some((color) => getProductColors(product).includes(color));

    return matchCategory && matchSearch && matchPrice && matchColor;
  });

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    emptyMessage.style.display = "block";
    renderProductPagination(0);
    return;
  }

  emptyMessage.style.display = "none";

  const displayProducts = currentFilter === "Tat ca"
    ? interleaveProductsByCategory(filteredProducts)
    : filteredProducts;
  const totalPages = Math.ceil(displayProducts.length / productsPerPage);
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * productsPerPage;
  displayProducts.slice(startIndex, startIndex + productsPerPage).forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <a class="product-image" href="product-detail.html?id=${product.id}">
        <span class="product-tag">${product.tag}</span>
        <img src="${product.image}" alt="${product.name}">
      </a>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
        <div class="price-row">
          <span class="price">${formatMoney(product.price)}</span>
          ${product.oldPrice ? `<span class="old-price">${formatMoney(product.oldPrice)}</span>` : ""}
        </div>
        <div class="product-actions">
          <button class="action-btn add-btn" onclick="addToCart(${product.id})">🛒 Thêm vào giỏ</button>
          <button class="action-btn quick-btn" onclick="openQuickView(${product.id})">Xem nhanh</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });

  renderProductPagination(totalPages);
}

export function initProductFilters() {
  syncCategoryControls(currentFilter);

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      syncCategoryControls(currentFilter);
      currentPage = 1;
      renderProducts();
    });
  });

  document.querySelectorAll('input[name="sidebarCategory"]').forEach((input) => {
    input.addEventListener("change", () => {
      currentFilter = input.value;
      syncCategoryControls(currentFilter);
    });
  });

  document.getElementById("applyProductFilters")?.addEventListener("click", () => {
    appliedSidebarFilters = getSidebarFilters();
    currentPage = 1;
    renderProducts();
  });

  document.getElementById("clearProductFilters")?.addEventListener("click", () => {
    currentFilter = "Tat ca";
    syncCategoryControls(currentFilter);
    resetSidebarFilters();
    appliedSidebarFilters = getSidebarFilters();
    currentPage = 1;
    renderProducts();
  });

  document.getElementById("searchInput")?.addEventListener("input", () => {
    currentPage = 1;
    renderProducts();
  });
}

export function initCategoryCards() {
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      currentFilter = card.dataset.category;
      syncCategoryControls(currentFilter);
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
        currentPage = 1;
        renderProducts();
      } else {
        window.location.href = `products.html?category=${encodeURIComponent(currentFilter)}`;
      }
    });
  });
}

export function initProductsPage() {
  initCommonLayout();
  initProductFilters();
  initCategoryCards();
  renderProducts();
  import("./cart.js").then(({ initCartControls }) => initCartControls());
}

window.goToProductPage = goToProductPage;

if (document.getElementById("productGrid")) {
  initProductsPage();
}
