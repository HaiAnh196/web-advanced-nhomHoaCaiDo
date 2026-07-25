import { useState } from "react";
import { X, CheckCircle, CreditCard, QrCode, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function CheckoutModal({ isOpen, onClose, discountAmount = 0 }) {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addToast } = useToast();

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qr"); // 'qr', 'cod', 'card'
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  if (!isOpen) return null;

  const finalTotal = Math.max(0, totalPrice - discountAmount);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!fullname || !phone || !address) {
      addToast("Vui lòng điền đầy đủ thông tin giao hàng!", "error");
      return;
    }

    const code = "HCD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(code);
    setIsSuccess(true);
    clearCart();
    addToast("Đặt hàng thành công! Mã đơn hàng: " + code, "success", 5000);
  };

  const handleCloseAll = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="checkout-modal-card">
        <button className="modal-close-btn" onClick={handleCloseAll}>
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="checkout-success-view">
            <div className="success-icon-wrapper">
              <CheckCircle size={64} className="success-icon" />
            </div>
            <h2>ĐẶT HÀNG THÀNH CÔNG!</h2>
            <p className="order-code-badge">Mã đơn hàng: <strong>{orderCode}</strong></p>
            <p className="success-desc">
              Cảm ơn quý khách <strong>{fullname}</strong> đã mua hàng tại <strong>HoaCaiDo Store - Phenikaa Uni</strong>.
              Bộ phận chăm sóc khách hàng sẽ liên hệ qua SĐT <strong>{phone}</strong> để xác nhận giao hàng.
            </p>

            <div className="order-summary-box">
              <div className="summary-row">
                <span>Địa chỉ nhận hàng:</span>
                <strong>{address}</strong>
              </div>
              <div className="summary-row">
                <span>Phương thức thanh toán:</span>
                <strong>
                  {paymentMethod === "qr" ? "Chuyển khoản QR Ngân hàng" : paymentMethod === "cod" ? "Thanh toán khi nhận hàng (COD)" : "Thẻ ATM / Quốc tế"}
                </strong>
              </div>
              <div className="summary-row total">
                <span>Tổng tiền đã thanh toán:</span>
                <strong className="price-highlight">{finalTotal.toLocaleString()} ₫</strong>
              </div>
            </div>

            <button className="btn-success-close" onClick={handleCloseAll}>
              Hoàn tất & Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <form className="checkout-form-layout" onSubmit={handleSubmitOrder}>
            <h2 className="modal-title">Xác Nhận Đơn Hàng & Thanh Toán</h2>

            <div className="checkout-grid">
              {/* Thông tin giao hàng */}
              <div className="checkout-section">
                <h3>1. Thông tin người nhận</h3>
                <div className="form-group">
                  <label>Họ và tên *</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại *</label>
                  <input
                    type="tel"
                    placeholder="Ví dụ: 0987654321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ nhận hàng *</label>
                  <textarea
                    rows={3}
                    placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Phương thức thanh toán */}
              <div className="checkout-section">
                <h3>2. Phương thức thanh toán</h3>
                <div className="payment-options">
                  <label className={`payment-option ${paymentMethod === "qr" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="qr"
                      checked={paymentMethod === "qr"}
                      onChange={() => setPaymentMethod("qr")}
                    />
                    <QrCode size={20} className="option-icon" />
                    <div>
                      <strong>Quét mã QR Ngân hàng (VietQR / MoMo)</strong>
                      <p>Khuyên dùng - Xử lý đơn tự động tức thì</p>
                    </div>
                  </label>

                  <label className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <Truck size={20} className="option-icon" />
                    <div>
                      <strong>Thanh toán khi nhận hàng (COD)</strong>
                      <p>Thanh toán tiền mặt cho shipper</p>
                    </div>
                  </label>

                  <label className={`payment-option ${paymentMethod === "card" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <CreditCard size={20} className="option-icon" />
                    <div>
                      <strong>Thẻ ATM Nội địa / Visa / Mastercard</strong>
                      <p>Thanh toán qua cổng Napas</p>
                    </div>
                  </label>
                </div>

                {/* Nếu chọn QR thì hiển thị mã QR mô phỏng VietQR */}
                {paymentMethod === "qr" && (
                  <div className="qr-preview-box">
                    <p className="qr-title">Quét mã QR để chuyển khoản</p>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=HoaCaiDo_Pay_${finalTotal}`} 
                      alt="VietQR Payment Code" 
                      className="qr-img"
                    />
                    <p className="qr-note">Nội dung CK: <strong>HOACAIDO {phone || "SDT"}</strong></p>
                  </div>
                )}
              </div>
            </div>

            {/* Tóm tắt tổng tiền */}
            <div className="checkout-bottom-summary">
              <div className="summary-details">
                <span>Số lượng: <strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} món</strong></span>
                <span>Thành tiền: <strong className="price-tag">{finalTotal.toLocaleString()} ₫</strong></span>
              </div>
              <button type="submit" className="btn-confirm-checkout">
                <ShieldCheck size={20} /> Đặt hàng ngay
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;
