function Cart() {
  return (
    <div className="cart-page" style={{ padding: "20px" }}>
      <h2>Giỏ hàng của bạn</h2>
      <p>Giỏ hàng hiện tại đang trống.</p>
      {/* Sau này chúng ta sẽ lưu giỏ hàng vào State hoặc LocalStorage và hiển thị tại đây */}
    </div>
  );
}

export default Cart;
