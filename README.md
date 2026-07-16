# 🛒 Đề tài: Xây dựng Website Bán Hàng Trực Tuyến (E-commerce)

Dự án Bài tập lớn cuối kỳ môn Lập trình Web Nâng cao (Lớp N01_LT2) - Đại học Phenikaa.

## 👥 Thành viên nhóm & Đóng góp

| STT | Mã SV    | Họ và tên        | Phân công nhiệm vụ                       | Đóng góp (%) |
| :-- | :------- | :--------------- | :--------------------------------------- | :----------- |
| 1   | 24100110 | Lê Hải Anh       | Lead Backend & Database (API, CSDL)      | 33.3%        |
| 2   | 24100233 | Vũ Đức Toàn      | Lead Frontend & UI (Giao diện, Ghép API) | 33.3%        |
| 3   | 24100188 | Nguyễn Đình Tùng | BA, Vẽ UML, Unit Test, Báo cáo & Video   | 33.4%        |

## 🔗 Liên kết quan trọng

- **Link Video Demo (Dưới 8 phút):** [Chưa cập nhật]
- **Link Github:** https://github.com/HaiAnh196/web-advanced-nhomHoaCaiDo

---

## ⚖️ PHẦN ĐÁNH GIÁ LUẬT, ĐẠO ĐỨC VÀ AN TOÀN THÔNG TIN (SECURITY)

### 1. Vấn đề Pháp luật (Law)

Khi xây dựng một hệ thống E-commerce, dự án cần tuân thủ các quy định pháp luật liên quan đến thương mại điện tử và bảo vệ dữ liệu, cụ thể:

- **Bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP):** Hệ thống có thu thập thông tin khách hàng (Họ tên, SĐT, Email, Địa chỉ giao hàng). Nhóm cam kết tuân thủ quy định bảo vệ dữ liệu cá nhân: chỉ thu thập những gì cần thiết và phải có sự đồng ý của người dùng (thông qua Checkbox điều khoản khi đăng ký).
- **Luật Sở hữu trí tuệ:** Nhóm cam kết sử dụng các thư viện mã nguồn mở có bản quyền hợp lệ (MIT, Apache License), sử dụng hình ảnh sản phẩm demo không vi phạm bản quyền (hoặc ghi rõ nguồn gốc), không sao chép nguyên vẹn giao diện/logo của các nhãn hiệu khác với mục đích thương mại.
- **Lồng ghép An ninh (Security):** Để đáp ứng yêu cầu luật pháp về bảo mật dữ liệu, hệ thống đã tích hợp mã hóa mật khẩu một chiều (Hash Password) bằng thư viện bcrypt trước khi lưu vào CSDL. Dữ liệu truyền tải giữa Frontend và Backend được bảo vệ chống đánh cắp thông qua các biện pháp bảo mật đường truyền.

### 2. Vấn đề Đạo đức xã hội (Social Ethics)

Đạo đức xã hội liên quan đến tác động của ứng dụng đối với cộng đồng và niềm tin của người tiêu dùng:

- **Minh bạch trong kinh doanh:** Giá cả sản phẩm, phí vận chuyển và số lượng tồn kho phải được hiển thị chính xác trên giao diện (UI). Không sử dụng các "Mẫu thiết kế đánh lừa" (Dark Patterns) để ép khách hàng mua thêm đồ hoặc giấu giếm chi phí phát sinh lúc thanh toán.
- **Tôn trọng người dùng:** Tuyệt đối không sử dụng/bán dữ liệu hồ sơ khách hàng cho các bên thứ ba (để chạy quảng cáo spam) vì đây là hành vi vi phạm đạo đức nghiêm trọng, gây tổn hại đến đời sống cá nhân của cộng đồng.
- **Lồng ghép An ninh (Security):** Tích hợp tính năng bảo mật thanh toán và xác thực kỹ lưỡng. Chặn các bot rác (spam) đặt hàng ảo gây ảnh hưởng đến hệ thống và bảo vệ khách hàng khỏi các email giả mạo lừa đảo (Phishing) mạo danh hệ thống.

### 3. Vấn đề Đạo đức nghề nghiệp (Professional Ethics)

Đây là trách nhiệm của người kỹ sư/sinh viên CNTT trong quá trình phát triển phần mềm:

- **Sự trung thực và liêm chính:** Toàn bộ code trong dự án là kết quả lao động thực sự của các thành viên. Các đoạn code tham khảo (từ StackOverflow, AI...) đều được hiểu rõ bản chất trước khi tích hợp. Đóng góp trên Git Commits minh bạch, đúng người, đúng việc.
- **Chất lượng và Trách nhiệm:** Nhóm không làm phần mềm "cho có" mà áp dụng các tiêu chuẩn kỹ thuật tốt nhất (Clean Architecture, RESTful API chuẩn). Cố gắng bao phủ lỗi bằng Unit Test để đảm bảo khi hệ thống chạy thực tế không bị crash (sập) gây thiệt hại cho doanh nghiệp.
- **Lồng ghép An ninh (Security):** Tuân thủ tiêu chuẩn an toàn thông tin OWASP Top 10.
  - Hệ thống sử dụng Cơ chế xác thực JWT (JSON Web Token) để cấp quyền truy cập.
  - Phân quyền chặt chẽ (Authorization): Khách hàng (Customer) không thể gọi API quản lý (Thêm/Sửa/Xóa sản phẩm) của Quản trị viên (Admin).
  - Sử dụng công cụ ORM (Object-Relational Mapping) như TypeORM/Prisma để chủ động phòng chống tấn công SQL Injection, đảm bảo CSDL không bị phá hoại.
