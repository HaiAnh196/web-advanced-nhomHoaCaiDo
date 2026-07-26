import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
import Admin from "./pages/Admin";

// Import Context Providers
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

// Component Layout dành riêng cho Người Dùng / Khách Hàng (có Navbar, Chat, Footer)
function UserLayout() {
  return (
    <div className="app-container">
      {/* Thanh điều hướng chính */}
      <Navbar />

      {/* Nội dung chính các trang người dùng */}
      <main className="main-content">
        <Outlet />
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
  );
}

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* GIAO DIỆN NGƯỜI DÙNG / KHÁCH HÀNG */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* GIAO DIỆN QUẢN TRỊ ADMIN (Độc lập hoàn toàn, không bọc UserLayout) */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
