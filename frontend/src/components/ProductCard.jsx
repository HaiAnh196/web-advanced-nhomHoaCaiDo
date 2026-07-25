import { Link } from "react-router-dom";
import { Star, ShoppingBag, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Đã thêm "${product.name}" vào giỏ hàng!`, "success");
  };

  const badgeText = product.badge || "Trả góp 0% trả trước 0đ";
  const subBannerText = product.subBanner || "Chính hãng - Bảo hành 24 tháng";
  const ratingVal = product.rating || 5.0;
  const reviewsCount = product.reviewCount || 46;
  const oldPriceVal = product.oldPrice || Math.round(product.price * 1.12);
  const eduPriceVal = product.eduPrice || Math.round(product.price * 0.99);
  const vipPriceVal = product.vipPrice || Math.round(product.price * 0.98);
  const promoText = product.promotionText || "Tặng gói bảo hành cao cấp & Quà Phenikaa Uni";
  const extraCount = product.extraPromotions || 3;

  // Tính phần trăm giảm giá
  const discountPercent = oldPriceVal > product.price 
    ? Math.round(((oldPriceVal - product.price) / oldPriceVal) * 100)
    : 0;

  return (
    <div className="product-card-box">
      <Link to={`/product/${product.id}`} className="product-card-link">
        {/* Badge góc trên bên trái */}
        <div className="product-top-badge">{badgeText}</div>

        {/* Tag giảm giá phần trăm góc phải */}
        {discountPercent > 0 && (
          <div className="product-discount-tag">
            <Tag size={12} /> -{discountPercent}%
          </div>
        )}

        {/* Khung ảnh sản phẩm */}
        <div className="product-image-wrapper">
          <img src={product.imageUrl} alt={product.name} className="product-img" loading="lazy" />
        </div>

        {/* Sub banner bảo hành dưới ảnh */}
        {subBannerText && (
          <div className="product-sub-banner">
            <ShieldCheck size={14} className="sub-banner-icon" />
            <span className="sub-banner-text">{subBannerText}</span>
          </div>
        )}

        {/* Tên sản phẩm */}
        <h3 className="product-box-title" title={product.name}>{product.name}</h3>

        {/* Giá hiện tại và giá cũ */}
        <div className="product-price-row">
          <span className="price-current">{product.price.toLocaleString()} ₫</span>
          {oldPriceVal > product.price && (
            <span className="price-old">{oldPriceVal.toLocaleString()} ₫</span>
          )}
        </div>

        {/* Đánh giá sao */}
        <div className="product-rating-row">
          <div className="stars-wrapper">
            <Star size={14} className="star-icon-filled" />
            <span className="rating-score">{ratingVal.toFixed(1)}</span>
          </div>
          <span className="rating-text">({reviewsCount} đánh giá)</span>
        </div>

        {/* Khu vực ưu đãi thành viên */}
        <div className="product-member-perks">
          <div className="perk-item">
            <span className="perk-label">Ưu đãi Edu:</span>
            <span className="perk-value">{eduPriceVal.toLocaleString()} ₫</span>
          </div>
          <div className="perk-item">
            <span className="perk-label">Phenikaa VIP:</span>
            <span className="perk-value">{vipPriceVal.toLocaleString()} ₫</span>
          </div>
        </div>

        {/* Khung quà tặng / Khuyến mãi */}
        <div className="product-promo-box">
          <p className="promo-box-text">🎁 {promoText}</p>
        </div>

        {/* Dòng khuyến mãi khác */}
        <div className="product-extra-promos">
          + {extraCount} Khuyến mãi hấp dẫn khác
        </div>

        {/* Nút thêm vào giỏ */}
        <button className="btn-add-to-cart-box" onClick={handleAddToCart}>
          <ShoppingBag size={16} /> Thêm vào giỏ hàng
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
