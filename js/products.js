import { formatMoney, initCommonLayout, normalizeText, saveData, getData } from "./common.js";

export const productSeed = [
  ["Quần jeans nam basic", "MALE", 2, "Quần", 399000, 499000, "Quần jeans nam basic dễ mặc, phù hợp đi học, đi làm và dạo phố hằng ngày.", "New"],
  ["Quần kaki nam slimfit", "MALE", 2, "Quần", 429000, 529000, "Quần kaki nam slimfit gọn dáng, hợp phong cách công sở và smart casual.", "Sale"],
  ["Quần tây nam công sở", "MALE", 2, "Quần", 459000, 559000, "Quần tây nam công sở lịch sự, chất vải đứng form và dễ phối áo sơ mi.", "Hot"],
  ["Quần short nam casual", "MALE", 2, "Quần", 289000, 359000, "Quần short nam casual thoải mái cho ngày cuối tuần, du lịch hoặc dạo phố.", "New"],
  ["Quần jogger nam thể thao", "MALE", 2, "Quần", 349000, 429000, "Quần jogger nam thể thao co giãn nhẹ, phù hợp vận động và mặc hằng ngày.", "Sale"],
  ["Quần cargo nam streetwear", "MALE", 2, "Quần", 479000, 590000, "Quần cargo nam streetwear nhiều túi, tạo điểm nhấn năng động cho outfit.", "Hot"],
  ["Quần jeans nam ống suông", "MALE", 2, "Quần", 449000, 540000, "Quần jeans nam ống suông dễ phối áo thun, hoodie hoặc áo khoác.", "New"],
  ["Quần jeans nữ ống rộng", "FEMALE", 2, "Quần", 429000, 529000, "Quần jeans nữ ống rộng tôn dáng, phù hợp phong cách trẻ trung.", "Sale"],
  ["Quần baggy nữ lưng cao", "FEMALE", 2, "Quần", 389000, 469000, "Quần baggy nữ lưng cao thoải mái, dễ phối với croptop hoặc áo sơ mi.", "New"],
  ["Quần tây nữ công sở", "FEMALE", 2, "Quần", 419000, 510000, "Quần tây nữ công sở thanh lịch, phù hợp đi làm và gặp khách hàng.", "Hot"],
  ["Quần short nữ basic", "FEMALE", 2, "Quần", 269000, 329000, "Quần short nữ basic nhẹ mát, dễ phối cho outfit mùa hè.", "New"],
  ["Quần culottes nữ thanh lịch", "FEMALE", 2, "Quần", 399000, 489000, "Quần culottes nữ thanh lịch, tạo cảm giác mềm mại khi di chuyển.", "Sale"],
  ["Quần jeans nữ ống loe", "FEMALE", 2, "Quần", 439000, 539000, "Quần jeans nữ ống loe tạo dáng cổ điển, phù hợp giày cao gót hoặc sneaker.", "Hot"],
  ["Quần linen nữ mùa hè", "FEMALE", 2, "Quần", 369000, 450000, "Quần linen nữ mùa hè thoáng mát, hợp đi chơi và du lịch.", "New"],
  ["Quần ống suông nữ Hàn Quốc", "FEMALE", 2, "Quần", 409000, 499000, "Quần ống suông nữ Hàn Quốc phom mềm, dễ phối áo kiểu và cardigan.", "Sale"],
  ["Áo thun nam cổ tròn", "MALE", 1, "Áo", 199000, 249000, "Áo thun nam cổ tròn chất cotton mềm, phù hợp mặc hằng ngày.", "New"],
  ["Áo sơ mi nam trắng", "MALE", 1, "Áo", 329000, 420000, "Áo sơ mi nam trắng tối giản, dễ phối công sở hoặc casual.", "Sale"],
  ["Áo polo nam basic", "MALE", 1, "Áo", 259000, 329000, "Áo polo nam basic thoáng mát, hợp quần jeans, kaki hoặc short.", "New"],
  ["Áo sơ mi nam caro", "MALE", 1, "Áo", 349000, 430000, "Áo sơ mi nam caro trẻ trung, có thể mặc riêng hoặc khoác ngoài áo thun.", "Sale"],
  ["Áo thun nam graphic", "MALE", 1, "Áo", 239000, 299000, "Áo thun nam graphic nổi bật, phù hợp phong cách dạo phố năng động.", "Hot"],
  ["Áo kiểu nữ tay bồng", "FEMALE", 1, "Áo", 299000, 369000, "Áo kiểu nữ tay bồng nữ tính, dễ phối quần jeans hoặc chân váy.", "New"],
  ["Áo blouse nữ công sở", "FEMALE", 1, "Áo", 319000, 390000, "Áo blouse nữ công sở thanh lịch, phù hợp đi làm và gặp khách hàng.", "Sale"],
  ["Áo croptop nữ basic", "FEMALE", 1, "Áo", 219000, 269000, "Áo croptop nữ basic trẻ trung, hợp phối quần lưng cao.", "New"],
  ["Áo thun nữ pastel", "FEMALE", 1, "Áo", 199000, 249000, "Áo thun nữ pastel nhẹ nhàng, dễ phối trong outfit hằng ngày.", "Sale"],
  ["Áo len mỏng nữ Hàn Quốc", "FEMALE", 1, "Áo", 349000, 430000, "Áo len mỏng nữ Hàn Quốc mềm mại, phù hợp thời tiết se lạnh.", "Hot"],
  ["Áo thun unisex form rộng", "UNISEX", 1, "Áo", 249000, 319000, "Áo thun unisex form rộng dễ mặc cho cả nam và nữ.", "New"],
  ["Áo thun unisex basic", "UNISEX", 1, "Áo", 219000, 279000, "Áo thun unisex basic tối giản, phù hợp nhiều phong cách.", "Sale"],
  ["Áo sơ mi unisex oversize", "UNISEX", 1, "Áo", 359000, 449000, "Áo sơ mi unisex oversize phom rộng, dễ phối layer.", "Hot"],
  ["Áo khoác denim unisex", "UNISEX", 6, "Áo khoác", 559000, 690000, "Áo khoác denim unisex cá tính, hợp phối streetwear.", "Hot"],
  ["Áo khoác bomber unisex", "UNISEX", 6, "Áo khoác", 589000, 720000, "Áo khoác bomber unisex năng động, phù hợp đi học và dạo phố.", "Sale"],
  ["Hoodie unisex basic", "UNISEX", 5, "Hoodie", 449000, 560000, "Hoodie unisex basic phom thoải mái, phù hợp thời tiết se lạnh.", "New"],
  ["Hoodie unisex form rộng", "UNISEX", 5, "Hoodie", 489000, 590000, "Hoodie unisex form rộng trẻ trung, dễ phối quần jeans hoặc jogger.", "Sale"],
  ["Hoodie zip unisex", "UNISEX", 5, "Hoodie", 529000, 650000, "Hoodie zip unisex tiện dụng, có thể mặc khoác ngoài áo thun.", "Hot"],
  ["Sweater unisex tối giản", "UNISEX", 5, "Hoodie", 419000, 510000, "Sweater unisex tối giản với màu dễ mặc, phù hợp outfit hằng ngày.", "New"],
  ["Sweater unisex vintage", "UNISEX", 5, "Hoodie", 459000, 560000, "Sweater unisex vintage tạo cảm giác retro, hợp phối layer.", "Sale"],
  ["Quần jogger unisex", "UNISEX", 2, "Quần", 379000, 459000, "Quần jogger unisex thoải mái, phù hợp vận động nhẹ và mặc thường ngày.", "New"],
  ["Quần short unisex thể thao", "UNISEX", 2, "Quần", 299000, 360000, "Quần short unisex thể thao nhẹ, thoáng và dễ phối áo thun.", "Sale"],
  ["Áo khoác gió unisex", "UNISEX", 6, "Áo khoác", 499000, 620000, "Áo khoác gió unisex nhẹ, tiện lợi khi đi chơi hoặc du lịch.", "Hot"],
  ["Áo cardigan unisex", "UNISEX", 6, "Áo khoác", 429000, 520000, "Áo cardigan unisex mềm nhẹ, dễ khoác ngoài áo basic.", "New"],
  ["Set đồ unisex basic", "UNISEX", 1, "Áo", 559000, 690000, "Set đồ unisex basic đồng bộ, phù hợp phong cách tối giản.", "Sale"],
  ["Túi tote canvas basic", "UNISEX", 7, "Phụ kiện", 169000, 220000, "Túi tote canvas basic rộng rãi, phù hợp đi học, đi làm và đi chơi.", "New"],
  ["Mũ lưỡi trai unisex", "UNISEX", 7, "Phụ kiện", 149000, 0, "Mũ lưỡi trai unisex dễ phối cùng nhiều outfit nam nữ.", "New"],
  ["Thắt lưng da basic", "UNISEX", 7, "Phụ kiện", 199000, 250000, "Thắt lưng da basic tối giản, phù hợp quần jeans, kaki hoặc quần tây.", "Sale"],
  ["Vớ cổ cao basic", "UNISEX", 7, "Phụ kiện", 89000, 120000, "Vớ cổ cao basic mềm, dễ phối sneaker và outfit thường ngày.", "New"],
  ["Túi đeo chéo mini", "UNISEX", 7, "Phụ kiện", 249000, 320000, "Túi đeo chéo mini nhỏ gọn, tiện đựng vật dụng cá nhân.", "Hot"],
  ["Khăn bandana họa tiết", "UNISEX", 7, "Phụ kiện", 129000, 0, "Khăn bandana họa tiết dùng buộc cổ, buộc tóc hoặc trang trí túi.", "New"],
  ["Kính thời trang basic", "UNISEX", 7, "Phụ kiện", 189000, 240000, "Kính thời trang basic tạo điểm nhấn hiện đại cho outfit.", "Sale"],
  ["Mũ bucket unisex", "UNISEX", 7, "Phụ kiện", 159000, 210000, "Mũ bucket unisex trẻ trung, phù hợp đi chơi và du lịch.", "New"],
  ["Ví da mini", "UNISEX", 7, "Phụ kiện", 199000, 250000, "Ví da mini gọn nhẹ, phù hợp sử dụng hằng ngày hoặc làm quà tặng.", "Sale"],
  ["Dây chuyền basic", "UNISEX", 7, "Phụ kiện", 119000, 0, "Dây chuyền basic tối giản, dễ phối cùng áo thun hoặc sơ mi.", "New"]
];

export const genderLabels = {
  MALE: "Nam",
  FEMALE: "Nữ",
  UNISEX: "Unisex"
};

export const productCategories = [
  { id: 1, name: "Áo" },
  { id: 2, name: "Quần" },
  { id: 5, name: "Hoodie" },
  { id: 6, name: "Áo khoác" },
  { id: 7, name: "Phụ kiện" }
];

function getVariantStock(productId, sizeIndex, colorIndex) {
  return 10 + ((productId * 7 + sizeIndex * 5 + colorIndex * 3) % 41);
}

function buildProductVariants(product) {
  const isAccessory = product.categoryId === 7;
  const sizes = isAccessory ? ["FREE_SIZE"] : ["S", "M", "L", "XL"];
  const colors = isAccessory ? ["Black", "White", "Beige", "Brown"] : ["Black", "White", "Beige"];

  return sizes.flatMap((size, sizeIndex) => colors.map((color, colorIndex) => ({
    id: `${product.id}-${size}-${color}`,
    productId: product.id,
    product_id: product.id,
    size,
    color,
    stock: getVariantStock(product.id, sizeIndex, colorIndex),
    sku: `LUNA-${String(product.id).padStart(3, "0")}-${size}-${color.toUpperCase()}`,
    price: product.price
  })));
}

export let products = productSeed.map(([name, gender, categoryId, category, price, oldPrice, description, tag], index) => ({
  id: index + 1,
  name,
  gender,
  categoryId,
  category,
  price,
  oldPrice,
  image: `/assets/products/product-${index + 1}.jpg`,
  image_url: `/assets/products/product-${index + 1}.jpg`,
  images: [{
    image_url: `/assets/products/product-${index + 1}.jpg`,
    is_thumbnail: true,
    sort_order: 1
  }],
  description,
  tag
})).map((product) => ({
  ...product,
  variants: buildProductVariants(product)
}));

export const productImages = products.map((product) => ({
  id: product.id,
  productId: product.id,
  product_id: product.id,
  image_url: product.image_url,
  is_thumbnail: true,
  sort_order: 1
}));

export const productVariants = products.flatMap((product) => product.variants);

export const defaultProducts = products.map((product) => ({ ...product }));
export const PRODUCT_ADMIN_STATE_VERSION = "product-50-assets-v1";

const params = new URLSearchParams(window.location.search);
let currentGender = params.get("gender") || "ALL";
let currentCategoryId = params.get("categoryId") || "all";
let currentPage = 1;
let appliedSidebarFilters = { categoryId: currentCategoryId, priceValue: "all", colors: [], sizes: [] };
const productsPerPage = window.location.pathname.endsWith("products.html") ? 8 : 10;

export function getProductAdminState() {
  const savedState = getData("lunaProductAdminState", {});

  if (savedState.version !== PRODUCT_ADMIN_STATE_VERSION) {
    const customOnly = (savedState.customProducts || [])
      .filter((product) => product.id > defaultProducts.length && product.gender && product.categoryId);
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
  return [...new Set((product.variants || []).map((variant) => variant.color))];
}

export function getProductSizes(product) {
  if (!product) return ["S", "M", "L", "XL"];
  return [...new Set((product.variants || []).map((variant) => variant.size))];
}

function getCheckedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function getSidebarFilters() {
  const categoryId = document.querySelector('input[name="sidebarCategory"]:checked')?.value || "all";
  const priceValue = document.querySelector('input[name="priceFilter"]:checked')?.value || "all";
  const colors = getCheckedValues("colorFilter");
  const sizes = getCheckedValues("sizeFilter");
  return { categoryId, priceValue, colors, sizes };
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
    const matchSize = (appliedSidebarFilters.sizes || []).length === 0
      || appliedSidebarFilters.sizes.some((size) => getProductSizes(product).includes(size));

    return matchGender && matchCategory && matchSearch && matchPrice && matchColor && matchSize;
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
