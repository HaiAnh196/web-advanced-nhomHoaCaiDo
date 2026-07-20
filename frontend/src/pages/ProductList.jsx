import { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

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
    <div className="product-list-page">
      <h2>Sản phẩm nổi bật</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>Đang tải dữ liệu sản phẩm...</p>
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
    </div>
  );
}

export default ProductList;
