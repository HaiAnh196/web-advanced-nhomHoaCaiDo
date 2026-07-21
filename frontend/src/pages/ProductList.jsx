import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useCart } from "../context/CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product, e) => {
    e.preventDefault(); // Tránh kích hoạt Link nếu nút nằm trong thẻ Link
    addToCart(product, 1);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <div className="product-list-page">
      <h2>Sản phẩm nổi bật</h2>
      <div className="product-grid">
        {loading ? (
          <p>Đang tải dữ liệu sản phẩm...</p>
        ) : products.length === 0 ? (
          <p>Không tìm thấy sản phẩm nào.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-card-link" style={{ textDecoration: "none", color: "inherit" }}>
                <img src={product.imageUrl} alt={product.name} />
                <div className="product-info">
                  <span className="category-tag">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="price">{product.price.toLocaleString()} VNĐ</p>
                  <button 
                    className="btn-buy" 
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
