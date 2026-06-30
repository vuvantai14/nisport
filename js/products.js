import { formatMoney, getData, initCommonLayout, normalizeText, saveData } from "./common.js";

export const productCategories = [
  { id: 1, name: "Áo bóng đá", slug: "ao-bong-da" },
  { id: 2, name: "Quần bóng đá", slug: "quan-bong-da" },
  { id: 3, name: "Bộ đồ bóng đá", slug: "bo-do-bong-da" },
  { id: 4, name: "Đồ tập bóng đá", slug: "do-tap-bong-da" },
  { id: 5, name: "Phụ kiện", slug: "phu-kien" }
];

export const genderLabels = {
  MALE: "Nam",
  FEMALE: "Nữ",
  UNISEX: "Unisex"
};

export const productSeed = [
  ["Áo bóng đá sân nhà nam 2026", "ao-bong-da-san-nha-nam-2026", "MALE", 1, 329000, 399000, "Áo thi đấu nam chất thun lạnh co giãn, thoáng khí cho các trận sân 5 và sân 7.", "HOT"],
  ["Áo bóng đá sân khách nam 2026", "ao-bong-da-san-khach-nam-2026", "MALE", 1, 319000, 389000, "Áo bóng đá nam form thể thao, nhanh khô và dễ phối cùng quần thi đấu.", "NEW"],
  ["Áo thủ môn nam phản quang", "ao-thu-mon-nam-phan-quang", "MALE", 1, 369000, 449000, "Áo thủ môn tay dài có đệm nhẹ, màu nổi bật giúp dễ quan sát trên sân.", "SALE"],
  ["Áo bóng đá nữ sân nhà 2026", "ao-bong-da-nu-san-nha-2026", "FEMALE", 1, 319000, 389000, "Áo bóng đá nữ form gọn, chất liệu mềm nhẹ và thoát mồ hôi tốt.", "NEW"],
  ["Áo bóng đá nữ cổ tim", "ao-bong-da-nu-co-tim", "FEMALE", 1, 309000, 379000, "Áo bóng đá nữ cổ tim thể thao, phù hợp tập luyện và thi đấu phong trào.", "BASIC"],
  ["Áo bóng đá trẻ em xanh sân cỏ", "ao-bong-da-tre-em-xanh-san-co", "UNISEX", 1, 259000, 319000, "Áo bóng đá trẻ em chất vải mát, dễ giặt và bền màu.", "NEW"],
  ["Áo bóng đá unisex form rộng", "ao-bong-da-unisex-form-rong", "UNISEX", 1, 299000, 369000, "Áo bóng đá unisex dáng rộng, hợp mặc cổ vũ hoặc đá phủi cuối tuần.", "HOT"],
  ["Áo polo thể thao Ni Sport", "ao-polo-the-thao-ni-sport", "UNISEX", 1, 289000, 349000, "Áo polo thể thao lịch sự, phù hợp di chuyển trước và sau trận đấu.", "BASIC"],
  ["Áo tập compression tay dài", "ao-tap-compression-tay-dai", "UNISEX", 4, 279000, 339000, "Áo bó cơ hỗ trợ vận động, giữ ấm nhẹ khi tập buổi tối.", "SALE"],
  ["Áo bib tập luyện đội bóng", "ao-bib-tap-luyen-doi-bong", "UNISEX", 4, 99000, 129000, "Áo bib lưới nhẹ dùng chia đội khi tập luyện bóng đá.", "BASIC"],
  ["Quần bóng đá nam basic", "quan-bong-da-nam-basic", "MALE", 2, 189000, 239000, "Quần bóng đá nam nhẹ, lưng thun chắc và thoải mái khi bứt tốc.", "HOT"],
  ["Quần bóng đá nam túi khóa", "quan-bong-da-nam-tui-khoa", "MALE", 2, 219000, 269000, "Quần bóng đá có túi khóa nhỏ, tiện mang chìa khóa khi tập.", "NEW"],
  ["Quần bóng đá nữ dáng gọn", "quan-bong-da-nu-dang-gon", "FEMALE", 2, 189000, 239000, "Quần bóng đá nữ dáng gọn, chất liệu mềm và không bí khi vận động.", "NEW"],
  ["Quần short tập gym bóng đá", "quan-short-tap-gym-bong-da", "UNISEX", 4, 229000, 289000, "Quần short tập thể lực cho cầu thủ, co giãn tốt khi chạy nước rút.", "SALE"],
  ["Quần jogger thể thao Ni Sport", "quan-jogger-the-thao-ni-sport", "UNISEX", 4, 349000, 429000, "Quần jogger thể thao mặc khởi động, di chuyển hoặc tập nhẹ.", "BASIC"],
  ["Bộ đồ bóng đá nam đỏ đen", "bo-do-bong-da-nam-do-den", "MALE", 3, 489000, 589000, "Set áo và quần thi đấu nam màu đỏ đen, nổi bật và dễ in tên số.", "HOT"],
  ["Bộ đồ bóng đá nam xanh navy", "bo-do-bong-da-nam-xanh-navy", "MALE", 3, 479000, 579000, "Bộ đồ bóng đá nam xanh navy chất thun lạnh, phù hợp đội bóng phủi.", "NEW"],
  ["Bộ đồ bóng đá nữ trắng xanh", "bo-do-bong-da-nu-trang-xanh", "FEMALE", 3, 459000, 559000, "Set bóng đá nữ phối trắng xanh, form thể thao và dễ vận động.", "NEW"],
  ["Bộ đồ bóng đá nữ hồng đen", "bo-do-bong-da-nu-hong-den", "FEMALE", 3, 459000, 559000, "Bộ đồ bóng đá nữ phối hồng đen, chất vải nhẹ và lên dáng gọn.", "SALE"],
  ["Bộ đồ bóng đá unisex tối giản", "bo-do-bong-da-unisex-toi-gian", "UNISEX", 3, 469000, 569000, "Set unisex tối giản cho nhóm bạn hoặc đội bóng muốn đồng bộ nhanh.", "BASIC"],
  ["Bộ đồ bóng đá trẻ em vàng xanh", "bo-do-bong-da-tre-em-vang-xanh", "UNISEX", 3, 399000, 479000, "Bộ đồ bóng đá trẻ em màu vàng xanh, nhẹ và dễ giặt sau buổi tập.", "NEW"],
  ["Bộ đồ thủ môn nam cam đen", "bo-do-thu-mon-nam-cam-den", "MALE", 3, 529000, 629000, "Set thủ môn nam tay dài có đệm nhẹ, màu cam đen dễ nhận diện.", "HOT"],
  ["Bộ đồ thủ môn unisex xanh lá", "bo-do-thu-mon-unisex-xanh-la", "UNISEX", 3, 519000, 619000, "Bộ thủ môn unisex thoáng khí, hỗ trợ bảo vệ khi đổ người.", "SALE"],
  ["Set training unisex xám đen", "set-training-unisex-xam-den", "UNISEX", 4, 499000, 599000, "Set training áo và quần dùng tập thể lực, chạy bộ hoặc khởi động.", "BASIC"],
  ["Áo khoác gió bóng đá unisex", "ao-khoac-gio-bong-da-unisex", "UNISEX", 4, 549000, 649000, "Áo khoác gió nhẹ chống mưa nhỏ, phù hợp di chuyển đến sân.", "HOT"],
  ["Áo khoác training nam", "ao-khoac-training-nam", "MALE", 4, 529000, 629000, "Áo khoác training nam form thể thao, dễ mặc cùng quần jogger.", "NEW"],
  ["Áo khoác training nữ", "ao-khoac-training-nu", "FEMALE", 4, 519000, 619000, "Áo khoác training nữ nhẹ, gọn và phù hợp tập buổi sáng.", "NEW"],
  ["Quần dài training unisex", "quan-dai-training-unisex", "UNISEX", 4, 389000, 469000, "Quần dài training co giãn, hỗ trợ vận động khi tập chiến thuật.", "SALE"],
  ["Áo giữ nhiệt bóng đá", "ao-giu-nhiet-bong-da", "UNISEX", 4, 249000, 309000, "Áo giữ nhiệt mặc trong áo thi đấu, phù hợp đá ban đêm.", "BASIC"],
  ["Tất bóng đá chống trượt", "tat-bong-da-chong-truot", "UNISEX", 5, 99000, 139000, "Tất bóng đá đế chống trượt, tăng độ bám trong giày.", "HOT"],
  ["Tất bóng đá cổ cao", "tat-bong-da-co-cao", "UNISEX", 5, 89000, 119000, "Tất cổ cao co giãn tốt, ôm chân và bền sau nhiều lần giặt.", "BASIC"],
  ["Bọc ống đồng thi đấu", "boc-ong-dong-thi-dau", "UNISEX", 5, 129000, 169000, "Bọc ống đồng nhẹ, bảo vệ cẳng chân khi va chạm.", "NEW"],
  ["Găng tay thủ môn basic", "gang-tay-thu-mon-basic", "UNISEX", 5, 249000, 319000, "Găng tay thủ môn bám bóng tốt, phù hợp tập luyện và thi đấu phong trào.", "SALE"],
  ["Găng tay thủ môn pro grip", "gang-tay-thu-mon-pro-grip", "UNISEX", 5, 399000, 499000, "Găng thủ môn grip tốt, cổ tay chắc và bề mặt bắt bóng ổn định.", "HOT"],
  ["Băng đội trưởng", "bang-doi-truong", "UNISEX", 5, 69000, 99000, "Băng đội trưởng co giãn, màu nổi bật và dễ điều chỉnh.", "BASIC"],
  ["Băng cổ chân thể thao", "bang-co-chan-the-thao", "UNISEX", 5, 79000, 109000, "Băng cổ chân hỗ trợ khớp khi chạy, đổi hướng và tiếp đất.", "NEW"],
  ["Túi đựng giày bóng đá", "tui-dung-giay-bong-da", "UNISEX", 5, 159000, 199000, "Túi đựng giày chống bám bẩn, có quai xách tiện mang ra sân.", "SALE"],
  ["Túi trống thể thao Ni Sport", "tui-trong-the-thao-ni-sport", "UNISEX", 5, 349000, 429000, "Túi trống đựng đồ đá bóng, giày và phụ kiện sau trận.", "HOT"],
  ["Bình nước thể thao 750ml", "binh-nuoc-the-thao-750ml", "UNISEX", 5, 129000, 169000, "Bình nước dung tích 750ml, nắp bật tiện dùng khi tập luyện.", "BASIC"],
  ["Khăn thể thao nhanh khô", "khan-the-thao-nhanh-kho", "UNISEX", 5, 99000, 129000, "Khăn thể thao thấm hút tốt, nhanh khô sau buổi tập.", "NEW"],
  ["Nón lưỡi trai thể thao", "non-luoi-trai-the-thao", "UNISEX", 5, 159000, 199000, "Nón lưỡi trai che nắng khi tập ngoài trời hoặc cổ vũ trên sân.", "BASIC"],
  ["Dây kháng lực tập chân", "day-khang-luc-tap-chan", "UNISEX", 4, 149000, 199000, "Dây kháng lực hỗ trợ bài tập chân, mông và thăng bằng.", "NEW"],
  ["Thang dây tập tốc độ", "thang-day-tap-toc-do", "UNISEX", 4, 219000, 279000, "Thang dây tập bước nhỏ, cải thiện tốc độ và khả năng đổi hướng.", "SALE"],
  ["Cọc tiêu tập luyện bộ 10", "coc-tieu-tap-luyen-bo-10", "UNISEX", 4, 179000, 229000, "Bộ cọc tiêu dùng tập rê bóng, di chuyển và chia khu vực sân.", "HOT"],
  ["Bóng đá tập luyện size 5", "bong-da-tap-luyen-size-5", "UNISEX", 5, 299000, 369000, "Bóng đá size 5 dùng tập luyện hằng tuần, độ nảy ổn định.", "NEW"],
  ["Bóng futsal size 4", "bong-futsal-size-4", "UNISEX", 5, 279000, 349000, "Bóng futsal size 4 độ nảy thấp, phù hợp sân trong nhà.", "SALE"],
  ["Bơm bóng mini", "bom-bong-mini", "UNISEX", 5, 89000, 119000, "Bơm bóng mini nhỏ gọn, dễ mang theo trong túi thể thao.", "BASIC"],
  ["Kim bơm bóng bộ 5", "kim-bom-bong-bo-5", "UNISEX", 5, 39000, 59000, "Bộ kim bơm bóng dự phòng cho đội bóng và sân tập.", "BASIC"],
  ["Áo cổ vũ Ni Sport", "ao-co-vu-ni-sport", "UNISEX", 1, 229000, 289000, "Áo cổ vũ nhẹ, thoáng và phù hợp xem bóng đá cùng bạn bè.", "NEW"],
  ["Combo thi đấu đội bóng 5 người", "combo-thi-dau-doi-bong-5-nguoi", "UNISEX", 3, 1990000, 2390000, "Combo 5 bộ đồ bóng đá đồng đội, phù hợp nhóm đá sân 5.", "HOT"]
];

function getCategoryName(categoryId) {
  return productCategories.find((category) => Nữmber(category.id) === Nữmber(categoryId))?.name || "Sản phẩm";
}

export function getProductImagePath(productId) {
  return `/assets/products/product-${productId}.jpg`;
}

export function getDisplayImagePath(productId) {
  return `../assets/products/product-${productId}.jpg`;
}

export function handleProductImageError(image, productId = 1) {
  const fallback = `../assets/product-${Math.min(Nữmber(productId) || 1, 28)}.jpg`;
  if (!image || image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = fallback;
}

function getVariantStock(productId, sizeIndex, colorIndex) {
  return 10 + ((productId * 7 + sizeIndex * 5 + colorIndex * 3) % 41);
}

function buildProductVariants(product) {
  const isAccessory = product.categoryId === 5;
  const sizes = isAccessory ? ["FREE_SIZE"] : ["S", "M", "L", "XL"];
  const colors = isAccessory ? ["Black", "White", "Beige", "Brown"] : ["Black", "White", "Blue"];

  return sizes.flatMap((size, sizeIndex) => colors.map((color, colorIndex) => ({
    id: Nữmber(`${product.id}${sizeIndex + 1}${colorIndex + 1}`),
    productId: product.id,
    product_id: product.id,
    size,
    color,
    stock: getVariantStock(product.id, sizeIndex, colorIndex),
    sku: `NI-${String(product.id).padStart(3, "0")}-${size}-${color.toUpperCase()}`,
    price: product.price
  })));
}

export let products = productSeed.map(([name, slug, gender, categoryId, price, oldPrice, description, tag], index) => {
  const id = index + 1;
  const categoryName = getCategoryName(categoryId);
  return {
    id,
    name,
    slug,
    gender,
    categoryId,
    categoryName,
    category: categoryName,
    price,
    oldPrice,
    image: getDisplayImagePath(id),
    thumbnailUrl: getProductImagePath(id),
    image_url: getProductImagePath(id),
    totalStock: 0,
    status: "SELLING",
    description,
    tag,
    tagLabel: tag
  };
}).map((product) => {
  const variants = buildProductVariants(product);
  return {
    ...product,
    totalStock: variants.reduce((sum, variant) => sum + variant.stock, 0),
    variants
  };
});

export const productImages = products.map((product) => ({
  id: product.id,
  productId: product.id,
  product_id: product.id,
  image_url: product.thumbnailUrl,
  is_thumbnail: true,
  sort_order: 1
}));

export const productVariants = products.flatMap((product) => product.variants);
export const defaultProducts = products.map((product) => ({ ...product, variants: [...product.variants] }));
export const PRODUCT_ADMIN_STATE_VERSION = "ni-sport-static-v1";

const params = new URLSearchParams(window.location.search);
let currentGender = params.get("gender") || "ALL";
let currentCategoryId = params.get("categoryId") || "all";
let currentPage = 1;
let appliedSidebarFilters = { categoryId: currentCategoryId, priceValue: "all", colors: [], sizes: [] };
const productsPerPage = window.location.pathname.endsWith("products.html") ? 8 : 10;

export function getProductAdminState() {
  const savedState = getData("niSportProductAdminState", {});
  if (savedState.version !== PRODUCT_ADMIN_STATE_VERSION) {
    const freshState = { version: PRODUCT_ADMIN_STATE_VERSION, customProducts: [], hiddenProductIds: [] };
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
  saveData("niSportProductAdminState", state);
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
  return products.find((item) => Nữmber(item.id) === Nữmber(productId));
}

export function getProductColors(product) {
  return [...new Set((product?.variants || []).map((variant) => variant.color))];
}

export function getProductSizes(product) {
  return [...new Set((product?.variants || []).map((variant) => variant.size))];
}

function getCheckedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function getSidebarFilters() {
  const categoryId = document.querySelector('input[name="sidebarCategory"]:checked')?.value || "all";
  const priceValue = document.querySelector('input[name="priceFilter"]:checked')?.value || "all";
  return {
    categoryId,
    priceValue,
    colors: getCheckedValues("colorFilter"),
    sizes: getCheckedValues("sizeFilter")
  };
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
  document.querySelectorAll('input[name="colorFilter"], input[name="sizeFilter"]').forEach((input) => {
    input.checked = false;
  });
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

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <a class="product-image" href="product-detail.html?id=${product.id}">
      <span class="product-tag">${product.tagLabel || product.tag}</span>
      <img src="${product.image}" alt="${product.name}">
    </a>
    <div class="product-info">
      <span class="product-category">${genderLabels[product.gender]} / ${product.categoryName}</span>
      <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
      <div class="price-row">
        <span class="price">${formatMoney(product.price)}</span>
        ${product.oldPrice ? `<span class="old-price">${formatMoney(product.oldPrice)}</span>` : ""}
      </div>
      <div class="product-actions">
        <button class="action-btn add-btn" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        <button class="action-btn quick-btn" onclick="openQuickView(${product.id})">Xem nhanh</button>
      </div>
    </div>
  `;
  card.querySelector("img")?.addEventListener("error", (event) => handleProductImageError(event.currentTarget, product.id));
  return card;
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
    const matchCategory = appliedSidebarFilters.categoryId === "all" || Nữmber(product.categoryId) === Nữmber(appliedSidebarFilters.categoryId);
    const matchSearch = !keyword || normalizeText(`${product.name} ${product.categoryName} ${product.description}`).includes(keyword);
    const matchPrice = appliedSidebarFilters.priceValue === "all"
      || (() => {
        const [min, max] = appliedSidebarFilters.priceValue.split("-").map(Nữmber);
        return product.price >= min && product.price <= max;
      })();
    const matchColor = appliedSidebarFilters.colors.length === 0
      || appliedSidebarFilters.colors.some((color) => getProductColors(product).includes(color));
    const matchSize = appliedSidebarFilters.sizes.length === 0
      || appliedSidebarFilters.sizes.some((size) => getProductSizes(product).includes(size));
    return matchGender && matchCategory && matchSearch && matchPrice && matchColor && matchSize && product.status !== "HIDDEN";
  });

  productGrid.innerHTML = "";
  if (filteredProducts.length === 0) {
    emptyMessage.style.display = "block";
    renderProductPagination(0);
    return;
  }

  emptyMessage.style.display = "none";
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (currentPage > totalPages) currentPage = totalPages;
  const startIndex = (currentPage - 1) * productsPerPage;
  filteredProducts.slice(startIndex, startIndex + productsPerPage).forEach((product) => {
    productGrid.appendChild(createProductCard(product));
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
