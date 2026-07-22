import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components dùng chung
import Navbar from "./components/Navbar";

// Import các trang đã tạo
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import Cart Provider
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          {/* Thanh điều hướng chính */}
          <Navbar />

          {/* Nội dung chính sẽ tự động thay đổi theo URL */}
          <main className="main-content" style={{ padding: "20px" }}>
            <Routes>
              {/* Đường dẫn trang chủ hiển thị danh sách sản phẩm */}
              <Route path="/" element={<ProductList />} />
              
              {/* Chi tiết sản phẩm, :id đại diện cho ID động của sản phẩm */}
              <Route path="/product/:id" element={<ProductDetail />} />
              
              {/* Trang giỏ hàng */}
              <Route path="/cart" element={<Cart />} />
              
              {/* Trang đăng nhập */}
              <Route path="/login" element={<Login />} />

              {/* Trang đăng ký */}
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="footer">
            <p>© 2026 Phenikaa University - Dự án Web Nâng cao (Nhóm Hoa Cải Đỏ)
              Phát triển UI/UX bởi Đình Tùng
            </p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

