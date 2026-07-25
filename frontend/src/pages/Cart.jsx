import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft, CreditCard, Tag, Check, ArrowRight } from "lucide-react";
import CheckoutModal from "../components/CheckoutModal";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { addToast } = useToast();

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "HOACAIDO") {
      setDiscountPercent(10);
      setIsCouponApplied(true);
      addToast("Áp dụng mã HOACAIDO giảm 10% thành công!", "success");
    } else {
      addToast("Mã giảm giá không hợp lệ hoặc đã hết hạn!", "error");
    }
  };

  const discountAmount = Math.round((totalPrice * discountPercent) / 100);
  const finalTotal = Math.max(0, totalPrice - discountAmount);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="empty-cart-icon-wrapper">
          <ShoppingBag size={64} className="empty-cart-icon" />
        </div>
        <h2>Giỏ hàng của bạn đang trống!</h2>
        <p>Hãy khám phá các sản phẩm tuyệt vời từ cửa hàng HoaCaiDo Phenikaa Uni nhé.</p>
        <Link to="/" className="btn-shop-now">
          <ArrowLeft size={18} /> Khám phá cửa hàng ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h2 className="cart-page-title">Giỏ hàng của bạn ({cartItems.reduce((s, i) => s + i.quantity, 0)} sản phẩm)</h2>

      <div className="cart-layout-grid">
        {/* Cột Danh sách sản phẩm */}
        <div className="cart-items-card">
          <div className="cart-header-row">
            <span>Sản phẩm</span>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
            <span>Thao tác</span>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div className="cart-product-info">
                <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                <div>
                  <span className="item-category">{item.category}</span>
                  <h4 className="item-title">{item.name}</h4>
                </div>
              </div>

              <div className="cart-price">
                {item.price.toLocaleString()} ₫
              </div>

              {/* Tăng giảm số lượng */}
              <div className="qty-picker">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <div className="cart-subtotal">
                {(item.price * item.quantity).toLocaleString()} ₫
              </div>

              <button 
                onClick={() => {
                  removeFromCart(item.id);
                  addToast(`Đã xóa "${item.name}" khỏi giỏ hàng`, "info");
                }}
                className="btn-remove-item"
                title="Xóa sản phẩm"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div className="cart-bottom-actions">
            <Link to="/" className="btn-continue-shopping">
              <ArrowLeft size={16} /> Tiếp tục chọn sản phẩm khác
            </Link>
          </div>
        </div>

        {/* Cột Tóm tắt đơn hàng bên phải */}
        <div className="cart-summary-card">
          <h3>Tóm tắt đơn hàng</h3>

          {/* Ô Nhập Mã Giảm Giá */}
          <form className="coupon-form" onSubmit={handleApplyCoupon}>
            <div className="coupon-input-wrapper">
              <Tag size={16} className="coupon-icon" />
              <input
                type="text"
                placeholder="Nhập mã 'HOACAIDO'"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={isCouponApplied}
              />
              <button type="submit" disabled={isCouponApplied || !couponCode}>
                {isCouponApplied ? <Check size={16} /> : "Áp dụng"}
              </button>
            </div>
            {isCouponApplied && (
              <p className="coupon-success-text">✔ Đã giảm 10% cho toàn bộ đơn hàng</p>
            )}
          </form>

          <hr className="summary-divider" />

          <div className="summary-row">
            <span>Tạm tính:</span>
            <strong>{totalPrice.toLocaleString()} ₫</strong>
          </div>

          {discountAmount > 0 && (
            <div className="summary-row discount">
              <span>Giảm giá mã quà tặng:</span>
              <strong className="discount-tag">-{discountAmount.toLocaleString()} ₫</strong>
            </div>
          )}

          <div className="summary-row">
            <span>Phí vận chuyển:</span>
            <span className="free-ship-badge">Miễn phí 100%</span>
          </div>

          <hr className="summary-divider" />

          <div className="summary-row total-row">
            <span>Tổng cộng thanh toán:</span>
            <strong className="total-price-text">{finalTotal.toLocaleString()} ₫</strong>
          </div>

          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="btn-proceed-checkout"
          >
            <CreditCard size={20} /> Tiến hành thanh toán ngay <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Modal Thanh Toán Checkout */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        discountAmount={discountAmount}
      />
    </div>
  );
}

export default Cart;
