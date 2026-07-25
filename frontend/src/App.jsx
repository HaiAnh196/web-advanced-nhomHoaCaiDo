import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components dùng chung
import Navbar from "./components/Navbar";
import MessengerChat from "./components/MessengerChat";

// Import các trang
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import Context Providers
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            {/* Thanh điều hướng chính */}
            <Navbar />

            {/* Nội dung chính sẽ tự động thay đổi theo URL */}
            <main className="main-content">
              <Routes>
                {/* Trang chủ & tìm kiếm / lọc danh mục */}
                <Route path="/" element={<ProductList />} />
                
                {/* Chi tiết sản phẩm */}
                <Route path="/product/:id" element={<ProductDetail />} />
                
                {/* Trang giỏ hàng */}
                <Route path="/cart" element={<Cart />} />
                
                {/* Trang đăng nhập */}
                <Route path="/login" element={<Login />} />

                {/* Trang đăng ký */}
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>

            {/* Bộ Nút Liên Hệ & Khung Chat Messenger Tương Tác */}
            <MessengerChat />

            {/* Footer Hiện Đại */}
            <footer className="footer">
              <div className="footer-container">
                <div className="footer-col">
                  <h3>HoaCaiDo Phenikaa Store</h3>
                  <p>Hệ thống cung cấp thiết bị công nghệ & quà tặng thương hiệu Đại học Phenikaa chất lượng cao.</p>
                  <p className="copyright-text">© 2026 Phenikaa University - Dự án Web Nâng cao (Nhóm Hoa Cải Đỏ)</p>
                </div>
                <div className="footer-col">
                  <h4>Về Chúng Tôi</h4>
                  <ul>
                    <li><a href="/">Giới thiệu thương hiệu</a></li>
                    <li><a href="/">Tuyển dụng & Sự kiện</a></li>
                    <li><a href="/">Chính sách bảo mật</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Hỗ Trợ Khách Hàng</h4>
                  <ul>
                    <li><a href="/">Hướng dẫn mua hàng online</a></li>
                    <li><a href="/">Chính sách bảo hành 24/7</a></li>
                    <li><a href="/">Tra cứu đơn hàng</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Liên Hệ</h4>
                  <p>📍 Địa chỉ: Yên Nghĩa, Hà Đông, Hà Nội</p>
                  <p>📞 Hotline: 1900 1008</p>
                  <p>✉️ Email: web.hoacaido@phenikaa-uni.edu.vn</p>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
