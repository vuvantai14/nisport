const productSeed = [
  ["Đầm hoa pastel", "Đầm", 329000, 420000, "Đầm hoa pastel nhẹ nhàng, phù hợp đi chơi, đi cà phê hoặc dạo phố cuối tuần.", "Sale"],
  ["Đầm dự tiệc đen", "Đầm", 499000, 650000, "Đầm dự tiệc màu đen sang trọng, thiết kế đơn giản nhưng nổi bật.", "Hot"],
  ["Đầm linen cổ vuông", "Đầm", 389000, 480000, "Đầm linen cổ vuông nhẹ mát, phù hợp đi làm, đi chơi và những ngày thời tiết nóng.", "Sale"],
  ["Đầm cổ yếm dự tiệc", "Đầm", 529000, 690000, "Đầm cổ yếm thanh lịch cho tiệc tối, sinh nhật hoặc những buổi hẹn quan trọng.", "Hot"],
  ["Đầm sơ mi thắt eo", "Đầm", 419000, 520000, "Đầm sơ mi thắt eo gọn gàng, dễ mặc đi làm và có thể phối cùng túi mini.", "Sale"],
  ["Đầm satin hai dây", "Đầm", 459000, 560000, "Đầm satin hai dây mềm rũ, thích hợp cho các buổi tiệc tối và hẹn hò.", "Hot"],
  ["Đầm babydoll tay bồng", "Đầm", 379000, 460000, "Đầm babydoll tay bồng tạo dáng trẻ trung, dễ mặc trong những buổi dạo phố.", "New"],
  ["Đầm maxi hoa nhí", "Đầm", 559000, 690000, "Đầm maxi hoa nhí mềm mại, phù hợp du lịch, đi biển hoặc những ngày cuối tuần.", "Sale"],
  ["Áo sơ mi trắng nữ", "Áo", 259000, 0, "Áo sơ mi trắng basic, dễ phối cùng quần jeans, chân váy hoặc quần tây.", "New"],
  ["Áo croptop basic", "Áo", 199000, 0, "Áo croptop basic trẻ trung, chất vải mềm, dễ phối với chân váy hoặc quần jean.", "New"],
  ["Áo blouse tay phồng", "Áo", 289000, 350000, "Áo blouse tay phồng nữ tính, dễ phối cùng chân váy chữ A hoặc quần jeans.", "New"],
  ["Áo thun rib ôm dáng", "Áo", 179000, 0, "Áo thun rib co giãn nhẹ, ôm dáng vừa phải và dễ phối trong outfit hằng ngày.", "New"],
  ["Áo kiểu cổ nơ", "Áo", 299000, 360000, "Áo kiểu cổ nơ tạo điểm nhấn nữ tính, hợp với phong cách công sở nhẹ nhàng.", "New"],
  ["Áo khoác cardigan mỏng", "Áo", 349000, 430000, "Áo khoác cardigan mỏng nhẹ, dễ khoác ngoài váy hai dây hoặc áo basic.", "Sale"],
  ["Áo peplum công sở", "Áo", 319000, 390000, "Áo peplum công sở giúp tôn eo, phù hợp phối cùng chân váy hoặc quần tây.", "Sale"],
  ["Chân váy chữ A", "Váy", 279000, 350000, "Chân váy chữ A tôn dáng, phù hợp phong cách đi học và công sở.", "Sale"],
  ["Váy công sở thanh lịch", "Váy", 369000, 450000, "Váy công sở dáng dài vừa phải, thanh lịch, phù hợp đi làm và gặp khách hàng.", "Sale"],
  ["Chân váy midi xếp ly", "Váy", 319000, 390000, "Chân váy midi xếp ly mềm mại, tạo chuyển động nhẹ nhàng khi di chuyển.", "Sale"],
  ["Váy bút chì công sở", "Váy", 339000, 420000, "Váy bút chì công sở có độ co giãn nhẹ, giúp dáng mặc gọn và thanh lịch.", "Sale"],
  ["Chân váy jean chữ A", "Váy", 309000, 0, "Chân váy jean chữ A trẻ trung, dễ phối với áo thun, sơ mi hoặc croptop.", "New"],
  ["Váy tennis xếp ly", "Váy", 289000, 350000, "Váy tennis xếp ly năng động, phù hợp phong cách trẻ trung khi đi học hoặc dạo phố.", "New"],
  ["Chân váy lụa midi", "Váy", 359000, 450000, "Chân váy lụa midi mềm rũ, dễ phối với áo sơ mi, áo thun hoặc cardigan.", "New"],
  ["Chân váy xếp tầng", "Váy", 399000, 490000, "Chân váy xếp tầng nữ tính, tạo độ bay nhẹ cho outfit đi chơi hoặc dự tiệc.", "Hot"],
  ["Túi xách mini", "Phụ kiện", 229000, 0, "Túi xách mini nữ tính, dễ phối cùng đầm, váy hoặc set công sở.", "New"],
  ["Túi đeo vai pastel", "Phụ kiện", 259000, 320000, "Túi đeo vai pastel nhỏ gọn, phù hợp đi chơi, đi học hoặc phối cùng đầm nhẹ.", "Sale"],
  ["Băng đô ngọc trai", "Phụ kiện", 129000, 0, "Băng đô ngọc trai nhỏ xinh, tạo điểm nhấn nhẹ cho outfit váy hoặc đầm pastel.", "New"],
  ["Khăn lụa họa tiết", "Phụ kiện", 149000, 0, "Khăn lụa họa tiết nhẹ nhàng, có thể buộc cổ, buộc tóc hoặc trang trí túi.", "New"],
  ["Thắt lưng bản nhỏ", "Phụ kiện", 169000, 220000, "Thắt lưng bản nhỏ giúp nhấn eo khi phối cùng đầm, váy hoặc áo blazer.", "Sale"]
];

let products = productSeed.map(([name, category, price, oldPrice, description, tag], index) => ({
  id: index + 1,
  name,
  category,
  price,
  oldPrice,
  image: `assets/product-${index + 1}.jpg`,
  description,
  tag
}));

const defaultProducts = products.map((product) => ({ ...product }));
const PRODUCT_ADMIN_STATE_VERSION = "manual-assets-v1";

function getProductAdminState() {
  const savedState = JSON.parse(localStorage.getItem("lunaProductAdminState")) || {};

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

function saveProductAdminState(state) {
  localStorage.setItem("lunaProductAdminState", JSON.stringify(state));
}

function refreshProductsFromAdminState() {
  const state = getProductAdminState();
  const customById = new Map(state.customProducts.map((product) => [product.id, product]));
  const hiddenIds = new Set(state.hiddenProductIds);
  const mergedDefaults = defaultProducts
    .filter((product) => !hiddenIds.has(product.id))
    .map((product) => customById.get(product.id) || product);
  const customOnly = state.customProducts.filter((product) => !defaultProducts.some((item) => item.id === product.id));

  products = [...mergedDefaults, ...customOnly].filter((product) => !hiddenIds.has(product.id));
}

refreshProductsFromAdminState();

const productGrid = document.getElementById("productGrid");
const emptyMessage = document.getElementById("emptyMessage");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartOpenBtn = document.getElementById("cartOpenBtn");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const quickModal = document.getElementById("quickModal");
const quickCloseBtn = document.getElementById("quickCloseBtn");
const quickViewBody = document.getElementById("quickViewBody");
const toast = document.getElementById("toast");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const checkoutBtn = document.getElementById("checkoutBtn");
const detailTitle = document.getElementById("detailTitle");
const detailCategory = document.getElementById("detailCategory");
const detailImage = document.getElementById("detailImage");
const detailPrice = document.getElementById("detailPrice");
const detailOldPrice = document.getElementById("detailOldPrice");
const detailDescription = document.getElementById("detailDescription");
const detailSpecs = document.getElementById("detailSpecs");
const detailAddBtn = document.getElementById("detailAddBtn");
const relatedGrid = document.getElementById("relatedGrid");
const detailRouteName = document.getElementById("detailRouteName");
const colorOptions = document.getElementById("colorOptions");
const sizeOptions = document.getElementById("sizeOptions");
const cartPageItems = document.getElementById("cartPageItems");
const cartPageCount = document.getElementById("cartPageCount");
const cartPageSubtotal = document.getElementById("cartPageSubtotal");
const cartPageShipping = document.getElementById("cartPageShipping");
const cartPageTotal = document.getElementById("cartPageTotal");
const cartPageNotice = document.getElementById("cartPageNotice");
const clearProductFiltersBtn = document.getElementById("clearProductFilters");
const applyProductFiltersBtn = document.getElementById("applyProductFilters");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");
const adminProductModal = document.getElementById("adminProductModal");
const adminProductForm = document.getElementById("adminProductForm");
const adminProductTable = document.getElementById("adminProductTable");
const adminFilterCategory = document.getElementById("adminFilterCategory");
const adminFilterPrice = document.getElementById("adminFilterPrice");
const adminFilterTag = document.getElementById("adminFilterTag");
const adminProductSearch = document.getElementById("adminProductSearch");
const adminApplyProductFilters = document.getElementById("adminApplyProductFilters");
const adminSearchProducts = document.getElementById("adminSearchProducts");
const adminClearProductFilters = document.getElementById("adminClearProductFilters");
const adminCustomerTable = document.getElementById("adminCustomerTable");
const adminCustomerSearch = document.getElementById("adminCustomerSearch");
const adminSearchCustomers = document.getElementById("adminSearchCustomers");
const adminClearCustomerSearch = document.getElementById("adminClearCustomerSearch");
const adminOrderTable = document.getElementById("adminOrderTable");
const adminOrderDateFrom = document.getElementById("adminOrderDateFrom");
const adminOrderDateTo = document.getElementById("adminOrderDateTo");
const adminFilterOrderDate = document.getElementById("adminFilterOrderDate");
const adminOrderSearch = document.getElementById("adminOrderSearch");
const adminSearchOrders = document.getElementById("adminSearchOrders");
const adminClearOrderFilters = document.getElementById("adminClearOrderFilters");
const adminOrderFilterButtons = document.querySelectorAll("[data-order-filter]");
const adminStats = document.getElementById("adminStats");
const adminApp = document.getElementById("adminApp");
const adminLogoutLink = document.getElementById("adminLogoutLink");
const adminSectionLinks = document.querySelectorAll(".admin-sidebar nav a[href^='#admin']");
const adminSectionTriggers = document.querySelectorAll("a[href^='#admin']");
const adminPanels = document.querySelectorAll(".admin-panel");
const checkoutMainBtn = document.querySelector(".checkout-main-btn");
const heroBannerImage = document.getElementById("heroBannerImage");
const heroPrevBtn = document.getElementById("heroPrevBtn");
const heroNextBtn = document.getElementById("heroNextBtn");
const heroDots = document.querySelectorAll("#heroDots button");
const heroTextContent = document.getElementById("heroTextContent");

const heroBanners = [
  "assets/banner-1.jpg",
  "assets/banner-2.jpg"
];

let currentFilter = "Tất cả";
let currentPage = 1;
let currentHeroBanner = 0;
const productsPerPage = window.location.pathname.endsWith("products.html") ? 8 : 10;
let cart = JSON.parse(localStorage.getItem("lunaCart")) || [];
let appliedSidebarFilters = {
  priceValue: "all",
  colors: []
};
let adminProductFilters = {
  category: "all",
  price: "all",
  tag: "all",
  keyword: ""
};
let adminCustomerKeyword = "";
let adminOrderFilters = {
  status: "all",
  dateFrom: "",
  dateTo: "",
  keyword: ""
};

let currentUser = JSON.parse(localStorage.getItem("lunaCurrentUser")) || null;

function seedAdminAccount() {
  const users = getUsers();
  const adminEmail = "admin@lunafashion.com";

  if (!users.some((user) => user.email === adminEmail)) {
    users.push({
      id: 1,
      firstName: "Admin",
      lastName: "Luna",
      email: adminEmail,
      password: "admin123",
      phone: "",
      address: "",
      role: "admin",
      createdAt: new Date().toISOString()
    });
    saveUsers(users);
  }
}

function normalizeCurrentUserRole() {
  if (!currentUser) return;
  if (currentUser.email === "admin@lunafashion.com") {
    currentUser = { ...currentUser, role: "admin" };
  } else if (!currentUser.role) {
    currentUser = { ...currentUser, role: "customer" };
  }
  localStorage.setItem("lunaCurrentUser", JSON.stringify(currentUser));
}

function guardAdminWebsiteAccess() {
  if (!currentUser || currentUser.role !== "admin") return;

  const pageName = window.location.pathname.split("/").pop() || "index.html";
  const allowedAdminPages = new Set(["admin.html", "login.html", "register.html"]);

  if (!allowedAdminPages.has(pageName)) {
    window.location.replace("admin.html");
  }
}

const params = new URLSearchParams(window.location.search);
const categoryParam = params.get("category");
if (categoryParam) {
  currentFilter = categoryParam;
}

const detailSpecsMap = {
  "Đầm": [
    ["Chất liệu", "Voan lụa mềm, có lót"],
    ["Phom dáng", "Xòe nhẹ, tôn eo"],
    ["Chiều dài", "Qua gối"],
    ["Màu sắc", "Pastel / Đen / Kem"],
    ["Size", "S, M, L"],
    ["Phù hợp", "Dạo phố, đi làm, dự tiệc nhẹ"],
    ["Bảo quản", "Giặt tay hoặc giặt túi lưới"]
  ],
  "Áo": [
    ["Chất liệu", "Cotton pha mềm mịn"],
    ["Phom dáng", "Basic dễ phối"],
    ["Tay áo", "Ngắn / dài tùy mẫu"],
    ["Màu sắc", "Trắng, kem, hồng nhạt"],
    ["Size", "S, M, L"],
    ["Phù hợp", "Đi học, đi làm, dạo phố"],
    ["Bảo quản", "Ủi nhiệt thấp"]
  ],
  "Váy": [
    ["Chất liệu", "Tuyết mưa co giãn nhẹ"],
    ["Phom dáng", "Chữ A thanh lịch"],
    ["Chiều dài", "Trên gối hoặc midi"],
    ["Màu sắc", "Đen, be, nâu sữa"],
    ["Size", "S, M, L"],
    ["Phù hợp", "Công sở, gặp khách hàng"],
    ["Bảo quản", "Không dùng chất tẩy mạnh"]
  ],
  "Phụ kiện": [
    ["Chất liệu", "Da tổng hợp cao cấp"],
    ["Kiểu dáng", "Mini bag nữ tính"],
    ["Kích thước", "20 x 14 x 7 cm"],
    ["Màu sắc", "Kem, đen, hồng"],
    ["Ngăn chứa", "1 ngăn chính, 1 ngăn phụ"],
    ["Phù hợp", "Dạo phố, đi tiệc"],
    ["Bảo quản", "Tránh nước và ánh nắng gắt"]
  ]
};

function formatMoney(number) {
  return number.toLocaleString("vi-VN") + "đ";
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function getUsers() {
  return JSON.parse(localStorage.getItem("lunaUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("lunaUsers", JSON.stringify(users));
}

function setAuthMessage(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.className = `auth-message ${type}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setHeroBanner(index) {
  if (!heroBannerImage || heroBanners.length === 0) return;
  currentHeroBanner = (index + heroBanners.length) % heroBanners.length;
  heroBannerImage.style.display = "block";
  heroBannerImage.src = heroBanners[currentHeroBanner];
  heroBannerImage.alt = `Banner Luna Fashion ${currentHeroBanner + 1}`;
  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentHeroBanner);
  });
  heroTextContent?.classList.toggle("hide", currentHeroBanner !== 0);
}

function initHeroBanner() {
  if (!heroBannerImage) return;

  heroBannerImage.addEventListener("error", () => {
    heroBannerImage.style.display = "none";
  });
  heroPrevBtn?.addEventListener("click", () => setHeroBanner(currentHeroBanner - 1));
  heroNextBtn?.addEventListener("click", () => setHeroBanner(currentHeroBanner + 1));
  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => setHeroBanner(index));
  });

  setInterval(() => {
    setHeroBanner(currentHeroBanner + 1);
  }, 5500);
}

function updateLoginLinks() {
  document.querySelectorAll(".login-link").forEach((link) => {
    if (!currentUser) return;
    link.innerHTML = `<span>👤</span><small>${currentUser.firstName}</small>`;
    link.href = "#user-info";
    link.setAttribute("aria-label", `Tài khoản ${currentUser.firstName}`);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showUserInfo();
    });
  });
}

function showUserInfo() {
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  let modal = document.getElementById("userInfoModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "userInfoModal";
    modal.className = "user-info-modal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="user-info-card">
      <button class="user-info-close" type="button" aria-label="Đóng">×</button>
      <div class="user-info-avatar">👤</div>
      <div class="user-info-title-row">
        <h2>Thông tin tài khoản</h2>
        <button class="edit-user-btn" type="button">Chỉnh sửa</button>
      </div>
      <dl>
        <div>
          <dt>Họ tên</dt>
          <dd class="user-view-value">${currentUser.lastName} ${currentUser.firstName}</dd>
          <div class="user-edit-fields">
            <input type="text" id="userLastNameInput" value="${currentUser.lastName || ""}" placeholder="Nhập họ">
            <input type="text" id="userFirstNameInput" value="${currentUser.firstName || ""}" placeholder="Nhập tên">
          </div>
        </div>
        <div><dt>Email</dt><dd>${currentUser.email}</dd></div>
        <div>
          <dt>Số điện thoại</dt>
          <dd class="user-view-value">${currentUser.phone || "Chưa cập nhật"}</dd>
          <div class="user-edit-fields">
            <input type="tel" id="userPhoneInput" value="${currentUser.phone || ""}" placeholder="Nhập số điện thoại">
          </div>
        </div>
        <div>
          <dt>Địa chỉ</dt>
          <dd class="user-view-value">${currentUser.address || "Chưa cập nhật"}</dd>
          <div class="user-edit-fields">
            <input type="text" id="userAddressInput" value="${currentUser.address || ""}" placeholder="Nhập địa chỉ">
          </div>
        </div>
      </dl>
      <div class="user-action-grid user-edit-actions">
        <button class="save-user-btn" type="button">Cập nhật</button>
        <button class="cancel-edit-btn" type="button">Hủy</button>
      </div>
      ${currentUser.role === "admin" ? `<a class="admin-shortcut-btn" href="admin.html">Vào trang admin</a>` : ""}
      <button class="logout-btn single-logout-btn" type="button">Đăng xuất</button>
    </div>
  `;

  modal.classList.add("show");
  modal.querySelector(".user-info-close").addEventListener("click", () => modal.classList.remove("show"));
  modal.querySelector(".edit-user-btn").addEventListener("click", () => {
    modal.querySelector(".user-info-card").classList.add("editing");
  });
  modal.querySelector(".cancel-edit-btn").addEventListener("click", () => {
    modal.querySelector(".user-info-card").classList.remove("editing");
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.remove("show");
  });
  modal.querySelectorAll(".logout-btn").forEach((button) => button.addEventListener("click", () => {
    localStorage.removeItem("lunaCurrentUser");
    currentUser = null;
    window.location.href = "index.html";
  }));

  modal.querySelector(".save-user-btn").addEventListener("click", () => {
    const lastName = document.getElementById("userLastNameInput").value.trim();
    const firstName = document.getElementById("userFirstNameInput").value.trim();
    const phone = document.getElementById("userPhoneInput").value.trim();
    const address = document.getElementById("userAddressInput").value.trim();
    const users = getUsers();
    const userIndex = users.findIndex((user) => user.id === currentUser.id);

    if (!lastName || !firstName) {
      showCenterNotice("Vui lòng nhập đầy đủ họ và tên.", "error");
      return;
    }

    currentUser = { ...currentUser, lastName, firstName, phone, address };
    localStorage.setItem("lunaCurrentUser", JSON.stringify(currentUser));

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], lastName, firstName, phone, address };
      saveUsers(users);
    }

    showCenterNotice("Cập nhật thông tin thành công.", "success", () => {
      showUserInfo();
    });
  });
}

function showCenterNotice(message, type = "success", callback) {
  let notice = document.getElementById("centerNotice");

  if (!notice) {
    notice = document.createElement("div");
    notice.id = "centerNotice";
    notice.className = "center-notice";
    document.body.appendChild(notice);
  }

  notice.innerHTML = `
    <div class="center-notice-box ${type}">
      <span>${type === "success" ? "✓" : "!"}</span>
      <p>${message}</p>
    </div>
  `;
  notice.classList.add("show");

  setTimeout(() => {
    notice.classList.remove("show");
    if (callback) callback();
  }, 1200);
}

function getProductColors(product) {
  const colorsByCategory = {
    "Đầm": ["Pastel Pink", "Ivory", "Black"],
    "Áo": ["Ivory", "Pastel Pink", "Beige"],
    "Váy": ["Black", "Beige", "Pastel Pink"],
    "Phụ kiện": ["Pastel Pink", "Ivory", "Beige"]
  };

  return colorsByCategory[product.category] || ["Pastel Pink"];
}

function getProductSizes(product) {
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
  filterButtons.forEach((btn) => {
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

function getProductPagination() {
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
  const pagination = getProductPagination();
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

function goToProductPage(page) {
  currentPage = page;
  renderProducts();
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function interleaveProductsByCategory(productList) {
  const categoryOrder = ["Đầm", "Áo", "Váy", "Phụ kiện"];
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

function renderProducts() {
  if (!productGrid || !searchInput || !emptyMessage) return;

  const keyword = normalizeText(searchInput.value.trim());

  const sidebarFilters = appliedSidebarFilters;

  const filteredProducts = products.filter((product) => {
    const matchCategory = currentFilter === "Tất cả" || product.category === currentFilter;
    const matchSearch = normalizeText(product.name).includes(keyword);
    const matchPrice = sidebarFilters.priceValue === "all"
      || (() => {
        const [min, max] = sidebarFilters.priceValue.split("-").map(Number);
        return product.price >= min && product.price <= max;
      })();
    const matchColor = sidebarFilters.colors.length === 0
      || sidebarFilters.colors.some((color) => getProductColors(product).includes(color));

    return matchCategory && matchSearch && matchPrice && matchColor;
  });

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    emptyMessage.style.display = "block";
    renderProductPagination(0);
    return;
  }

  emptyMessage.style.display = "none";

  const displayProducts = currentFilter === "Tất cả"
    ? interleaveProductsByCategory(filteredProducts)
    : filteredProducts;

  const totalPages = Math.ceil(displayProducts.length / productsPerPage);
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = displayProducts.slice(startIndex, startIndex + productsPerPage);

  visibleProducts.forEach((product) => {
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

filterButtons.forEach((button) => {
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

if (applyProductFiltersBtn) {
  applyProductFiltersBtn.addEventListener("click", () => {
    appliedSidebarFilters = getSidebarFilters();
    currentPage = 1;
    renderProducts();
  });
}

if (clearProductFiltersBtn) {
  clearProductFiltersBtn.addEventListener("click", () => {
    currentFilter = "Tất cả";
    syncCategoryControls(currentFilter);
    resetSidebarFilters();
    appliedSidebarFilters = getSidebarFilters();
    currentPage = 1;
    renderProducts();
  });
}

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    currentFilter = card.dataset.category;
    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === currentFilter);
    });
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

if (searchInput) {
  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderProducts();
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const lastName = document.getElementById("lastName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value.trim();
    const users = getUsers();

    if (!lastName || !firstName || !email || !password) {
      setAuthMessage(registerMessage, "Vui lòng nhập đầy đủ thông tin.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setAuthMessage(registerMessage, "Email chưa đúng định dạng.", "error");
      return;
    }

    if (password.length < 6) {
      setAuthMessage(registerMessage, "Mật khẩu cần có ít nhất 6 ký tự.", "error");
      return;
    }

    if (users.some((user) => user.email === email)) {
      setAuthMessage(registerMessage, "Email này đã được đăng ký. Vui lòng đăng nhập.", "error");
      return;
    }

    const newUser = {
      id: Date.now(),
      lastName,
      firstName,
      email,
      phone: "",
      address: "",
      role: "customer",
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    localStorage.setItem("lunaCurrentUser", JSON.stringify({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: "",
      address: "",
      role: newUser.role
    }));

    setAuthMessage(registerMessage, "Tạo tài khoản thành công.", "success");
    showCenterNotice("Tạo tài khoản thành công. Vui lòng đăng nhập.", "success", () => {
      window.location.href = "login.html";
    });
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();
    const users = getUsers();
    const user = users.find((item) => item.email === email && item.password === password);

    if (!email || !password) {
      setAuthMessage(loginMessage, "Vui lòng nhập email và mật khẩu.", "error");
      return;
    }

    if (!user) {
      setAuthMessage(loginMessage, "Email hoặc mật khẩu chưa đúng.", "error");
      return;
    }

    localStorage.setItem("lunaCurrentUser", JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      role: user.role || "customer"
    }));

    setAuthMessage(loginMessage, "Đăng nhập thành công.", "success");
    showCenterNotice("Đăng nhập thành công.", "success", () => {
      window.location.href = user.role === "admin" ? "admin.html" : "index.html";
    });
  });
}

function saveCart() {
  localStorage.setItem("lunaCart", JSON.stringify(cart));
}

function getCartKey(productId, size = "", color = "") {
  return `${productId}-${size || "default"}-${color || "default"}`;
}

function addToCart(productId, options = {}) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const size = options.size || "";
  const color = options.color || "";
  const cartKey = getCartKey(productId, size, color);
  const existingItem = cart.find((item) => (item.cartKey || getCartKey(item.id, item.size, item.color)) === cartKey);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, size, color, cartKey, quantity: 1 });
  }

  saveCart();
  renderCart();
  renderCartPage();
  showToast("Đã thêm sản phẩm vào giỏ hàng.");
}

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalMoney = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartCount) cartCount.textContent = totalQuantity;
  if (cartTotal) cartTotal.textContent = formatMoney(totalMoney);
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Giỏ hàng đang trống.</p>`;
  } else {
    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      const key = item.cartKey || getCartKey(item.id, item.size, item.color);
      const variantText = [item.size ? `Size ${item.size}` : "", item.color ? `Màu ${item.color}` : ""]
        .filter(Boolean)
        .join(" | ");

      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          ${variantText ? `<small>${variantText}</small>` : ""}
          <p>${formatMoney(item.price)}</p>
          <div class="qty-row">
            <button onclick="changeQuantity('${key}', -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity('${key}', 1)">+</button>
            <button class="remove-btn" onclick="removeFromCart('${key}')">Xóa</button>
          </div>
        </div>
      `;

      cartItems.appendChild(row);
    });
  }
}

function changeQuantity(cartKey, amount) {
  const item = cart.find((cartItem) => (cartItem.cartKey || getCartKey(cartItem.id, cartItem.size, cartItem.color)) === String(cartKey));
  if (!item) return;

  item.quantity += amount;

  if (item.quantity < 1) {
    item.quantity = 1;
    showToast("Số lượng tối thiểu là 1.");
  }

  saveCart();
  renderCart();
  renderCartPage();
}

function removeFromCart(cartKey) {
  cart = cart.filter((item) => (item.cartKey || getCartKey(item.id, item.size, item.color)) !== String(cartKey));
  saveCart();
  renderCart();
  renderCartPage();
  showToast("Đã xóa sản phẩm khỏi giỏ hàng.");
}

function renderCartPage() {
  if (!cartPageItems) return;

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 500000 || subtotal === 0 ? 0 : 30000;
  const total = subtotal + shipping;

  cartPageCount.textContent = `(${totalQuantity} sản phẩm)`;
  cartPageSubtotal.textContent = formatMoney(subtotal);
  cartPageShipping.textContent = formatMoney(shipping);
  cartPageTotal.textContent = formatMoney(total);

  if (cartPageNotice) {
    cartPageNotice.textContent = totalQuantity
      ? `Quý khách đã thêm ${totalQuantity} sản phẩm vào giỏ hàng.`
      : "Giỏ hàng của Quý khách đang trống.";
  }

  if (cart.length === 0) {
    cartPageItems.innerHTML = `
      <div class="cart-page-empty">
        <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
        <a class="btn btn-primary" href="products.html">Tiếp tục mua sắm</a>
      </div>
    `;
    return;
  }

  cartPageItems.innerHTML = cart.map((item) => {
    const key = item.cartKey || getCartKey(item.id, item.size, item.color);
    const itemTotal = item.price * item.quantity;
    return `
      <article class="cart-page-item">
        <div class="cart-check"><input type="checkbox" checked aria-label="Chọn sản phẩm"></div>
        <div class="cart-page-product">
          <a class="cart-page-image" href="product-detail.html?id=${item.id}">
            <img src="${item.image}" alt="${item.name}">
          </a>
          <div class="cart-page-info">
            <h3><a href="product-detail.html?id=${item.id}">${item.name}</a></h3>
            <p>SKU: LUNA-${String(item.id).padStart(4, "0")}</p>
            <p>SIZE: ${item.size || "M"} | MÀU SẮC: ${item.color || "Pastel Pink"}</p>
          </div>
        </div>
        <div class="cart-page-price">
          ${item.oldPrice ? `<span>${formatMoney(item.oldPrice)}</span>` : ""}
          <strong>${formatMoney(item.price)}</strong>
        </div>
        <div class="cart-page-qty">
          <button onclick="changeQuantity('${key}', -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity('${key}', 1)">+</button>
        </div>
        <div class="cart-page-line-total">
          <strong>${formatMoney(itemTotal)}</strong>
        </div>
        <div class="cart-page-remove">
          <button onclick="removeFromCart('${key}')" aria-label="Xóa ${item.name}">⌫<span>Xóa</span></button>
        </div>
      </article>
    `;
  }).join("");
}

function getOrders() {
  return JSON.parse(localStorage.getItem("lunaOrders")) || [];
}

function saveOrders(orders) {
  localStorage.setItem("lunaOrders", JSON.stringify(orders));
}

function createOrderFromCart() {
  if (cart.length === 0) {
    showToast("Giỏ hàng đang trống.");
    return;
  }

  if (!currentUser) {
    showToast("Vui lòng đăng nhập trước khi thanh toán.");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 900);
    return;
  }

  if (currentUser.role === "admin") {
    showCenterNotice("Tài khoản admin chỉ dùng để quản trị, không thể đặt đơn hàng.", "error");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const order = {
    id: Date.now(),
    customerId: currentUser.id,
    customerName: `${currentUser.lastName} ${currentUser.firstName}`,
    email: currentUser.email,
    phone: currentUser.phone || "",
    address: currentUser.address || "",
    items: cart,
    subtotal,
    shipping,
    total: subtotal + shipping,
    status: "Chờ xử lý",
    createdAt: new Date().toISOString()
  };

  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  cart = [];
  saveCart();
  renderCart();
  renderCartPage();
  showCenterNotice("Đặt hàng thành công. Đơn hàng đã được gửi tới admin.", "success");
}

function requireAdminAccess() {
  if (!adminApp) return true;

  if (!currentUser || currentUser.role !== "admin") {
    adminApp.innerHTML = `
      <section class="admin-denied">
        <h1>Không có quyền truy cập</h1>
        <p>Chỉ tài khoản admin mới có thể vào trang quản trị.</p>
        <p><strong>Email:</strong> admin@lunafashion.com<br><strong>Mật khẩu:</strong> admin123</p>
        <a class="btn btn-primary" href="login.html">Đăng nhập admin</a>
      </section>
    `;
    return false;
  }

  return true;
}

function renderAdminStats() {
  if (!adminStats) return;

  const users = getUsers().filter((user) => user.role !== "admin");
  const orders = getOrders();
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  adminStats.innerHTML = `
    <article class="admin-stat-card stat-green">
      <strong>${users.length}</strong>
      <span>Người dùng</span>
      <small>Khách đã đăng kí</small>
      <em>More info</em>
    </article>
    <article class="admin-stat-card stat-sky">
      <strong>20</strong>
      <span>Bài viết</span>
      <small>Nội dung đang hiển thị</small>
      <em>More info</em>
    </article>
    <article class="admin-stat-card stat-orange">
      <strong>${products.length}</strong>
      <span>Sản phẩm</span>
      <small>Đang kinh doanh</small>
      <em>More info</em>
    </article>
    <article class="admin-stat-card stat-indigo">
      <strong>${orders.length}</strong>
      <span>Đơn hàng</span>
      <small>${formatMoney(revenue)}</small>
      <em>More info</em>
    </article>
  `;
}

function getHiddenAdminProducts() {
  const state = getProductAdminState();
  const customById = new Map(state.customProducts.map((product) => [product.id, product]));
  return state.hiddenProductIds
    .map((id) => customById.get(id) || defaultProducts.find((product) => product.id === id))
    .filter(Boolean);
}

function getFilteredAdminProducts() {
  const sourceProducts = products;
  const keyword = adminProductFilters.keyword.trim().toLowerCase();

  return sourceProducts.filter((product) => {
    const matchesCategory = adminProductFilters.category === "all" || product.category === adminProductFilters.category;
    const matchesPrice =
      adminProductFilters.price === "all" ||
      (adminProductFilters.price === "under250" && product.price < 250000) ||
      (adminProductFilters.price === "250to400" && product.price >= 250000 && product.price <= 400000) ||
      (adminProductFilters.price === "over400" && product.price > 400000);
    const matchesTag = adminProductFilters.tag === "all" || product.tag === adminProductFilters.tag;
    const matchesKeyword = !keyword || [
      product.name,
      product.category,
      product.tag,
      product.description,
      String(product.price)
    ].some((value) => String(value || "").toLowerCase().includes(keyword));

    return matchesCategory && matchesPrice && matchesTag && matchesKeyword;
  });
}

function renderAdminProducts() {
  if (!adminProductTable) return;

  const filteredProducts = getFilteredAdminProducts();

  adminProductTable.innerHTML = filteredProducts.length ? filteredProducts.map((product) => `
    <tr>
      <td><input type="checkbox" aria-label="Chọn ${product.name}"></td>
      <td><img src="${product.image}" alt="${product.name}"></td>
      <td><strong>${product.name}</strong><small>${product.description}</small></td>
      <td>${product.category}</td>
      <td>${formatMoney(product.price)}</td>
      <td>${product.tag}</td>
      <td><span class="admin-status-badge">Hoạt động</span></td>
      <td>
        <button type="button" onclick="editAdminProduct(${product.id})">Sửa</button>
        <button type="button" onclick="hideAdminProduct(${product.id})">Ẩn</button>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="8">Không tìm thấy sản phẩm phù hợp.</td></tr>`;
}

function renderAdminCustomers() {
  if (!adminCustomerTable) return;

  const keyword = adminCustomerKeyword.trim().toLowerCase();
  const users = getUsers()
    .filter((user) => user.role !== "admin")
    .filter((user) => {
      if (!keyword) return true;
      return [
        `${user.lastName || ""} ${user.firstName || ""}`.trim(),
        user.email,
        user.phone,
        user.address
      ].some((value) => String(value || "").toLowerCase().includes(keyword));
    });

  adminCustomerTable.innerHTML = users.length ? users.map((user, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <strong>${user.lastName} ${user.firstName}</strong>
        <small>${user.role === "admin" ? "Quản trị viên" : "Khách hàng"}</small>
      </td>
      <td>${user.email}</td>
      <td>${user.phone || "Chưa cập nhật"}</td>
      <td>${user.address || "Chưa cập nhật"}</td>
      <td>${new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
      <td><span class="admin-status-badge">${user.email ? "Activated" : "Not Activated"}</span></td>
      <td class="admin-customer-actions">
        <button type="button" class="admin-customer-action" onclick="viewAdminCustomer('${user.id}')">Xem</button>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="8">Chưa có khách hàng.</td></tr>`;
}

function applyAdminCustomerSearch() {
  adminCustomerKeyword = adminCustomerSearch?.value || "";
  renderAdminCustomers();
}

function resetAdminCustomerSearch() {
  adminCustomerKeyword = "";
  if (adminCustomerSearch) adminCustomerSearch.value = "";
  renderAdminCustomers();
}

function viewAdminCustomer(userId) {
  const user = getUsers().find((item) => String(item.id) === String(userId));
  if (!user) {
    showToast("Không tìm thấy tài khoản.");
    return;
  }

  showToast(`Tài khoản: ${user.lastName || ""} ${user.firstName || ""}`.trim());
}

function renderAdminOrders() {
  if (!adminOrderTable) return;

  const keyword = adminOrderFilters.keyword.trim().toLowerCase();
  const adminUserIds = new Set(getUsers().filter((user) => user.role === "admin").map((user) => user.id));
  const orders = getOrders().filter((order) => !adminUserIds.has(order.customerId)).filter((order) => {
    const createdDate = new Date(order.createdAt);
    const fromDate = adminOrderFilters.dateFrom ? new Date(`${adminOrderFilters.dateFrom}T00:00:00`) : null;
    const toDate = adminOrderFilters.dateTo ? new Date(`${adminOrderFilters.dateTo}T23:59:59`) : null;
    const normalizedStatus = String(order.status || "").toLowerCase();
    const statusMap = {
      pending: ["chờ", "pending"],
      confirmed: ["xác thực", "confirmed"],
      shipping: ["giao", "shipping"],
      done: ["đã giao", "done"],
      cancel: ["hủy", "cancel"]
    };
    const matchesStatus = adminOrderFilters.status === "all" ||
      (statusMap[adminOrderFilters.status] || []).some((value) => normalizedStatus.includes(value));
    const matchesDateFrom = !fromDate || createdDate >= fromDate;
    const matchesDateTo = !toDate || createdDate <= toDate;
    const matchesKeyword = !keyword || [
      order.id,
      order.customerName,
      order.email,
      order.status,
      String(order.total)
    ].some((value) => String(value || "").toLowerCase().includes(keyword));

    return matchesStatus && matchesDateFrom && matchesDateTo && matchesKeyword;
  });

  adminOrderTable.innerHTML = orders.length ? orders.map((order, index) => {
    const createdAt = new Date(order.createdAt);
    const productSummary = order.items?.length
      ? order.items.map((item) => `${item.name} [${item.quantity}]`).join(", ")
      : "Chưa có sản phẩm";

    return `
    <tr>
      <td>${index + 1}</td>
      <td><strong class="admin-order-code">${order.id}</strong></td>
      <td>${order.customerName || "Khách"}</td>
      <td>${productSummary}</td>
      <td>${formatMoney(order.total)}</td>
      <td>${createdAt.toLocaleTimeString("vi-VN")}<br>${createdAt.toLocaleDateString("vi-VN")}</td>
      <td><span class="order-state order-state-process">${order.status || "Đang chờ xử lý"}</span></td>
      <td class="admin-order-actions">
        <button type="button" title="Xác nhận">✓</button>
        <button type="button" title="Hủy">×</button>
      </td>
    </tr>
  `;
  }).join("") : `<tr><td colspan="8">Chưa có đơn hàng phù hợp.</td></tr>`;
}

function applyAdminOrderFilters() {
  adminOrderFilters.keyword = adminOrderSearch?.value || "";
  renderAdminOrders();
}

function applyAdminOrderDateFilter() {
  adminOrderFilters.dateFrom = adminOrderDateFrom?.value || "";
  adminOrderFilters.dateTo = adminOrderDateTo?.value || "";
  renderAdminOrders();
}

function resetAdminOrderFilters() {
  adminOrderFilters = {
    status: "all",
    dateFrom: "",
    dateTo: "",
    keyword: ""
  };
  if (adminOrderDateFrom) adminOrderDateFrom.value = "";
  if (adminOrderDateTo) adminOrderDateTo.value = "";
  if (adminOrderSearch) adminOrderSearch.value = "";
  adminOrderFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.orderFilter === "all");
  });
  renderAdminOrders();
}

function resetAdminProductForm() {
  if (!adminProductForm) return;
  adminProductForm.reset();
  adminProductForm.productId.value = "";
}

function openAdminProductForm() {
  if (!adminProductForm) return;
  resetAdminProductForm();
  if (adminProductModal) adminProductModal.hidden = false;
  adminProductForm.classList.add("show");
  adminProductForm.productName.focus();
}

function closeAdminProductForm() {
  if (!adminProductForm) return;
  adminProductForm.classList.remove("show");
  if (adminProductModal) adminProductModal.hidden = true;
  resetAdminProductForm();
}

function editAdminProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product || !adminProductForm) return;

  if (adminProductModal) adminProductModal.hidden = false;
  adminProductForm.classList.add("show");
  adminProductForm.productId.value = product.id;
  adminProductForm.productName.value = product.name;
  adminProductForm.productCategory.value = product.category;
  adminProductForm.productPrice.value = product.price;
  adminProductForm.productOldPrice.value = product.oldPrice || "";
  adminProductForm.productImage.value = product.image;
  adminProductForm.productTag.value = product.tag;
  adminProductForm.productDescription.value = product.description;
}

function upsertAdminProduct(product) {
  const state = getProductAdminState();
  const index = state.customProducts.findIndex((item) => item.id === product.id);

  if (index === -1) {
    state.customProducts.push(product);
  } else {
    state.customProducts[index] = product;
  }

  state.hiddenProductIds = state.hiddenProductIds.filter((id) => id !== product.id);
  saveProductAdminState(state);
  refreshProductsFromAdminState();
}

function hideAdminProduct(productId) {
  const state = getProductAdminState();
  if (!state.hiddenProductIds.includes(productId)) state.hiddenProductIds.push(productId);
  saveProductAdminState(state);
  refreshProductsFromAdminState();
  renderAdminProducts();
  renderAdminStats();
}

function restoreAdminProduct(productId) {
  const state = getProductAdminState();
  state.hiddenProductIds = state.hiddenProductIds.filter((id) => id !== productId);
  saveProductAdminState(state);
  refreshProductsFromAdminState();
  renderAdminProducts();
  renderAdminStats();
}

function applyAdminProductFilters() {
  adminProductFilters.category = adminFilterCategory?.value || "all";
  adminProductFilters.price = adminFilterPrice?.value || "all";
  adminProductFilters.tag = adminFilterTag?.value || "all";
  adminProductFilters.keyword = adminProductSearch?.value || "";
  renderAdminProducts();
}

function resetAdminProductFilters() {
  adminProductFilters = {
    category: "all",
    price: "all",
    tag: "all",
    keyword: ""
  };

  if (adminFilterCategory) adminFilterCategory.value = "all";
  if (adminFilterPrice) adminFilterPrice.value = "all";
  if (adminFilterTag) adminFilterTag.value = "all";
  if (adminProductSearch) adminProductSearch.value = "";
  renderAdminProducts();
}

function showAdminSection(sectionId = "adminDashboard") {
  const targetId = sectionId.replace("#", "");
  const targetPanel = document.getElementById(targetId) || document.getElementById("adminDashboard");

  adminPanels.forEach((panel) => {
    panel.classList.toggle("active", panel === targetPanel);
  });

  adminSectionLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${targetPanel.id}`);
  });
}

function initAdminSections() {
  if (!adminPanels.length) return;

  adminSectionTriggers.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute("href");
      showAdminSection(sectionId);
      history.replaceState(null, "", sectionId);
    });
  });

  showAdminSection(window.location.hash || "adminDashboard");
}

function initAdminPage() {
  if (!adminApp || !requireAdminAccess()) return;
  const adminTodayLabel = document.getElementById("adminTodayLabel");
  if (adminTodayLabel) {
    adminTodayLabel.textContent = new Date().toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }

  renderAdminStats();
  renderAdminProducts();
  renderAdminCustomers();
  renderAdminOrders();
  initAdminSections();

  adminApplyProductFilters?.addEventListener("click", applyAdminProductFilters);
  adminSearchProducts?.addEventListener("click", applyAdminProductFilters);
  adminClearProductFilters?.addEventListener("click", resetAdminProductFilters);
  adminProductSearch?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyAdminProductFilters();
    }
  });
  adminSearchCustomers?.addEventListener("click", applyAdminCustomerSearch);
  adminClearCustomerSearch?.addEventListener("click", resetAdminCustomerSearch);
  adminCustomerSearch?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyAdminCustomerSearch();
    }
  });
  adminOrderFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      adminOrderFilters.status = button.dataset.orderFilter || "all";
      adminOrderFilterButtons.forEach((item) => item.classList.toggle("active", item === button));
      renderAdminOrders();
    });
  });
  adminSearchOrders?.addEventListener("click", applyAdminOrderFilters);
  adminFilterOrderDate?.addEventListener("click", applyAdminOrderDateFilter);
  adminClearOrderFilters?.addEventListener("click", resetAdminOrderFilters);
  adminOrderSearch?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyAdminOrderFilters();
    }
  });
  [adminOrderDateFrom, adminOrderDateTo].forEach((input) => {
    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        applyAdminOrderDateFilter();
      }
    });
  });

  if (adminProductForm) {
    adminProductForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const id = Number(adminProductForm.productId.value) || Date.now();
      const product = {
        id,
        name: adminProductForm.productName.value.trim(),
        category: adminProductForm.productCategory.value,
        price: Number(adminProductForm.productPrice.value),
        oldPrice: Number(adminProductForm.productOldPrice.value) || 0,
        image: adminProductForm.productImage.value.trim() || "assets/product-1.jpg",
        tag: adminProductForm.productTag.value.trim() || "New",
        description: adminProductForm.productDescription.value.trim()
      };

      if (!product.name || !product.price || !product.description) {
        showToast("Vui lòng nhập đầy đủ tên, giá và mô tả sản phẩm.");
        return;
      }

      upsertAdminProduct(product);
      closeAdminProductForm();
      renderAdminStats();
      renderAdminProducts();
      showToast("Đã lưu sản phẩm.");
    });
  }
}

function openCart() {
  cartDrawer.classList.add("show");
  overlay.classList.add("show");
}

function closeCart() {
  cartDrawer.classList.remove("show");
  overlay.classList.remove("show");
}

if (cartOpenBtn) {
  cartOpenBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}
if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
if (overlay) {
  overlay.addEventListener("click", () => {
    closeCart();
    closeQuickView();
  });
}

function openQuickView(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product || !quickViewBody || !quickModal) return;

  quickViewBody.innerHTML = `
    <div class="quick-view">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="price-row">
          <span class="price">${formatMoney(product.price)}</span>
          ${product.oldPrice ? `<span class="old-price">${formatMoney(product.oldPrice)}</span>` : ""}
        </div>
        <p>${product.description}</p>
        <button class="btn btn-primary" onclick="addToCart(${product.id}); closeQuickView(); openCart();">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  `;

  quickModal.classList.add("show");
}

function renderProductDetail() {
  if (!detailTitle) return;

  const id = Number(params.get("id")) || 1;
  const product = products.find((item) => item.id === id) || products[0];
  const specs = detailSpecsMap[product.category] || detailSpecsMap["Đầm"];
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  document.title = `${product.name} - Luna Fashion`;
  detailTitle.textContent = product.name;
  detailCategory.textContent = product.category;
  if (detailRouteName) detailRouteName.textContent = product.name;
  detailImage.src = product.image;
  detailImage.alt = product.name;
  detailPrice.textContent = formatMoney(product.price);
  detailOldPrice.textContent = product.oldPrice ? formatMoney(product.oldPrice) : "";
  detailOldPrice.style.display = product.oldPrice ? "inline" : "none";
  detailDescription.textContent = product.description;
  detailSpecs.innerHTML = specs.map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`).join("");

  const discountBadge = document.getElementById("detailDiscount");
  if (discountBadge) {
    discountBadge.textContent = discount ? `Tiết kiệm ${discount}%` : "Hàng mới";
  }

  document.querySelectorAll(".vertical-thumbs button").forEach((button, index) => {
    const image = index === 0 ? product.image : button.dataset.image;
    button.dataset.image = image;
    const thumbImage = button.querySelector("img");
    if (index === 0 && thumbImage) thumbImage.src = product.image;

    button.addEventListener("click", () => {
      document.querySelectorAll(".vertical-thumbs button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      detailImage.src = button.dataset.image;
    });
  });

  if (colorOptions) {
    colorOptions.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        colorOptions.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }

  if (sizeOptions) {
    sizeOptions.querySelectorAll("button:not(:disabled)").forEach((button) => {
      button.addEventListener("click", () => {
        sizeOptions.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }

  detailAddBtn.addEventListener("click", () => {
    const selectedSize = sizeOptions?.querySelector("button.active")?.dataset.size;
    const selectedColor = colorOptions?.querySelector("button.active")?.dataset.color || "Pastel Pink";
    if (!selectedSize) {
      showToast("Vui lòng chọn size trước khi thêm vào giỏ.");
      return;
    }

    addToCart(product.id, { size: selectedSize, color: selectedColor });
    window.location.href = "cart.html";
  });

  if (relatedGrid) {
    const relatedProducts = products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);

    relatedGrid.innerHTML = relatedProducts.map((item) => `
      <article class="product-card">
        <a class="product-image" href="product-detail.html?id=${item.id}">
          <span class="product-tag">${item.tag}</span>
          <img src="${item.image}" alt="${item.name}">
        </a>
        <div class="product-info">
          <span class="product-category">${item.category}</span>
          <h3><a href="product-detail.html?id=${item.id}">${item.name}</a></h3>
          <div class="price-row">
            <span class="price">${formatMoney(item.price)}</span>
            ${item.oldPrice ? `<span class="old-price">${formatMoney(item.oldPrice)}</span>` : ""}
          </div>
          <div class="product-actions">
            <button class="action-btn add-btn" onclick="addToCart(${item.id})">🛒 Thêm vào giỏ</button>
          </div>
        </div>
      </article>
    `).join("");
  }
}

function closeQuickView() {
  if (!quickModal) return;
  quickModal.classList.remove("show");
}

if (quickCloseBtn) quickCloseBtn.addEventListener("click", closeQuickView);

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    formMessage.className = "form-message";

    if (!fullName || !email || !message) {
      formMessage.textContent = "Vui lòng nhập đầy đủ họ tên, email và nội dung.";
      formMessage.classList.add("error");
      return;
    }

    if (!email.includes("@")) {
      formMessage.textContent = "Email chưa đúng định dạng.";
      formMessage.classList.add("error");
      return;
    }

    formMessage.textContent = "Gửi liên hệ thành công. Luna Fashion sẽ phản hồi bạn sớm!";
    formMessage.classList.add("success");
    contactForm.reset();
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Giỏ hàng đang trống.");
      return;
    }

    showToast("Chức năng thanh toán đang được phát triển.");
  });
}

if (checkoutMainBtn) {
  checkoutMainBtn.addEventListener("click", createOrderFromCart);
}

if (adminLogoutLink) {
  adminLogoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("lunaCurrentUser");
    currentUser = null;
    window.location.href = "login.html";
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("show");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("show");
    });
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeQuickView();
  }
});

seedAdminAccount();
normalizeCurrentUserRole();
guardAdminWebsiteAccess();
syncCategoryControls(currentFilter);
updateLoginLinks();
initHeroBanner();
renderProducts();
renderProductDetail();
renderCart();
renderCartPage();
initAdminPage();
