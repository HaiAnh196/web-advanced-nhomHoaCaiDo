import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import ProductCard from "../components/ProductCard";
import { 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  Star, 
  Zap, 
  Check, 
  ChevronRight, 
  Gift 
} from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("desc"); // 'desc', 'specs', 'warranty'

  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        // Tải các sản phẩm cùng category
        api.get("/products", { params: { category: response.data.category } })
          .then((res) => {
            setRelatedProducts(res.data.filter((p) => p.id !== response.data.id));
          })
          .catch(() => {});
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
      addToast(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`, "success");
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div className="detail-loading-box">
        <div className="spinner"></div>
        <p>Đang tải thông tin chi tiết sản phẩm...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="detail-error-box">
        <h3>{error || "Sản phẩm không tồn tại!"}</h3>
        <Link to="/" className="btn-back-home">
          <ArrowLeft size={16} /> Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const oldPriceVal = product.oldPrice || Math.round(product.price * 1.12);

  return (
    <div className="product-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav">
        <Link to="/">Trang chủ</Link>
        <ChevronRight size={14} />
        <Link to={`/?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
        <ChevronRight size={14} />
        <span className="current">{product.name}</span>
      </nav>

      {/* Hero Layout Chi Tiết */}
      <div className="product-detail-main-card">
        {/* Cột Trái: Ảnh Sản Phẩm & Gallery */}
        <div className="product-gallery-col">
          <div className="main-image-wrapper">
            <img src={product.imageUrl} alt={product.name} className="main-product-img" />
            <span className="detail-top-badge">{product.badge || "Chính hãng Phenikaa"}</span>
          </div>

          <div className="thumbnail-row">
            <div className="thumbnail-item active">
              <img src={product.imageUrl} alt="Thumb 1" />
            </div>
            <div className="thumbnail-item">
              <img src={product.imageUrl} alt="Thumb 2" />
            </div>
            <div className="thumbnail-item">
              <img src={product.imageUrl} alt="Thumb 3" />
            </div>
          </div>
        </div>

        {/* Cột Phải: Thông tin & Mua Hàng */}
        <div className="product-info-col">
          <span className="category-pill">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>

          {/* Đánh giá & Số lượng đã bán */}
          <div className="rating-sales-row">
            <div className="rating-stars">
              <Star size={16} className="star-icon-filled" />
              <strong>{product.rating || 5.0}</strong>
              <span className="review-count">({product.reviewCount || 46} đánh giá)</span>
            </div>
            <span className="divider">|</span>
            <span className="stock-badge">
              <ShieldCheck size={16} className="stock-icon" /> Còn lại {product.stock} sản phẩm
            </span>
          </div>

          {/* Khung Giá Cực Đẹp */}
          <div className="price-banner-box">
            <div className="price-left">
              <span className="detail-price-current">{product.price.toLocaleString()} ₫</span>
              {oldPriceVal > product.price && (
                <span className="detail-price-old">{oldPriceVal.toLocaleString()} ₫</span>
              )}
            </div>
            <span className="price-tag-discount">Tiết kiệm 12%</span>
          </div>

          {/* Ưu Đãi Quà Tặng */}
          <div className="detail-promo-card">
            <div className="promo-header">
              <Gift size={18} />
              <strong>ƯU ĐÃI ĐẶC QUYỀN KHI MUA HÀNG</strong>
            </div>
            <ul className="promo-list">
              <li><Check size={16} className="check-icon" /> Tặng gói bảo hành 24 tháng cao cấp Phenikaa Care</li>
              <li><Check size={16} className="check-icon" /> Giảm thêm 1% cho thành viên sinh viên Edu</li>
              <li><Check size={16} className="check-icon" /> Miễn phí giao hàng nội thành Hà Nội trong 2 giờ</li>
            </ul>
          </div>

          {/* Bộ Chọn Số Lượng & Nút Hành Động */}
          <div className="purchase-actions-box">
            <div className="quantity-selector-row">
              <span className="qty-label">Số lượng:</span>
              <div className="qty-control-box">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </div>

            <div className="btn-group-actions">
              <button className="btn-add-cart-outline" onClick={handleAddToCart}>
                <ShoppingCart size={20} /> Thêm vào giỏ hàng
              </button>
              <button className="btn-buy-now-solid" onClick={handleBuyNow}>
                <Zap size={20} /> Mua ngay lập tức
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Chi Tiết & Thông Số */}
      <div className="detail-tabs-container">
        <div className="tab-headers">
          <button 
            className={`tab-btn ${activeTab === "desc" ? "active" : ""}`}
            onClick={() => setActiveTab("desc")}
          >
            Mô tả sản phẩm
          </button>
          <button 
            className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            Thông số kỹ thuật
          </button>
          <button 
            className={`tab-btn ${activeTab === "warranty" ? "active" : ""}`}
            onClick={() => setActiveTab("warranty")}
          >
            Chính sách bảo hành
          </button>
        </div>

        <div className="tab-body-content">
          {activeTab === "desc" && (
            <div className="tab-pane">
              <h3>Mô tả chi tiết sản phẩm</h3>
              <p>{product.description}</p>
              <p>
                Sản phẩm được kiểm định chất lượng nghiêm ngặt, thiết kế chuẩn nhận diện Phenikaa Store, 
                đảm bảo độ bền cao và độ hoàn thiện tinh xảo nhất.
              </p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="tab-pane">
              <h3>Thông số kỹ thuật</h3>
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>Thương hiệu:</td>
                    <td>Phenikaa Uni Store / Apple Official</td>
                  </tr>
                  <tr>
                    <td>Danh mục:</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td>Tình trạng:</td>
                    <td>Mới 100% Nguyên Seal</td>
                  </tr>
                  <tr>
                    <td>Xuất xứ:</td>
                    <td>Chính hãng phân phối độc quyền</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "warranty" && (
            <div className="tab-pane">
              <h3>Chính sách đổi trả & Bảo hành</h3>
              <p>✔ Bảo hành 24 tháng chính hãng tại các trung tâm ủy quyền.</p>
              <p>✔ Đổi mới 1-1 trong 30 ngày nếu phát sinh lỗi từ nhà sản xuất.</p>
              <p>✔ Hỗ trợ kĩ thuật tận tâm trọn đời.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sản Phẩm Liên Quan */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2>Sản phẩm cùng danh mục</h2>
          <div className="product-grid">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
