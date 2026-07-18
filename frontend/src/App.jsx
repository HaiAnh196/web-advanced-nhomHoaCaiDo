import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  // Tự động gọi API lấy danh sách sản phẩm khi vừa mở trang
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
  }, []);

  return (
    <div className="app-container">
      {/* Header chuẩn màu Phenikaa */}
      <header className="header">
        <div className="logo">🏫 Phenikaa E-Commerce</div>
        <nav>
          <button className="btn-login">Đăng nhập</button>
        </nav>
      </header>

      {/* Nội dung chính */}
      <main className="main-content">
        <div className="banner">
          <h1>Chào mừng đến với Cửa hàng Sinh viên Phenikaa</h1>
          <p>Nơi cung cấp đồng phục, phụ kiện và giáo trình chính hãng</p>
        </div>

        <h2 className="section-title">Sản phẩm nổi bật</h2>

        {/* Lưới hiển thị sản phẩm */}
        <div className="product-grid">
          {products.length === 0 ? (
            <p>Đang tải dữ liệu từ Backend...</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <div className="product-info">
                  <span className="category-tag">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="price">{product.price.toLocaleString()} VNĐ</p>
                  <button className="btn-buy">Thêm vào giỏ</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Phenikaa University - Dự án Web Nâng cao (Nhóm Hoa Cải Đỏ)</p>
      </footer>
    </div>
  );
}

export default App;
