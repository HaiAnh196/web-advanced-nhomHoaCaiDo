# BÁO CÁO THỰC HIỆN KIỂM THỬ VÀ KIỂM ĐỊNH HỆ THỐNG
**Đề tài:** Xây dựng Website Bán Hàng Trực Tuyến (E-commerce)  
**Nhóm thực hiện:** Hoa Cải Đỏ  
**Khung làm việc (Framework):** NestJS + TypeORM + SQLite (Backend) | React + Vite (Frontend)  
**Công cụ kiểm thử:** Jest, NestJS Testing Module, Supertest  
**Ngày báo cáo:** 29/07/2026  

---

## 1. THỰC HIỆN BẮT LỖI TRONG MỌI TRƯỜNG HỢP CÓ THỂ (EXCEPTION HANDLING & ERROR CATCHING)

Hệ thống áp dụng phương pháp **Lập trình phòng thủ (Defensive Programming)**, thiết kế các lớp kiểm tra dữ liệu đầu vào và chủ động ném ngoại lệ (Exception) để xử lý lỗi trong mọi trường hợp phát sinh:

### 1.1. Cơ chế xử lý ngoại lệ chuẩn HTTP (NestJS Exception Filter)
Mỗi khi xuất hiện thao tác không hợp lệ hoặc dữ liệu sai lệch, hệ thống không để chương trình bị sập (crash) mà chủ động ném ra các ngoại lệ chuẩn HTTP của NestJS để trả về thông báo lỗi rõ ràng cho phía Client:

| Loại Ngoại Lệ | Mã HTTP | Tình huống áp dụng | Biện pháp bắt lỗi & Thông báo |
| :--- | :---: | :--- | :--- |
| **`NotFoundException`** | **404** | Người dùng hoặc Quản trị viên thao tác (Xem, Sửa, Xóa) trên một ID sản phẩm không tồn tại trong CSDL. | Kiểm tra `product == null` hoặc `index === -1`. Chủ động ném lỗi: *"Không tìm thấy sản phẩm có ID: [id]"*. |
| **`UnauthorizedException`** | **401** | Khách hàng hoặc Admin đăng nhập sai mật khẩu hoặc tài khoản không tồn tại. | Kiểm tra so khớp mật khẩu. Ném lỗi: *"Tên đăng nhập hoặc mật khẩu không chính xác!"* (Không báo chi tiết sai user hay pass để chống tấn công dò thông tin). |
| **`ConflictException`** | **409** | Khách hàng đăng ký tài khoản nhưng tên đăng nhập (`username`) đã tồn tại. | Ràng buộc `unique` trên CSDL SQLite, từ chối tạo bản ghi trùng lặp và thông báo tới người dùng. |
| **`BadRequestException`** | **400** | Dữ liệu gửi lên sai định dạng hoặc thiếu các trường bắt buộc. | Kiểm tra hợp lệ trước khi đưa vào Service xử lý. |

### 1.2. Bắt lỗi trên tầng giao diện (Frontend Error Handling)
* **Kiểm tra hợp lệ biểu mẫu (Form Validation):** Trình duyệt tự động kiểm tra các trường bắt buộc, xác nhận mật khẩu nhập lại (`password === confirmPassword`) trước khi gửi HTTP Request xuống máy chủ.
* **Xử lý phản hồi lỗi từ Backend:** Sử dụng `try...catch` trong các lời gọi API (`AxiosClient`). Khi Backend trả về mã lỗi HTTP 400, 401, 404 hoặc 409, Frontend lập tức bắt lỗi và hiển thị thông báo trực quan cho người dùng thông qua hệ thống **Toast Notification**.

---

## 2. VIẾT ĐƠN VỊ KIỂM ĐỊNH (UNIT TEST) TRONG KHUNG LÀM VIỆC CỦA PROJECT

Tuân thủ cấu trúc của khung làm việc **NestJS**, các ca kiểm thử được đặt theo đúng chuẩn:
* **Đơn vị kiểm định (Unit Test):** Đặt song hành cùng mã nguồn trong thư mục `backend/src/modules/` dưới dạng `*.spec.ts`.
* **Kiểm thử toàn trình (E2E Test):** Đặt tại thư mục `backend/test/` dành riêng cho kiểm thử hệ thống.

### 2.1. Kiểm định Đơn vị cho Module Sản Phẩm (`products.service.spec.ts`)
Đã xây dựng **10 ca kiểm định (Test cases)** kiểm tra toàn diện logic nghiệp vụ của `ProductsService`, bao gồm cả ca kiểm định luồng bình thường và luồng bắt lỗi ngoại lệ:

1. **`should be defined`**: Kiểm tra Service được khởi tạo và tiêm (inject) thành công.
2. **Kiểm định `findAll()`**:
   * Trả về đủ danh sách 4 sản phẩm mặc định trong hệ thống.
   * Lọc chính xác danh sách sản phẩm theo từ khóa tìm kiếm (`search` không phân biệt hoa thường).
   * Lọc chính xác danh sách sản phẩm theo danh mục (`category`).
3. **Kiểm định `findOne()`**:
   * *Luồng bình thường:* Trả về đúng đối tượng sản phẩm khi truyền ID tồn tại (ID: `'1'`).
   * ***Luồng bắt lỗi (Exception Test):*** Xác nhận Service **ném ra ngoại lệ `NotFoundException`** khi truyền vào ID ảo (ID: `'99999'`).
4. **Kiểm định `create()`**: Tạo thành công sản phẩm mới và kiểm tra tổng số lượng sản phẩm trong mảng tăng thêm 1.
5. **Kiểm định `update()`**:
   * *Luồng bình thường:* Cập nhật thành công giá mới cho sản phẩm có ID hợp lệ.
   * ***Luồng bắt lỗi:*** Xác nhận ném ra `NotFoundException` khi nỗ lực cập nhật một ID không tồn tại.
6. **Kiểm định `remove()`**:
   * *Luồng bình thường:* Xóa thành công sản phẩm khỏi danh sách và xác nhận không thể tìm thấy sản phẩm đó nữa.
   * ***Luồng bắt lỗi:*** Xác nhận ném ra `NotFoundException` khi nỗ lực xóa một ID không tồn tại.

### 2.2. Kiểm định Đơn vị cho Module Xác Thực (`auth.service.spec.ts`)
Đã xây dựng **07 ca kiểm định** kiểm tra tính năng xác thực và phân quyền của `AuthService`:

1. **`should be defined`**: Kiểm tra khởi tạo Service thành công.
2. **Kiểm định đăng nhập `login()`**:
   * *Đăng nhập Admin:* Kiểm tra đăng nhập thành công với tài khoản quản trị (`username: 'admin'`), xác nhận quyền `ADMIN` và cấp phát Token JWT (`jwtService.signAsync`).
   * *Đăng nhập Khách hàng:* Kiểm tra đăng nhập thành công với tài khoản người dùng thường, xác nhận quyền `USER`.
   * ***Kiểm định bắt lỗi sai mật khẩu:*** Xác nhận hệ thống ném ngoại lệ **`UnauthorizedException`** với thông báo lỗi rõ ràng khi người dùng nhập sai mật khẩu.
   * ***Kiểm định bắt lỗi sai tài khoản:*** Xác nhận hệ thống ném ngoại lệ **`UnauthorizedException`** khi tên đăng nhập không tồn tại trong CSDL.
3. **Kiểm định đăng ký `register()`**:
   * Kiểm tra tạo thành công tài khoản người dùng mới với quyền mặc định `USER` và chuyển tiếp đúng dữ liệu xuống `UsersService`.

### 2.3. Kiểm thử Toàn trình trong thư mục test (`backend/test/app.e2e-spec.ts`)
Sử dụng **Supertest** để giả lập HTTP Client gửi request trực tiếp vào các Endpoint API của máy chủ:

1. **Kiểm thử gốc (`GET /`)**: Xác nhận máy chủ hoạt động và trả về mã HTTP 200 (`Hello World!`).
2. **Kiểm thử API Danh mục sản phẩm (`GET /products`)**: Xác nhận API trả về HTTP 200 OK và dữ liệu là một mảng sản phẩm (`Array.isArray`).
3. ***Kiểm thử bắt lỗi API Sản phẩm (`GET /products/9999999999`):*** Giả lập gửi request tìm sản phẩm ảo -> **Xác nhận API bắt lỗi và trả về HTTP 404 Not Found**.
4. ***Kiểm thử bắt lỗi API Đăng nhập (`POST /auth/login`):*** Giả lập gửi thông tin đăng nhập sai mật khẩu -> **Xác nhận API bắt lỗi và trả về HTTP 401 Unauthorized**.
5. **Kiểm thử API Đăng nhập thành công (`POST /auth/login`)**: Giả lập đăng nhập Admin -> Xác nhận API trả về HTTP 201 Created kèm chữ ký `access_token` và `role: ADMIN`.

---

## 3. THỰC HIỆN KIỂM THỬ ỨNG DỤNG (TEST EXECUTION & RESULTS)

Đã thực hiện chạy tự động toàn bộ bộ kiểm thử trên môi trường phát triển (Node.js/Jest). Kết quả **100% các ca kiểm thử đều VƯỢT QUA (PASS)**, hệ thống bắt đúng mọi trường hợp lỗi được thiết kế:

### 3.1. Bảng Tổng Hợp Kết Quả Kiểm Thử

| Cấp độ kiểm thử | Lệnh thực thi | Số Test Suite | Tổng số Test Case | Số ca PASS | Tỉ lệ thành công | Thời gian chạy |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Unit Test (Đơn vị)** | `npm test` | 7 | 22 | **22** | **100%** | 2.67s |
| **E2E Test (Toàn trình)** | `npm run test:e2e` | 1 | 5 | **5** | **100%** | 1.92s |
| **TỔNG CỘNG** | — | **8** | **27** | **27** | **100%** | **4.59s** |

### 3.2. Minh Chứng Kết Quả Thực Thi (Log Console Thực Tế)

#### 📌 Log kết quả chạy Đơn vị Kiểm định (`npm test`):
```text
> backend@0.0.1 test
> jest

PASS src/app.controller.spec.ts
PASS src/modules/products/products.controller.spec.ts
PASS src/modules/products/products.service.spec.ts
PASS src/modules/users/users.controller.spec.ts
PASS src/modules/users/users.service.spec.ts
PASS src/modules/auth/auth.controller.spec.ts
PASS src/modules/auth/auth.service.spec.ts

Test Suites: 7 passed, 7 total
Tests:       22 passed, 22 total
Snapshots:   0 total
Time:        2.678 s
Ran all test suites.
```

#### 📌 Log kết quả chạy Kiểm thử Toàn trình (`npm run test:e2e`):
```text
> backend@0.0.1 test:e2e
> jest --config ./test/jest-e2e.json

PASS test/app.e2e-spec.ts
  Kiểm thử E2E & Bắt lỗi hệ thống (e2e)
    Kiểm thử gốc (Root /)
      √ / (GET) - trả về Hello World! (246 ms)
    Kiểm thử & Bắt lỗi API Sản phẩm (/products)
      √ /products (GET) - trả về danh sách sản phẩm (200 OK) (20 ms)
      √ /products/:id (GET) - [Bắt lỗi] trả về 404 Not Found khi tìm ID không tồn tại (14 ms)
    Kiểm thử & Bắt lỗi API Xác thực (/auth)
      √ /auth/login (POST) - [Bắt lỗi] trả về 401 Unauthorized khi sai mật khẩu (25 ms)
      √ /auth/login (POST) - đăng nhập thành công với admin (200 OK) (19 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.929 s
Ran all test suites.
```

---

## 4. KẾT LUẬN & ĐÁNH GIÁ CHẤT LƯỢNG
1. **Khả năng kiểm soát lỗi:** Hệ thống đáp ứng yêu cầu kiểm soát và bắt lỗi trong mọi tình huống ngoại lệ (ID sai, sai mật khẩu, sai tài khoản, trùng thông tin), không xuất hiện hiện tượng sập máy chủ khi gặp dữ liệu xấu.
2. **Tính toàn vẹn kiểm định:** Các đơn vị kiểm định (Unit Test) và kiểm thử ứng dụng (E2E Test) được tích hợp đúng chuẩn thư mục của NestJS Project, đạt tỉ lệ tự động hóa cao và độ độ tin cậy **100% PASS**.
3. **Sẵn sàng triển khai:** Mã nguồn hoàn toàn đạt tiêu chuẩn nghiệm thu học phần Lập trình Web Nâng cao.
