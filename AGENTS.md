# AGENTS.md

## Project Overview

Project hiện tại là **Ni Sport**.

Ni Sport là website bán quần áo bóng đá và phụ kiện bóng đá, gồm:

- Áo bóng đá
- Quần bóng đá
- Bộ đồ bóng đá
- Đồ tập bóng đá
- Phụ kiện bóng đá

Project trước đây có tên Luna Fashion, nhưng hiện đã đổi concept sang Ni Sport. Không dùng tên Luna Fashion trong nội dung hiển thị mới, trừ các migration cũ đã applied.

## Tech Stack

- Java 21
- Spring Boot 3
- Maven
- PostgreSQL
- Spring Security JWT
- Spring Data JPA
- Flyway
- Swagger/OpenAPI
- Lombok
- Bean Validation
- HTML/CSS/JavaScript frontend

## Project Structure

- `backend/`: backend Spring Boot.
- `html/`: các trang HTML frontend.
- `css/`: stylesheet frontend.
- `js/`: JavaScript frontend.
- `assets/`: hình ảnh và tài nguyên tĩnh.

Không sửa frontend nếu task không yêu cầu rõ ràng.

## Database Rules

- Database name: `ni_sport`.
- Không sửa migration Flyway đã applied như `V1` hoặc `V3` để tránh lỗi checksum.
- Nếu cần thay đổi database, tạo migration mới với version tiếp theo.
- File SQL full nếu có chỉ dùng cho dev/reset thủ công.
- Không đưa file SQL full vào `src/main/resources/db/migration` nếu Flyway đã chạy.

## Coding Rules

- Không đổi package Java `com.lunafashion`.
- Không trả entity trực tiếp từ controller.
- Luôn dùng DTO cho API response.
- Response thành công dùng `ApiResponse`.
- Lỗi dùng các exception sẵn có như `BadRequestException`, `ResourceNotFoundException`, `UnauthorizedException`.
- Không dùng `@Data` cho JPA entity.
- Tiền dùng `BigDecimal`.
- Enum dùng `@Enumerated(EnumType.STRING)`.
- Quan hệ entity dùng `FetchType.LAZY`.
- Public product/category API không cần JWT.
- Admin API phải yêu cầu role `ADMIN`.
- Không phá Auth/JWT khi làm các giai đoạn sau.

## Current Progress

- Stage 1: Backend setup - done.
- Stage 2: Common response/config/exception - done.
- Stage 3: Entity + Repository + Database - done.
- Stage 4: Auth/JWT - done.
- Stage 4.5: Rename display/project concept to Ni Sport - done.
- Next stage: Stage 5 Public Category + Product API.

## Commands

Run backend:

```bash
cd backend
mvn clean spring-boot:run
```

Run tests:

```bash
cd backend
mvn test
```

Swagger:

```text
http://localhost:8080/swagger-ui.html
```

Health:

```http
GET http://localhost:8080/api/v1/health
```

Admin demo:

```text
admin@nisport.com / 123456
```

## Verification After Backend Changes

Sau mỗi lần chỉnh backend, cần kiểm tra:

- `mvn test` pass.
- Backend chạy được bằng `mvn clean spring-boot:run`.
- Health API chạy được.
- Swagger mở được.
- Login admin `admin@nisport.com / 123456` vẫn hoạt động.
- `/api/v1/auth/me` hoạt động với Bearer token.

## Output Rule

Sau khi hoàn thành task, luôn báo lại:

- Files created.
- Files modified.
- Commands run.
- Test result.
- Endpoints cần test thủ công.
