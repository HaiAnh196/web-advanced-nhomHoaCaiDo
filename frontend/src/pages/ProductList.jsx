import { useState, useEffect } from "react";
import api from "../utils/api";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="home-layout">
      <Sidebar />
      <div className="home-main-content">
        <div className="product-list-page">
          <h2>Sản phẩm nổi bật</h2>
          <div className="product-grid">
            {loading ? (
              <p>Đang tải dữ liệu sản phẩm...</p>
            ) : products.length === 0 ? (
              <p>Không tìm thấy sản phẩm nào.</p>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;


