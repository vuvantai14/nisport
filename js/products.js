import { formatMoney, initCommonLayout, normalizeText, saveData, getData } from "./common.js";

export const productSeed = [
  ["Dam hoa pastel", "FEMALE", 3, "Vay", 329000, 420000, "Dam hoa pastel nhe nhang, phu hop di choi, di cafe hoac dao pho cuoi tuan.", "Sale"],
  ["Dam du tiec den", "FEMALE", 3, "Vay", 499000, 650000, "Dam du tiec mau den sang trong, thiet ke don gian nhung noi bat.", "Hot"],
  ["Ao blouse tay phong", "FEMALE", 1, "Ao", 289000, 350000, "Ao blouse tay phong nu tinh, de phoi cung chan vay chu A hoac quan jeans.", "New"],
  ["Chan vay midi xep ly", "FEMALE", 4, "Chan vay", 319000, 390000, "Chan vay midi xep ly mem mai, tao chuyen dong nhe khi di chuyen.", "Sale"],
  ["Ao kieu co no", "FEMALE", 1, "Ao", 299000, 360000, "Ao kieu co no tao diem nhan thanh lich, hop voi phong cach cong so nhe nhang.", "New"],
  ["Vay cong so thanh lich", "FEMALE", 3, "Vay", 369000, 450000, "Vay cong so dang dai vua phai, thanh lich, phu hop di lam va gap khach hang.", "Sale"],
  ["Dam satin hai day", "FEMALE", 3, "Vay", 459000, 560000, "Dam satin hai day mem ru, thich hop cho cac buoi tiec toi va hen ho.", "Hot"],
  ["Chan vay jean chu A", "FEMALE", 4, "Chan vay", 309000, 0, "Chan vay jean chu A tre trung, de phoi voi ao thun, so mi hoac croptop.", "New"],
  ["Ao so mi nam Oxford", "MALE", 1, "Ao", 329000, 420000, "Ao so mi nam Oxford dung form, phu hop di lam, gap khach hang hoac phoi smart casual.", "New"],
  ["Ao polo nam basic", "MALE", 1, "Ao", 249000, 320000, "Ao polo nam basic thoang mat, de phoi cung quan jeans, kaki hoac short.", "Sale"],
  ["Quan tay nam slimfit", "MALE", 2, "Quan", 429000, 520000, "Quan tay nam slimfit co do co gian nhe, phu hop cong so va su kien lich su.", "Hot"],
  ["Ao thun nam cotton", "MALE", 1, "Ao", 199000, 0, "Ao thun nam cotton mem, form de mac cho outfit hang ngay.", "New"],
  ["Ao khoac bomber nam", "MALE", 6, "Ao khoac", 559000, 690000, "Ao khoac bomber nam nang dong, de phoi voi ao thun, jeans va sneaker.", "Hot"],
  ["Quan jeans nam straight", "MALE", 2, "Quan", 459000, 560000, "Quan jeans nam dang straight gon gang, ben mau va de ung dung.", "Sale"],
  ["Ao so mi nam caro", "MALE", 1, "Ao", 349000, 430000, "Ao so mi nam caro tre trung, phu hop di choi cuoi tuan hoac mac khoac ngoai.", "New"],
  ["Quan short kaki nam", "MALE", 2, "Quan", 289000, 350000, "Quan short kaki nam thoai mai, phu hop dao pho, du lich va ngay cuoi tuan.", "Sale"],
  ["Ao hoodie unisex", "UNISEX", 5, "Hoodie", 449000, 560000, "Ao hoodie unisex phom rong vua phai, phu hop ca nam va nu trong thoi tiet se lanh.", "Hot"],
  ["Ao thun oversize unisex", "UNISEX", 1, "Ao", 229000, 290000, "Ao thun oversize unisex chat cotton mem, de phoi theo phong cach tre trung.", "New"],
  ["So mi trang unisex", "UNISEX", 1, "Ao", 319000, 390000, "So mi trang unisex toi gian, co the phoi cong so hoac casual.", "Sale"],
  ["Quan jogger unisex", "UNISEX", 2, "Quan", 359000, 450000, "Quan jogger unisex thoai mai, phu hop van dong nhe va mac hang ngay.", "New"],
  ["Ao cardigan unisex", "UNISEX", 6, "Ao khoac", 389000, 480000, "Ao cardigan unisex mem nhe, de khoac ngoai ao basic cho ca nam va nu.", "Sale"],
  ["Set the thao unisex", "UNISEX", 2, "Quan", 529000, 650000, "Set the thao unisex nang dong, phu hop di choi, tap nhe hoac du lich.", "Hot"],
  ["Mu luoi trai basic", "UNISEX", 7, "Phu kien", 149000, 0, "Mu luoi trai basic de phoi cung outfit nam, nu hoac unisex.", "New"],
  ["Tui deo cheo unisex", "UNISEX", 7, "Phu kien", 259000, 320000, "Tui deo cheo unisex nho gon, dung vat dung ca nhan khi di hoc, di lam hoac dao pho.", "Sale"],
  ["That lung da nam", "MALE", 7, "Phu kien", 229000, 290000, "That lung da nam toi gian, phu hop quan tay, kaki va jeans.", "New"],
  ["Tui xach mini nu", "FEMALE", 7, "Phu kien", 229000, 0, "Tui xach mini nu tinh, de phoi cung dam, vay hoac set cong so.", "New"],
  ["Khan lua hoa tiet", "FEMALE", 7, "Phu kien", 149000, 0, "Khan lua hoa tiet nhe nhang, co the buoc co, buoc toc hoac trang tri tui.", "New"],
  ["Vi da mini unisex", "UNISEX", 7, "Phu kien", 199000, 250000, "Vi da mini unisex gon nhe, phu hop su dung hang ngay hoac lam qua tang.", "Sale"]
];

export const genderLabels = {
  MALE: "Nam",
  FEMALE: "Nu",
  UNISEX: "Unisex"
};

export const productCategories = [
  { id: 1, name: "Ao" },
  { id: 2, name: "Quan" },
  { id: 3, name: "Vay" },
  { id: 4, name: "Chan vay" },
  { id: 5, name: "Hoodie" },
  { id: 6, name: "Ao khoac" },
  { id: 7, name: "Phu kien" }
];

export let products = productSeed.map(([name, gender, categoryId, category, price, oldPrice, description, tag], index) => ({
  id: index + 1,
  name,
  gender,
  categoryId,
  category,
  price,
  oldPrice,
  image: `../assets/product-${index + 1}.jpg`,
  description,
  tag
}));

export const defaultProducts = products.map((product) => ({ ...product }));
export const PRODUCT_ADMIN_STATE_VERSION = "backend-shape-v1";

const params = new URLSearchParams(window.location.search);
let currentGender = params.get("gender") || "ALL";
let currentCategoryId = params.get("categoryId") || "all";
let currentPage = 1;
let appliedSidebarFilters = { categoryId: currentCategoryId, priceValue: "all", colors: [] };
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
  const colorsByGender = {
    MALE: ["Black", "Beige", "Navy"],
    FEMALE: ["Pastel Pink", "Ivory", "Black"],
    UNISEX: ["Black", "Ivory", "Beige"]
  };
  return colorsByGender[product.gender] || ["Black"];
}

export function getProductSizes() {
  return ["S", "M", "L", "XL", "XXL"];
}

function getCheckedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function getSidebarFilters() {
  const categoryId = document.querySelector('input[name="sidebarCategory"]:checked')?.value || "all";
  const priceValue = document.querySelector('input[name="priceFilter"]:checked')?.value || "all";
  const colors = getCheckedValues("colorFilter");
  return { categoryId, priceValue, colors };
}

function syncFilterControls() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.gender === currentGender);
  });
  document.querySelectorAll('input[name="sidebarCategory"]').forEach((input) => {
    input.checked = input.value === String(appliedSidebarFilters.categoryId || "all");
  });
}

function resetSidebarFilters() {
  document.querySelector('input[name="priceFilter"][value="all"]')?.click();
  document.querySelectorAll('input[name="colorFilter"]').forEach((input) => {
    input.checked = false;
  });
}

function interleaveProductsByGender(productList) {
  const genderOrder = ["MALE", "FEMALE", "UNISEX"];
  const groups = genderOrder.map((gender) => productList.filter((product) => product.gender === gender));
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
    const matchGender = currentGender === "ALL" || product.gender === currentGender;
    const matchCategory = appliedSidebarFilters.categoryId === "all" || Number(product.categoryId) === Number(appliedSidebarFilters.categoryId);
    const matchSearch = normalizeText(product.name).includes(keyword);
    const matchPrice = appliedSidebarFilters.priceValue === "all"
      || (() => {
        const [min, max] = appliedSidebarFilters.priceValue.split("-").map(Number);
        return product.price >= min && product.price <= max;
      })();
    const matchColor = appliedSidebarFilters.colors.length === 0
      || appliedSidebarFilters.colors.some((color) => getProductColors(product).includes(color));

    return matchGender && matchCategory && matchSearch && matchPrice && matchColor;
  });

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    emptyMessage.style.display = "block";
    renderProductPagination(0);
    return;
  }

  emptyMessage.style.display = "none";

  const displayProducts = currentGender === "ALL"
    ? interleaveProductsByGender(filteredProducts)
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
        <span class="product-category">${genderLabels[product.gender]} / ${product.category}</span>
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
  syncFilterControls();

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.gender === currentGender);
    button.addEventListener("click", () => {
      currentGender = button.dataset.gender || "ALL";
      syncFilterControls();
      currentPage = 1;
      renderProducts();
    });
  });

  document.querySelectorAll('input[name="sidebarCategory"]').forEach((input) => {
    input.addEventListener("change", () => {
      appliedSidebarFilters.categoryId = input.value;
      syncFilterControls();
    });
  });

  document.getElementById("applyProductFilters")?.addEventListener("click", () => {
    appliedSidebarFilters = getSidebarFilters();
    currentPage = 1;
    renderProducts();
  });

  document.getElementById("clearProductFilters")?.addEventListener("click", () => {
    currentGender = "ALL";
    appliedSidebarFilters.categoryId = "all";
    resetSidebarFilters();
    appliedSidebarFilters = getSidebarFilters();
    syncFilterControls();
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
      currentGender = card.dataset.gender || "ALL";
      appliedSidebarFilters.categoryId = card.dataset.categoryId || "all";
      syncFilterControls();
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
        currentPage = 1;
        renderProducts();
      } else {
        const query = new URLSearchParams();
        if (currentGender !== "ALL") query.set("gender", currentGender);
        if (appliedSidebarFilters.categoryId !== "all") query.set("categoryId", appliedSidebarFilters.categoryId);
        window.location.href = `products.html?${query.toString()}`;
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
