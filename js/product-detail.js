import { formatMoney, initCommonLayout, showToast } from "./common.js";
import { addToCart, initCartControls } from "./cart.js";
import {
  genderLabels,
  getProductById,
  getProductColors,
  getProductSizes,
  handleProductImageError,
  products,
  refreshProductsFromAdminState
} from "./products.js";

const detailSpecsMap = {
  "Áo bóng đá": [
    ["Chất liệu", "Thun lạnh thể thao, thoáng khí"],
    ["Phom dáng", "Regular fit, dễ vận động"],
    ["Tính năng", "Nhanh khô, nhẹ, hạn chế bám mồ hôi"],
    ["Phù hợp", "Thi đấu, tập luyện, cổ vũ"],
    ["Bảo quản", "Giặt mặt trái, không sấy nhiệt cao"]
  ],
  "Quần bóng đá": [
    ["Chất liệu", "Poly thể thao nhẹ"],
    ["Phom dáng", "Lưng thun, dây rút chắc"],
    ["Tính năng", "Co giãn, thoát mồ hôi"],
    ["Phù hợp", "Sân 5, sân 7, tập luyện"],
    ["Bảo quản", "Giặt máy chế độ nhẹ"]
  ],
  "Bộ đồ bóng đá": [
    ["Bao gồm", "Áo thi đấu và quần đồng bộ"],
    ["Chất liệu", "Thun lạnh thể thao"],
    ["Tính năng", "Dễ in tên số, nhanh khô"],
    ["Phù hợp", "Đội bóng, nhóm bạn, giải phong trào"],
    ["Bảo quản", "Không dùng chất tẩy mạnh"]
  ],
  "Đồ tập bóng đá": [
    ["Chất liệu", "Vải thể thao co giãn"],
    ["Phom dáng", "Gọn, linh hoạt khi vận động"],
    ["Tính năng", "Hỗ trợ chạy, khởi động, tập thể lực"],
    ["Phù hợp", "Training, gym, di chuyển đến sân"],
    ["Bảo quản", "Phơi nơi thoáng mát"]
  ],
  "Phụ kiện": [
    ["Ứng dụng", "Hỗ trợ thi đấu và tập luyện"],
    ["Kích thước", "Tùy mẫu sản phẩm"],
    ["Tính năng", "Gọn nhẹ, dễ mang ra sân"],
    ["Phù hợp", "Cầu thủ phong trào, đội bóng, cổ động viên"],
    ["Bảo quản", "Giữ khô ráo sau khi sử dụng"]
  ]
};

function bindProductImage(image, productId) {
  image?.addEventListener("error", () => handleProductImageError(image, productId));
}

export function renderRelatedProducts(product, relatedGrid) {
  const relatedProducts = products
    .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
    .slice(0, 4);

  relatedGrid.innerHTML = relatedProducts.map((item) => `
    <article class="product-card">
      <a class="product-image" href="product-detail.html?id=${item.id}">
        <span class="product-tag">${item.tagLabel || item.tag}</span>
        <img data-product-img data-product-id="${item.id}" src="${item.image}" alt="${item.name}">
      </a>
      <div class="product-info">
        <span class="product-category">${genderLabels[item.gender]} / ${item.categoryName}</span>
        <h3><a href="product-detail.html?id=${item.id}">${item.name}</a></h3>
        <div class="price-row">
          <span class="price">${formatMoney(item.price)}</span>
          ${item.oldPrice ? `<span class="old-price">${formatMoney(item.oldPrice)}</span>` : ""}
        </div>
        <div class="product-actions">
          <button class="action-btn add-btn" onclick="addToCart(${item.id})">Thêm vào giỏ</button>
        </div>
      </div>
    </article>
  `).join("");
  relatedGrid.querySelectorAll("[data-product-img]").forEach((image) => bindProductImage(image, image.dataset.productId));
}

export function renderProductDetail() {
  const detailTitle = document.getElementById("detailTitle");
  if (!detailTitle) return;

  refreshProductsFromAdminState();
  const params = new URLSearchParams(window.location.search);
  const id = Nữmber(params.get("id")) || 1;
  const product = getProductById(id) || products[0];
  const specs = detailSpecsMap[product.categoryName] || detailSpecsMap["Áo bóng đá"];
  const detailCategory = document.getElementById("detailCategory");
  const detailImage = document.getElementById("detailImage");
  const detailPrice = document.getElementById("detailPrice");
  const detailOldPrice = document.getElementById("detailOldPrice");
  const detailDescription = document.getElementById("detailDescription");
  const detailSpecs = document.getElementById("detailSpecs");
  const detailRouteName = document.getElementById("detailRouteName");
  const discountBadge = document.getElementById("detailDiscount");
  const colorOptions = document.getElementById("colorOptions");
  const sizeOptions = document.getElementById("sizeOptions");
  const detailAddBtn = document.getElementById("detailAddBtn");
  const relatedGrid = document.getElementById("relatedGrid");
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  document.title = `${product.name} - Ni Sport`;
  detailTitle.textContent = product.name;
  if (detailCategory) detailCategory.textContent = `${genderLabels[product.gender]} / ${product.categoryName}`;
  if (detailRouteName) detailRouteName.textContent = product.name;
  if (detailImage) {
    detailImage.src = product.image;
    detailImage.alt = product.name;
    bindProductImage(detailImage, product.id);
  }
  if (detailPrice) detailPrice.textContent = formatMoney(product.price);
  if (detailOldPrice) {
    detailOldPrice.textContent = product.oldPrice ? formatMoney(product.oldPrice) : "";
    detailOldPrice.style.display = product.oldPrice ? "inline" : "none";
  }
  if (detailDescription) detailDescription.textContent = product.description;
  if (detailSpecs) {
    detailSpecs.innerHTML = specs.map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`).join("");
  }
  if (discountBadge) discountBadge.textContent = discount ? `Tiết kiệm ${discount}%` : "Hàng mới";

  const colors = getProductColors(product);
  if (colorOptions) {
    colorOptions.innerHTML = colors.map((color, index) => `
      <button class="${index === 0 ? "active" : ""}" type="button" data-color="${color}">
        <img data-product-img data-product-id="${product.id}" src="${product.image}" alt="${color}">
      </button>
    `).join("");
    colorOptions.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        colorOptions.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
    colorOptions.querySelectorAll("[data-product-img]").forEach((image) => bindProductImage(image, product.id));
  }

  const sizes = getProductSizes(product);
  if (sizeOptions) {
    sizeOptions.innerHTML = sizes.map((size, index) => `
      <button class="${index === 0 ? "active" : ""}" type="button" data-size="${size}">${size}</button>
    `).join("");
    sizeOptions.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        sizeOptions.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }

  detailAddBtn?.addEventListener("click", () => {
    const selectedSize = sizeOptions?.querySelector("button.active")?.dataset.size;
    const selectedColor = colorOptions?.querySelector("button.active")?.dataset.color || "Black";
    if (!selectedSize) {
      showToast("Vui lòng chọn size trước khi thêm vào giỏ.");
      return;
    }
    addToCart(product.id, { size: selectedSize, color: selectedColor });
    window.location.href = "cart.html";
  });

  if (relatedGrid) renderRelatedProducts(product, relatedGrid);
}

export function initProductDetailPage() {
  initCommonLayout();
  initCartControls();
  renderProductDetail();
}

if (document.getElementById("detailTitle")) {
  initProductDetailPage();
}
