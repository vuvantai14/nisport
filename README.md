﻿# Luna Fashion

## Giới thiệu dự án

Luna Fashion la website ban thoi trang nam va nu dang front-end tinh. Du an mo phong mot cua hang online voi cac luong chinh nhu xem san pham, loc/tim kiem, them vao gio hang, dat hang, quan ly tai khoan nguoi dung va trang quan tri cho admin.

Website phù hợp cho đồ án HTML/CSS/JavaScript, demo giao diện thương mại điện tử hoặc làm nền để phát triển tiếp với backend thật.

## Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript ES6 Module
- LocalStorage để lưu người dùng, giỏ hàng, đơn hàng và trạng thái quản trị sản phẩm
- Responsive UI cho desktop và mobile
- Git/GitHub nếu dùng để quản lý mã nguồn

## Cấu trúc thư mục

```text
Luna-Fashion/
|-- html/                   # Toàn bộ file HTML của website
|   |-- index.html           # Trang chủ
|   |-- products.html        # Danh sách sản phẩm
|   |-- product-detail.html  # Chi tiết sản phẩm
|   |-- cart.html            # Giỏ hàng và đặt hàng
|   |-- orders.html          # Đơn hàng của người dùng
|   |-- account.html         # Trang tài khoản
|   |-- login.html           # Đăng nhập
|   |-- register.html        # Đăng ký
|   |-- admin.html           # Trang quản trị
|   |-- brand.html           # Giới thiệu thương hiệu
|   |-- collection.html      # Bộ sưu tập
|   |-- contact.html         # Liên hệ
|   `-- sale.html            # Khuyến mãi
|-- css/                     # CSS dùng chung và CSS theo từng trang
|-- js/                      # JavaScript ES6 module theo từng chức năng/trang
`-- assets/                  # Ảnh banner, ảnh sản phẩm, SVG danh mục và tài nguyên tĩnh
```


## Chức năng chính từng trang

### Trang chủ 

- Hiển thị banner hero có chuyển slide tự động và nút điều hướng.
- Hiển thị các điểm nổi bật của cửa hàng.
- Hiển thị danh mục sản phẩm và cho phép bấm để lọc/đi tới khu vực sản phẩm.
- Hiển thị danh sách sản phẩm nổi bật từ dữ liệu 
- Có khu vực khuyến mãi, đánh giá và thông tin liên hệ trên trang.
- Dùng chung header, giỏ hàng, quick view và trạng thái đăng nhập.

### Trang sản phẩm 
- Hiển thị danh sách sản phẩm.
- Tìm kiếm sản phẩm theo tên.
- Lọc sản phẩm theo danh mục, khoảng giá và màu.
- Phân trang danh sách sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Xem nhanh sản phẩm bằng modal.


### Trang chi tiết sản phẩm 


- Hiển thị ảnh, giá, giá cũ, mô tả, thông số sản phẩm và nhãn giảm giá/hàng mới.
- Chọn size trước khi thêm vào giỏ hàng.
- Chọn màu sản phẩm.
- Thêm sản phẩm vào giỏ hàng và chuyển sang trang giỏ hàng.
- Hiển thị sản phẩm liên quan cùng danh mục.

### Trang giỏ hàng 

- Xem các sản phẩm đang có trong giỏ hàng.
- Tăng/giảm số lượng sản phẩm.
- Xóa từng sản phẩm khỏi giỏ hàng.
- Xóa toàn bộ giỏ hàng.
- Tính tạm tính, phí vận chuyển và tổng tiền.
- Phí vận chuyển miễn phí khi tạm tính từ 500.000đ trở lên; dưới mức này tính 30.000đ.
- Đặt hàng từ giỏ hàng nếu người dùng đã đăng nhập.
- Không cho tài khoản admin đặt hàng.
- Sau khi đặt hàng thành công, đơn hàng được lưu vào LocalStorage và giỏ hàng được làm rỗng.

### Trang đăng nhập 

- Đăng nhập người dùng bằng email và mật khẩu đã lưu trong LocalStorage.
- Đăng nhập admin bằng tài khoản mẫu.
- Kiểm tra thiếu email/mật khẩu và kiểm tra sai thông tin đăng nhập.


### Trang đăng ký 

- Tạo tài khoản khách hàng mới.
- Validate thông tin bắt buộc.
- Validate định dạng email.
- Validate mật khẩu tối thiểu 6 ký tự.
- Kiểm tra email đã tồn tại.
- Sau khi đăng ký thành công, chuyển người dùng về trang đăng nhập.

### Trang tài khoản -
- Xem thông tin người dùng hiện tại.
- Chỉnh sửa họ tên, số điện thoại và địa chỉ.
- Đăng xuất tài khoản.
- Hiển thị địa chỉ mặc định và các đơn hàng gần đây nếu có.

### Trang đơn hàng 

- Hiển thị danh sách đơn hàng của người dùng đang đăng nhập.
- Hiển thị trạng thái đơn hàng.
- Chọn một đơn hàng để xem chi tiết.
- Xem thông tin giao hàng, sản phẩm trong đơn, phí vận chuyển, giảm giá và tổng tiền.
- Nếu chưa đăng nhập hoặc chưa có đơn hàng, trang hiển thị trạng thái trống phù hợp.

### Trang admin 

- Nếu chưa đăng nhập admin, trang hiển thị thông báo không có quyền và tài khoản mẫu.
- Dashboard thống kê doanh thu, đơn hàng, khách hàng và sản phẩm.
- Hiển thị biểu đồ doanh thu dạng SVG tĩnh và tỷ lệ đơn hàng.
- Quản lý sản phẩm:
  - Hiển thị danh sách sản phẩm.
  - Lọc/tìm kiếm sản phẩm theo danh mục, giá, nhãn và từ khóa.
  - Thêm sản phẩm mới.
  - Sửa sản phẩm.
  - Xóa/ẩn sản phẩm khỏi danh sách hiển thị.
- Quản lý khách hàng:
  - Hiển thị danh sách tài khoản khách hàng.
  - Tìm kiếm khách hàng.
  - Xem nhanh thông tin tài khoản bằng toast.
- Quản lý đơn hàng:
  - Hiển thị danh sách đơn hàng của khách hàng.
  - Lọc theo trạng thái.
  - Lọc theo khoảng ngày.
  - Tìm kiếm theo mã đơn, khách hàng, email, trạng thái hoặc tổng tiền.
  - Xem chi tiết đơn hàng.
  - Cập nhật trạng thái đơn hàng thành đã xử lí hoặc đã hủy.

### Trang thương hiệu 

- Hiển thị câu chuyện thương hiệu Luna Fashion.
- Trình bày phần giới thiệu, điểm nổi bật và thống kê thương hiệu.
- Dùng chung header, giỏ hàng và trạng thái tài khoản.

### Trang bộ sưu tập 

- Hiển thị các bộ sưu tập/thư mục thời trang.
- Mỗi bộ sưu tập có ảnh, mô tả và liên kết tới danh sách sản phẩm tương ứng.
- Dùng chung header, giỏ hàng và trạng thái tài khoản.

### Trang liên hệ 
- Hiển thị thông tin liên hệ của cửa hàng.
- Có form liên hệ gồm họ tên, email và nội dung.
- Validate trường bắt buộc.
- Hiển thị thông báo thành công hoặc lỗi ngay trên giao diện.
- Form chỉ xử lý ở front-end, không gửi dữ liệu lên server.

### Trang khuyến mãi
- Hiển thị banner khuyến mãi.
- Trình bày các chương trình ưu đãi, mã giảm giá/dịch vụ nổi bật.
- Có các khu vực dịch vụ như đổi trả, giao hàng, thanh toán và hỗ trợ.
- Dùng chung header, giỏ hàng và trạng thái tài khoản.

## Tài khoản admin mẫu

- Email: `admin@lunafashion.com`
- Mật khẩu: `123456`



## Cách chạy dự án

1. Mở thư mục dự án bằng Visual Studio Code.
2. Cài extension **Live Server** nếu chưa có.
3. Bấm chuột phải vào `html/index.html`.
4. Chọn **Open with Live Server**.
5. Truy cập các trang như `products.html`, `cart.html`, `login.html` hoặc `admin.html` từ menu hoặc URL.

Có thể mở trực tiếp các file HTML trong thư mục `html/` bằng trình duyệt, nhưng dùng Live Server sẽ phù hợp hơn khi làm việc với ES6 module.
