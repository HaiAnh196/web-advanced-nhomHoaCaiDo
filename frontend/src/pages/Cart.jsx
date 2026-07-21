import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đang được xử lý.");
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container" style={{
        textAlign: "center",
        padding: "60px 20px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        maxWidth: "600px",
        margin: "40px auto"
      }}>
        <ShoppingBag size={64} color="#ccc" style={{ marginBottom: "20px" }} />
        <h2 style={{ color: "#333", marginBottom: "10px" }}>Giỏ hàng trống!</h2>
        <p style={{ color: "#666", marginBottom: "30px" }}>Hãy chọn những món quà tuyệt vời từ trường Đại học Phenikaa nhé.</p>
        <Link to="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#e53935",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600"
        }}>
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container" style={{ maxWidth: "1000px", margin: "20px auto", padding: "0 20px" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Giỏ hàng của bạn</h2>

      <div className="cart-layout" style={{
        display: "flex",
        gap: "30px",
        flexWrap: "wrap"
      }}>
        {/* Danh sách sản phẩm bên trái */}
        <div className="cart-items-list" style={{ flex: "1 1 600px", background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-row" style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "15px 0",
              borderBottom: "1px solid #eee",
              flexWrap: "wrap"
            }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }} />
              
              <div style={{ flex: "1 1 200px" }}>
                <span style={{ fontSize: "12px", color: "#e53935", fontWeight: "600", textTransform: "uppercase" }}>{item.category}</span>
                <h4 style={{ margin: "5px 0", color: "#333", fontSize: "16px" }}>{item.name}</h4>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Đơn giá: {item.price.toLocaleString()} VNĐ</p>
              </div>

              {/* Tăng giảm số lượng */}
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "6px", overflow: "hidden" }}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ padding: "5px 12px", border: "none", background: "#f9f9f9", cursor: "pointer" }}
                >
                  -
                </button>
                <span style={{ padding: "5px 15px", fontWeight: "600", fontSize: "14px" }}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ padding: "5px 12px", border: "none", background: "#f9f9f9", cursor: "pointer" }}
                >
                  +
                </button>
              </div>

              <div style={{ textAlign: "right", minWidth: "120px" }}>
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>{(item.price * item.quantity).toLocaleString()} VNĐ</p>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ background: "none", border: "none", color: "#999", cursor: "pointer", padding: "5px", transition: "color 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.color = "#e53935"}
                onMouseOut={(e) => e.currentTarget.style.color = "#999"}
                title="Xóa sản phẩm"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#666", textDecoration: "none", fontSize: "14px" }}>
              <ArrowLeft size={16} /> Tiếp tục mua sắm
            </Link>
          </div>
        </div>

        {/* Tóm tắt đơn hàng bên phải */}
        <div className="cart-summary-card" style={{
          flex: "1 1 300px",
          background: "#fff",
          borderRadius: "16px",
          padding: "25px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          alignSelf: "flex-start",
          boxSizing: "border-box"
        }}>
          <h3 style={{ color: "#333", margin: "0 0 20px 0" }}>Tổng đơn hàng</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "#666" }}>
            <span>Tạm tính:</span>
            <span>{totalPrice.toLocaleString()} VNĐ</span>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", color: "#666" }}>
            <span>Phí vận chuyển:</span>
            <span style={{ color: "#2e7d32", fontWeight: "500" }}>Miễn phí</span>
          </div>

          <div style={{ height: "1px", background: "#eee", marginBottom: "20px" }} />

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px", fontSize: "18px", fontWeight: "bold", color: "#333" }}>
            <span>Tổng cộng:</span>
            <span style={{ color: "#e53935" }}>{totalPrice.toLocaleString()} VNĐ</span>
          </div>

          <button 
            onClick={handleCheckout}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "14px",
              background: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
          >
            <CreditCard size={18} />
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
