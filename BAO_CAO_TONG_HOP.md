# BÁO CÁO TỔNG HỢP KẾT QUẢ THỰC HIỆN DỰ ÁN
**Đề tài:** Xây dựng Website Bán Hàng Trực Tuyến (E-commerce)  
**Nhóm thực hiện:** Hoa Cải Đỏ  
**Học phần:** Lập trình Web Nâng cao (Lớp N01_LT2) - Đại học Phenikaa  
**Repository GitHub:** https://github.com/HaiAnh196/web-advanced-nhomHoaCaiDo  
**Ngày báo cáo:** 29/07/2026  

---

## 1. KHẮC PHỤC LỖI MÔI TRƯỜNG & KHỞI TẠO DỰ ÁN (GIT CLONE & SETUP)

### 1.1. Vấn đề gặp phải
* Khi thực hiện lệnh `git clone https://github.com/HaiAnh196/web-advanced-nhomHoaCaiDo.git` vào thư mục làm việc `D:\webnc`, hệ thống báo lỗi:  
  `fatal: could not create work tree dir 'web-advanced-nhomHoaCaiDo': Permission denied`
* **Nguyên nhân:** Thư mục `D:\webnc` được tạo với quyền hạn chế, tài khoản người dùng thông thường (`BUILTIN\Users`) chỉ có quyền Đọc & Thực thi (`ReadAndExecute`), thiếu quyền Ghi (`Write/FullControl`).

### 1.2. Giải pháp và kết quả
* Thực hiện cấp quyền truy cập đầy đủ (`FullControl`) cho nhóm người dùng trên thư mục `D:\webnc` thông qua UAC.
* Thực hiện clone thành công toàn bộ mã nguồn của nhóm từ nhánh `main` về máy.
* Cấu trúc dự án bao gồm 2 phân hệ chính:
  * `frontend/`: Ứng dụng giao diện khách hàng (React + Vite).
  * `backend/`: Máy chủ xử lý nghiệp vụ & API (NestJS + TypeORM + SQLite).

---

## 2. KHỞI CHẠY & PHÂN TÍCH GIAO DIỆN FRONTEND

### 2.1. Vấn đề gặp phải
* Khi chạy lệnh `npm run dev` trong `D:\webnc\frontend`, hệ thống báo lỗi không nhận diện được lệnh `vite`.
* **Nguyên nhân:** Thư mục chưa có `node_modules` do chưa cài đặt các gói thư viện phụ thuộc.

### 2.2. Giải pháp và kết quả
* Chạy lệnh `npm install` tại `D:\webnc\frontend`, tải về 165 gói thư viện trong 8 giây.
* Khởi chạy thành công máy chủ phát triển Frontend (`npm run dev`) tại địa chỉ: **http://localhost:5173/**.

---

## 3. THIẾT KẾ SƠ ĐỒ CẤU TRÚC LỚP (UML CLASS DIAGRAM)

Đã xây dựng tài liệu thiết kế Sơ đồ lớp (UML Class Diagram) đầy đủ cho 2 tầng kiến trúc, lưu trữ tại [DOCS.md](./DOCS.md):
1. **Sơ đồ Lớp Backend (NestJS + TypeORM + SQLite):**
   * Mô hình hóa theo 3 tầng chuẩn: **Controller - Service - Entity**.
   * Các Entity chính: `User` (tài khoản người dùng/admin), `Product` (dữ liệu sản phẩm, giá ưu đãi sinh viên/VIP, tồn kho).
   * Các Service & Controller tương ứng cho 3 module chính: `AuthModule`, `UsersModule`, `ProductsModule`.
   * Thể hiện rõ các mối quan hệ Dependency (`..>`) thông qua cơ chế Dependency Injection của NestJS và Association (`-->`).
2. **Sơ đồ Lớp & Quản lý trạng thái Frontend (React + Context API):**
   * Thể hiện cấu trúc Component-based kết hợp quản lý trạng thái toàn cục qua `CartContext` (giỏ hàng) và `ToastContext` (thông báo).
   * Lớp giao tiếp API (`AxiosClient`) chịu trách nhiệm gọi RESTful API tới máy chủ Backend.

---

## 4. THIẾT KẾ 05 SƠ ĐỒ THUẬT TOÁN & LUỒNG NGHIỆP VỤ (SEQUENCE & ACTIVITY DIAGRAMS)

Đã xây dựng và minh họa bằng Mermaid Diagram 05 quy trình nghiệp vụ cốt lõi của hệ thống bán hàng:
1. **Sơ đồ 1 (Sequence Diagram): Quy trình Xác thực Đăng nhập & Cấp phát Token JWT**
   * Minh họa luồng kiểm tra thông tin đăng nhập, hỗ trợ tài khoản đặc quyền (`admin`), tạo chữ ký và cấp phát JSON Web Token (`access_token`).
2. **Sơ đồ 2 (Activity Diagram): Quy trình Đăng ký Tài khoản Người dùng mới**
   * Minh họa logic kiểm tra ràng buộc đầu vào trên Form UI và kiểm tra ràng buộc duy nhất (`unique`) của `username` trên CSDL SQLite.
3. **Sơ đồ 3 (Sequence Diagram): Quy trình Tìm kiếm, Lọc & Xem Chi tiết Sản phẩm**
   * Thể hiện thuật toán tìm kiếm không phân biệt hoa thường (`toLowerCase`) trên tên, danh mục và mô tả sản phẩm; hiển thị giá ưu đãi theo đối tượng.
4. **Sơ đồ 4 (Activity Diagram): Quy trình Thêm vào Giỏ hàng & Thanh toán**
   * Thể hiện thuật toán kiểm tra sự tồn tại của sản phẩm trong giỏ hàng để cộng dồn số lượng hoặc thêm mới; tự động làm rỗng giỏ hàng sau khi đặt mua.
5. **Sơ đồ 5 (Sequence Diagram): Quy trình Quản trị viên Thêm & Xóa Sản phẩm**
   * Mô tả nghiệp vụ thao tác dữ liệu (CRUD) của trang Quản trị, đồng bộ tức thì trên giao diện và hiển thị Toast thông báo.

---

## 5. QUẢN LÝ MÃ NGUỒN & ĐỒNG BỘ GITHUB

### 5.1. Phân loại tài nguyên Git
* **Tài nguyên bắt buộc commit:** Toàn bộ mã nguồn (`src/`), file quản lý thư viện (`package.json`, `package-lock.json`), file cấu hình (`nest-cli.json`, `vite.config.js`, `.gitignore`) và CSDL mẫu (`database.sqlite`).
* **Tài nguyên tuyệt đối không commit:** Thư mục `node_modules/`, thư mục build/dist, và file cấu hình chứa mật khẩu thật (`.env`).
* **Bổ sung cấu hình mẫu:** Đã tạo 2 file `.env.example` cho `backend/` và `frontend/` để hướng dẫn người mới cài đặt môi trường.
* **Cập nhật README:** Thêm liên kết dẫn thẳng từ trang chủ [README.md](./README.md) sang tài liệu kiến trúc [DOCS.md](./DOCS.md).

---

## 6. KIỂM THỬ VÀ KIỂM ĐỊNH HỆ THỐNG (TESTING, ERROR CATCHING & VERIFICATION)

### 6.1. Chiến lược Bắt lỗi & Xử lý Ngoại lệ (Defensive Programming)
* **Xử lý lỗi HTTP 404 (`NotFoundException`):** Chủ động ném ngoại lệ khi thao tác (tìm kiếm, cập nhật, xóa) trên các ID không tồn tại.
* **Xử lý lỗi HTTP 401 (`UnauthorizedException`):** Từ chối truy cập khi sai mật khẩu hoặc tài khoản không tồn tại.
* **Xử lý lỗi HTTP 409 (`ConflictException`):** Ngăn chặn tạo tài khoản trùng tên đăng nhập.

### 6.2. Viết Đơn vị Kiểm định (Unit Test - `backend/src/`)
Đã hoàn thiện bộ Unit Test sử dụng **Jest & NestJS Testing Module**:
* **`products.service.spec.ts` (10 ca kiểm định):**
  * Kiểm thử các hàm `findAll`, `findOne`, `create`, `update`, `remove`.
  * **Kiểm thử bắt lỗi:** Xác nhận hệ thống ném ra đúng ngoại lệ `NotFoundException` khi tìm kiếm, sửa hoặc xóa ID ảo.
* **`auth.service.spec.ts` (7 ca kiểm định):**
  * Kiểm thử đăng nhập thành công cho Admin (`role: ADMIN`) và User (`role: USER`).
  * **Kiểm thử bắt lỗi bảo mật:** Xác nhận hệ thống ném ra `UnauthorizedException` khi đăng nhập sai mật khẩu hoặc tài khoản không tồn tại.
* **Kết quả chạy Unit Test (`npm test`):**
  * **100% PASS** (7/7 Test Suites, 22/22 ca kiểm thử thành công trong 2.67s).

### 6.3. Viết Kiểm thử Toàn trình Ứng dụng (E2E Test - `backend/test/`)
Đã cập nhật file E2E chuẩn trong thư mục `test/` (`app.e2e-spec.ts`) sử dụng **Supertest**:
* **5 ca kiểm thử thực tế qua HTTP Request:**
  * `GET /`: Kiểm thử endpoint root (200 OK).
  * `GET /products`: Kiểm thử lấy danh sách sản phẩm (200 OK).
  * `GET /products/9999999999`: **[Bắt lỗi] Trả về HTTP 404 Not Found** đúng theo kịch bản lỗi.
  * `POST /auth/login` *(sai mật khẩu)*: **[Bắt lỗi] Trả về HTTP 401 Unauthorized** đúng theo kịch bản bảo mật.
  * `POST /auth/login` *(đúng mật khẩu)*: Trả về HTTP 201 Created kèm chữ ký `access_token`.
* **Kết quả chạy E2E Test (`npm run test:e2e`):**
  * **100% PASS** (1/1 Test Suite, 5/5 ca kiểm thử E2E thành công trong 1.92s).

---

## 7. TỔNG KẾT CÁC MỐC COMMIT TRÊN GITHUB

Toàn bộ các nội dung công việc và tài liệu trên đã được đồng bộ 100% lên nhánh `main` của repository GitHub:
```text
3b408b8 - test: bổ sung Unit Test, E2E test và báo cáo kiểm thử xử lý bắt lỗi hệ thống
85ed7d8 - docs: cập nhật liên kết DOCS.md trong README.md và bổ sung .env.example mẫu cho frontend/backend
c88e45e - docs: thêm Sơ đồ cấu trúc lớp (UML Class Diagram) và 05 Sơ đồ thuật toán (Sequence/Activity Diagrams) vào DOCS.md
```

**Dự án hoàn toàn sẵn sàng cho việc nộp bài tập lớn và đánh giá cuối kỳ!**
