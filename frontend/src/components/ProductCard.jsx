import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const badgeText = product.badge || "Trả góp 0% trả trước 0đ";
  const subBannerText = product.subBanner || "Sản phẩm chính hãng bảo hành 24 tháng";
  const ratingVal = product.rating || 5.0;
  const reviewsCount = product.reviewCount || 46;
  const oldPriceVal = product.oldPrice || Math.round(product.price * 1.1);
  const eduPriceVal = product.eduPrice || Math.round(product.price * 0.995);
  const vipPriceVal = product.vipPrice || Math.round(product.price * 0.99);
  const promoText = product.promotionText || "Tặng gói bảo hành 2 năm trị giá cao cấp";
  const extraCount = product.extraPromotions || 3;

  return (
    <div className="product-card-box">
      <Link to={`/product/${product.id}`} className="product-card-link">
        {/* Badge góc trên bên trái */}
        <div className="product-top-badge">{badgeText}</div>

        {/* Khung ảnh sản phẩm */}
        <div className="product-image-wrapper">
          <img src={product.imageUrl} alt={product.name} className="product-img" />
        </div>

        {/* Sub banner bảo hành dưới ảnh */}
        {subBannerText && (
          <div className="product-sub-banner">
            <span className="sub-banner-text">{subBannerText}</span>
          </div>
        )}

        {/* Tên sản phẩm */}
        <h3 className="product-box-title">{product.name}</h3>

        {/* Giá hiện tại và giá cũ */}
        <div className="product-price-row">
          <span className="price-current">{product.price.toLocaleString()} ₫</span>
          {oldPriceVal > product.price && (
            <span className="price-old">{oldPriceVal.toLocaleString()} ₫</span>
          )}
        </div>

        {/* Đánh giá sao */}
        <div className="product-rating-row">
          <Star size={14} className="star-icon-filled" />
          <span className="rating-text">({reviewsCount} đánh giá)</span>
        </div>

        {/* Khu vực ưu đãi thành viên */}
        <div className="product-member-perks">
          <div className="perk-item">
            <span className="perk-label">Ưu đãi Edu</span>
            <span className="perk-value">{eduPriceVal.toLocaleString()} ₫</span>
          </div>
          <div className="perk-item">
            <span className="perk-label">Khách hàng thân thiết</span>
            <span className="perk-value">{vipPriceVal.toLocaleString()} ₫</span>
          </div>
        </div>

        {/* Khung quà tặng / Khuyến mãi màu xám */}
        <div className="product-promo-box">
          <p className="promo-box-text">{promoText}</p>
        </div>

        {/* Dòng khuyến mãi khác */}
        <div className="product-extra-promos">
          + {extraCount} Khuyến mãi khác
        </div>

        {/* Nút thêm vào giỏ */}
        <button className="btn-add-to-cart-box" onClick={handleAddToCart}>
          <ShoppingBag size={16} /> Thêm vào giỏ
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
