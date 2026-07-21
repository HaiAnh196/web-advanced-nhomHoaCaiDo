import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ShoppingCart, ShieldCheck } from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
        setError("Không thể tải thông tin sản phẩm. Sản phẩm có thể không tồn tại!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Đang tải thông tin sản phẩm...</div>;
  }

  if (error || !product) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#c62828" }}>
        <h3>{error || "Sản phẩm không tồn tại!"}</h3>
        <Link to="/" style={{ color: "#e53935", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "15px" }}>
          <ArrowLeft size={16} /> Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container" style={{ maxWidth: "1000px", margin: "20px auto", padding: "0 20px" }}>
      <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#555", textDecoration: "none", marginBottom: "20px" }}>
        <ArrowLeft size={16} /> Quay lại danh sách sản phẩm
      </Link>

      <div className="product-detail-layout" style={{
        display: "flex",
        gap: "40px",
        background: "#fff",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        flexWrap: "wrap"
      }}>
        {/* Ảnh sản phẩm */}
        <div className="product-detail-image" style={{ flex: "1 1 400px", maxWidth: "450px" }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ width: "100%", borderRadius: "12px", objectFit: "cover", aspectRatio: "1" }}
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-detail-info" style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span className="category-tag" style={{
              background: "#ffebee",
              color: "#e53935",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "15px"
            }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: "28px", color: "#333", margin: "0 0 15px 0" }}>{product.name}</h1>
            <p className="price" style={{ fontSize: "24px", color: "#e53935", fontWeight: "bold", margin: "0 0 20px 0" }}>
              {product.price.toLocaleString()} VNĐ
            </p>
            <div style={{ height: "1px", background: "#eee", margin: "15px 0" }} />
            <p style={{ color: "#666", lineHeight: "1.6", margin: "0 0 20px 0" }}>
              {product.description}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#666", fontSize: "14px", marginBottom: "20px" }}>
              <ShieldCheck size={18} color="#2e7d32" />
              <span>Còn lại: <strong>{product.stock}</strong> sản phẩm trong kho</span>
            </div>
          </div>

          <div>
            {/* Bộ chọn số lượng */}
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
              <span style={{ fontWeight: "500", color: "#555" }}>Số lượng:</span>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ padding: "8px 15px", border: "none", background: "#f5f5f5", cursor: "pointer", fontSize: "16px" }}
                >
                  -
                </button>
                <span style={{ padding: "8px 20px", fontWeight: "600", minWidth: "20px", textAlign: "center" }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  style={{ padding: "8px 15px", border: "none", background: "#f5f5f5", cursor: "pointer", fontSize: "16px" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Nút thêm vào giỏ */}
            <button 
              onClick={handleAddToCart}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "15px",
                background: "#e53935",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              <ShoppingCart size={20} />
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
