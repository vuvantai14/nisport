# Luna Fashion Backend Design

## Mục tiêu

Tài liệu này mô tả thiết kế backend thật cho website Luna Fashion. Frontend hiện tại là HTML/CSS/JavaScript ES6 Module và đang lưu dữ liệu bằng LocalStorage. Backend Java sẽ thay phần lưu trữ tạm này bằng API, database, xác thực tài khoản và quản trị dữ liệu thật.

Website sau khi mở rộng là shop bán quần áo nam, nữ và unisex. Vì vậy thiết kế backend cần tách rõ:

- `gender`: sản phẩm dành cho nam, nữ hoặc unisex.
- `category`: loại sản phẩm như áo, quần, váy, chân váy, hoodie, áo khoác, phụ kiện.

Mục tiêu chính:

- Lưu người dùng, sản phẩm, biến thể sản phẩm, ảnh sản phẩm, giỏ hàng, đơn hàng và trạng thái đơn hàng trong PostgreSQL.
- Cung cấp REST API cho frontend hiện tại.
- Tách quyền customer và admin.
- Cho phép admin quản lý sản phẩm, khách hàng, đơn hàng.
- Chuẩn bị cấu trúc đủ rõ để mở rộng thanh toán, upload ảnh, voucher và báo cáo.

## Công nghệ đề xuất

- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security
- JWT Authentication
- PostgreSQL
- Maven
- Bean Validation
- Lombok nếu cần
- Flyway hoặc Liquibase
- Swagger/OpenAPI

## Kiến trúc tổng quan

Frontend hiện tại gọi API qua `fetch`.

```text
html/css/js frontend
        |
        | HTTP REST API
        v
Spring Boot Backend
        |
        | JPA Repository
        v
PostgreSQL Database
```

Backend nên tổ chức theo module nghiệp vụ:

```text
backend/
|-- src/main/java/com/lunafashion/
|   |-- LunaFashionApplication.java
|   |-- config/
|   |-- security/
|   |-- common/
|   |-- auth/
|   |-- user/
|   |-- product/
|   |-- cart/
|   |-- order/
|   |-- admin/
|   |-- upload/
|   `-- dashboard/
|-- src/main/resources/
|   |-- application.yml
|   `-- db/migration/
`-- pom.xml
```

## Module backend

### common

Chứa các phần dùng chung:

- Response DTO chuẩn.
- Exception handler.
- Error code.
- Base entity.
- Pagination helper.
- Mapper helper nếu cần.

### auth

Quản lý đăng ký, đăng nhập và token:

- Đăng ký tài khoản customer.
- Đăng nhập customer/admin.
- Mã hóa mật khẩu bằng BCrypt.
- Sinh JWT access token.
- Kiểm tra quyền truy cập API.

### user

Quản lý thông tin người dùng:

- Xem thông tin tài khoản.
- Cập nhật họ tên, số điện thoại, địa chỉ.
- Admin xem danh sách khách hàng.
- Admin tìm kiếm khách hàng.

### product

Quản lý sản phẩm:

- Danh sách sản phẩm.
- Chi tiết sản phẩm.
- Tìm kiếm sản phẩm.
- Lọc theo `gender`, `categoryId`, giá, màu, tag.
- Sản phẩm liên quan.
- Admin thêm, sửa, ẩn/xóa mềm sản phẩm.
- Quản lý nhiều ảnh cho một sản phẩm.
- Quản lý biến thể size/màu/SKU/tồn kho.

### cart

Quản lý giỏ hàng:

- Lấy giỏ hàng của người dùng.
- Thêm biến thể sản phẩm vào giỏ.
- Tăng/giảm số lượng.
- Xóa sản phẩm khỏi giỏ.
- Xóa toàn bộ giỏ sau khi đặt hàng thành công.
- Đồng bộ giỏ hàng giữa nhiều thiết bị khi đã đăng nhập.

Giai đoạn đầu có thể giữ cart ở frontend và chỉ tạo order khi thanh toán. Giai đoạn tốt hơn là lưu cart trong PostgreSQL để người dùng đăng nhập ở thiết bị khác vẫn thấy giỏ hàng.

### order

Quản lý đơn hàng:

- Tạo đơn hàng từ giỏ hàng.
- Lưu thông tin người nhận.
- Lưu snapshot sản phẩm tại thời điểm mua.
- Tính tạm tính, phí vận chuyển, giảm giá, tổng tiền.
- Kiểm tra tồn kho theo `product_variants`.
- Trừ tồn kho sau khi tạo đơn thành công.
- Người dùng xem danh sách đơn hàng của mình.
- Người dùng xem chi tiết đơn hàng.

### admin

Các API dành riêng cho admin:

- Dashboard thống kê.
- Quản lý sản phẩm.
- Quản lý khách hàng.
- Quản lý đơn hàng.
- Lọc/tìm đơn hàng.
- Cập nhật trạng thái đơn hàng.

### upload

Quản lý ảnh sản phẩm:

- Upload ảnh sản phẩm.
- Lưu file vào thư mục server hoặc dịch vụ storage.
- Trả về URL ảnh để lưu vào `product_images`.

Giai đoạn đầu có thể dùng đường dẫn ảnh trong `assets/` như hiện tại. Khi backend ổn định, có thể thêm upload thật.

### dashboard

Tổng hợp dữ liệu thống kê:

- Tổng doanh thu.
- Tổng đơn hàng.
- Đơn chờ xử lý.
- Đơn đã xác nhận.
- Đơn đang giao.
- Đơn hoàn thành.
- Đơn đã hủy.
- Sản phẩm bán chạy.
- Doanh thu theo ngày/tháng/năm.

## Database design

### users

Lưu tài khoản khách hàng và admin.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| first_name | varchar | Tên |
| last_name | varchar | Họ |
| email | varchar | Unique |
| password_hash | varchar | Mật khẩu đã mã hóa BCrypt |
| phone | varchar | Số điện thoại |
| address | text | Địa chỉ |
| role | varchar | `CUSTOMER`, `ADMIN` |
| status | varchar | `ACTIVE`, `LOCKED` |
| created_at | timestamp | Ngày tạo |
| updated_at | timestamp | Ngày cập nhật |

### categories

Lưu loại sản phẩm. Không dùng bảng này để lưu gioi tinh san pham.

Ví dụ category:

- Áo
- Quần
- Váy
- Chân váy
- Hoodie
- Áo khoác
- Phụ kiện

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| name | varchar | Tên loại sản phẩm |
| slug | varchar | Unique |
| description | text | Mô tả |
| active | boolean | Còn dùng hay không |

### products

Lưu thông tin chính của sản phẩm.

`gender` dùng để phân loại sản phẩm dành cho nam, nữ hoặc unisex:

- `MALE`
- `FEMALE`
- `UNISEX`

Tồn kho chính không đặt ở bảng `products`. Tồn kho sản phẩm được tính từ tổng `stock` của các dòng trong `product_variants`.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| name | varchar | Tên sản phẩm |
| gender | varchar | `MALE`, `FEMALE`, `UNISEX` |
| category_id | bigint | FK categories |
| price | numeric | Giá bán mặc định |
| old_price | numeric | Giá cũ |
| description | text | Mô tả |
| tag | varchar | `Sale`, `Hot`, `New` |
| status | varchar | `SELLING`, `OUT_OF_STOCK`, `STOPPED`, `HIDDEN` |
| created_at | timestamp | Ngày tạo |
| updated_at | timestamp | Ngày cập nhật |

### product_variants

Quản lý size, màu, SKU và tồn kho theo từng biến thể sản phẩm. Đây là nơi lưu tồn kho thật.

Ví dụ: một áo hoodie unisex có màu Black size M tồn kho 12, màu Beige size L tồn kho 6.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| product_id | bigint | FK products |
| size | varchar | S, M, L, XL, XXL |
| color | varchar | Black, Beige, Navy... |
| stock | int | Tồn kho của biến thể |
| sku | varchar | Mã biến thể, unique nếu cần |
| price | numeric | Giá riêng của biến thể nếu cần, nullable |

### product_images

Lưu nhiều ảnh cho một sản phẩm. Không chỉ lưu một `image_url` trong bảng `products`.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| product_id | bigint | FK products |
| image_url | varchar | Đường dẫn ảnh |
| is_thumbnail | boolean | Ảnh đại diện |
| sort_order | int | Thứ tự hiển thị nếu cần |

### carts

Lưu giỏ hàng của user.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| user_id | bigint | FK users, unique |
| created_at | timestamp | Ngày tạo |
| updated_at | timestamp | Ngày cập nhật |

### cart_items

Lưu từng dòng sản phẩm trong giỏ. Vì đã có `variant_id`, không cần lưu trực tiếp size và color trong `cart_items`; size và color lấy từ `product_variants`.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| cart_id | bigint | FK carts |
| product_id | bigint | FK products |
| variant_id | bigint | FK product_variants |
| quantity | int | Số lượng |
| unit_price | numeric | Giá tại thời điểm thêm vào giỏ |

### orders

Lưu đơn hàng.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| code | varchar | Mã đơn như DH0001 |
| user_id | bigint | FK users, nullable nếu guest checkout |
| customer_name | varchar | Tên người nhận |
| email | varchar | Email |
| phone | varchar | SĐT |
| address | text | Địa chỉ giao hàng |
| subtotal | numeric | Tạm tính |
| shipping_fee | numeric | Phí vận chuyển |
| discount | numeric | Giảm giá |
| total | numeric | Tổng tiền |
| payment_method | varchar | COD giai đoạn đầu |
| payment_status | varchar | `UNPAID`, `PAID`, `REFUNDED` |
| status | varchar | `PENDING`, `CONFIRMED`, `SHIPPING`, `COMPLETED`, `CANCELLED` |
| created_at | timestamp | Ngày đặt |
| updated_at | timestamp | Ngày cập nhật |

### order_items

Lưu sản phẩm trong đơn hàng. Order item cần lưu snapshot tại thời điểm mua để đơn hàng cũ không bị thay đổi khi admin sửa tên, ảnh, giá, size hoặc màu của sản phẩm sau này.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| order_id | bigint | FK orders |
| product_id | bigint | FK products |
| variant_id | bigint | FK product_variants |
| product_name | varchar | Snapshot tên sản phẩm |
| image_url | varchar | Snapshot ảnh |
| size | varchar | Snapshot size |
| color | varchar | Snapshot màu |
| unit_price | numeric | Snapshot giá tại thời điểm đặt |
| quantity | int | Số lượng |
| line_total | numeric | Thành tiền |

### contacts

Lưu form liên hệ nếu muốn thay LocalStorage/alert bằng backend.

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | bigint | Primary key |
| full_name | varchar | Họ tên |
| email | varchar | Email |
| message | text | Nội dung |
| status | varchar | `NEW`, `READ`, `REPLIED` |
| created_at | timestamp | Ngày gửi |

## Quan hệ dữ liệu chính

```text
users 1-1 carts
users 1-N orders
categories 1-N products
products 1-N product_variants
products 1-N product_images
carts 1-N cart_items
product_variants 1-N cart_items
orders 1-N order_items
product_variants 1-N order_items
```

Ghi chú:

- `cart_items` vẫn có `product_id` để query nhanh, nhưng biến thể mua thật nằm ở `variant_id`.
- `order_items` giữ `product_id` và `variant_id` để truy vết, đồng thời giữ snapshot để bảo toàn lịch sử đơn hàng.

## API design

Base URL đề xuất:

```text
/api/v1
```

### Auth API

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

Login response:

```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": 1,
    "firstName": "Admin",
    "lastName": "Luna",
    "email": "admin@lunafashion.com",
    "role": "ADMIN"
  }
}
```

### Product API

```http
GET    /api/v1/products
GET    /api/v1/products/{id}
GET    /api/v1/products/{id}/related
GET    /api/v1/categories
```

Query cho danh sách sản phẩm:

```text
GET /api/v1/products?gender=MALE&categoryId=1&keyword=ao&page=0&size=8&minPrice=0&maxPrice=500000&color=Black
```

Ý nghĩa filter:

- `gender=MALE`: lọc sản phẩm nam.
- `gender=FEMALE`: lọc sản phẩm nữ.
- `gender=UNISEX`: lọc sản phẩm unisex.
- `categoryId=1`: lọc theo loại sản phẩm, ví dụ Áo.
- `keyword=ao`: tìm theo tên/mô tả/tag.
- `color=Black`: lọc theo màu trong `product_variants`.

Response sản phẩm nên trả kèm ảnh thumbnail và trạng thái tồn kho tính từ variants.

### Cart API

```http
GET    /api/v1/cart
POST   /api/v1/cart/items
PATCH  /api/v1/cart/items/{itemId}
DELETE /api/v1/cart/items/{itemId}
DELETE /api/v1/cart
```

Ví dụ thêm vào giỏ:

```json
{
  "productId": 10,
  "variantId": 35,
  "quantity": 1
}
```

Backend kiểm tra `variantId`, lấy giá từ database, không tin giá frontend gửi lên.

### Order API

```http
POST /api/v1/orders
GET  /api/v1/orders/my
GET  /api/v1/orders/{id}
```

### User API

```http
GET   /api/v1/users/me
PATCH /api/v1/users/me
```

### Contact API

```http
POST /api/v1/contacts
```

### Admin API

```http
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/products
POST   /api/v1/admin/products
PUT    /api/v1/admin/products/{id}
DELETE /api/v1/admin/products/{id}

GET    /api/v1/admin/customers
GET    /api/v1/admin/orders
GET    /api/v1/admin/orders/{id}
PATCH  /api/v1/admin/orders/{id}/status
```

Ví dụ cập nhật trạng thái đơn:

```json
{
  "status": "CONFIRMED"
}
```

## Mapping LocalStorage hiện tại sang backend

| LocalStorage key | Backend thay thế |
|---|---|
| `lunaUsers` | Bảng `users` |
| `lunaCurrentUser` | JWT token + `/auth/me` |
| `lunaCart` | Bảng `carts`, `cart_items` |
| `lunaOrders` | Bảng `orders`, `order_items` |
| `lunaProductAdminState` | Bảng `products`, `product_variants`, `product_images`, `categories` |

## Luồng nghiệp vụ chính

### Đăng ký

1. Frontend gửi họ, tên, email, password.
2. Backend validate email, password.
3. Backend kiểm tra email đã tồn tại.
4. Backend mã hóa password bằng BCrypt.
5. Backend tạo user role `CUSTOMER`.

### Đăng nhập

1. Frontend gửi email, password.
2. Backend kiểm tra tài khoản.
3. Backend sinh JWT.
4. Frontend lưu token.
5. Các request cần đăng nhập gửi header:

```http
Authorization: Bearer <token>
```

### Xem sản phẩm

1. Frontend gọi `/products`.
2. Backend lọc theo `gender`, `categoryId`, giá, màu, keyword nếu có.
3. Backend trả danh sách có phân trang.
4. Frontend render product card.

### Đặt hàng

1. User thêm biến thể sản phẩm vào cart.
2. User bấm thanh toán.
3. Frontend gửi thông tin người nhận và yêu cầu tạo đơn.
4. Backend lấy cart từ database.
5. Backend lấy giá sản phẩm/variant từ database, không tin giá từ frontend.
6. Backend kiểm tra tồn kho theo `product_variants`.
7. Backend tạo `orders` và `order_items`.
8. Backend lưu snapshot sản phẩm vào `order_items`.
9. Backend trừ tồn kho trong `product_variants`.
10. Backend clear cart sau khi đặt hàng thành công.
11. Backend trả mã đơn.

### Admin cập nhật đơn hàng

1. Admin đăng nhập.
2. Frontend gửi `PATCH /admin/orders/{id}/status`.
3. Backend kiểm tra role `ADMIN`.
4. Backend cập nhật trạng thái theo bộ trạng thái hợp lệ.
5. Frontend render lại danh sách đơn hàng.

## Bảo mật

- Password phải mã hóa bằng BCrypt, không lưu plaintext.
- API admin phải yêu cầu role `ADMIN`.
- User chỉ được xem đơn hàng của chính mình.
- Backend không tin giá tiền từ frontend.
- Khi tạo order, backend phải lấy giá từ database.
- CORS chỉ mở cho frontend hợp lệ.
- Validate dữ liệu đầu vào bằng Bean Validation.
- Không cho user xem đơn hàng của user khác.
- Upload ảnh cần giới hạn loại file và dung lượng.
- JWT secret phải lấy từ biến môi trường khi triển khai thật.

## Thứ tự triển khai đề xuất

### Giai đoạn 1: Khởi tạo backend

- Tạo project Spring Boot.
- Cấu hình PostgreSQL.
- Tạo entity `User`, `Category`, `Product`, `ProductVariant`, `ProductImage`, `Cart`, `CartItem`, `Order`, `OrderItem`.
- Tạo migration bằng Flyway hoặc Liquibase.
- Seed admin mặc định:
  - Email: `admin@lunafashion.com`
  - Mật khẩu: `123456`

### Giai đoạn 2: Auth

- API register.
- API login.
- JWT security.
- API `/auth/me`.
- Frontend đổi login/register từ LocalStorage sang fetch API.

### Giai đoạn 3: Product

- API danh sách sản phẩm.
- API chi tiết sản phẩm.
- API lọc/tìm kiếm/phân trang theo `gender`, `categoryId`, giá, màu.
- API ảnh sản phẩm.
- API biến thể size/màu/tồn kho.
- Frontend đổi `productSeed` sang gọi API.

### Giai đoạn 4: Cart và Order

- API cart.
- API tạo đơn hàng.
- API đơn hàng của tôi.
- Kiểm tra tồn kho theo `product_variants`.
- Trừ tồn kho sau khi đặt hàng.
- Clear cart sau khi đặt hàng thành công.
- Frontend đổi cart/order từ LocalStorage sang API.

### Giai đoạn 5: Admin

- API quản lý sản phẩm.
- API quản lý biến thể sản phẩm.
- API quản lý ảnh sản phẩm.
- API quản lý khách hàng.
- API quản lý đơn hàng.
- API dashboard.
- Frontend admin dùng API thật.

### Giai đoạn 6: Hoàn thiện

- Upload ảnh sản phẩm.
- Swagger/OpenAPI để test API.
- Logging.
- Xử lý lỗi thống nhất.
- Viết README backend.
- Kiểm thử API bằng Postman hoặc Swagger UI.

## Cấu hình môi trường đề xuất

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/luna_fashion
    username: postgres
    password: your_password
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        format_sql: true

jwt:
  secret: change-this-secret
  expiration-minutes: 1440
```

## Ghi chú tích hợp frontend

Frontend hiện đang nằm trong thư mục `html/`, `css/`, `js/`. Khi có backend, có hai hướng:

1. Giữ frontend tĩnh riêng, chạy bằng Live Server, gọi API `http://localhost:8080/api/v1`.
2. Đưa frontend vào `src/main/resources/static` để Spring Boot phục vụ trực tiếp.

Giai đoạn đầu nên chọn hướng 1 để ít thay đổi. Sau khi API ổn định mới quyết định có gom vào Spring Boot hay không.

## Quy ước trạng thái

### Product status

```text
SELLING
OUT_OF_STOCK
STOPPED
HIDDEN
```

### Order status

```text
PENDING
CONFIRMED
SHIPPING
COMPLETED
CANCELLED
```

### Payment status

```text
UNPAID
PAID
REFUNDED
```

### Product gender

```text
MALE
FEMALE
UNISEX
```

## Việc cần quyết định trước khi code

- Giữ frontend tĩnh riêng hay phục vụ qua Spring Boot.
- Cart có cần lưu database ngay từ đầu hay chỉ tạo order từ frontend cart trong giai đoạn đầu.
- Ảnh sản phẩm lưu local server hay dùng dịch vụ storage.
- Dùng Flyway hay Liquibase.
- Có cần Swagger UI trong môi trường dev không.
