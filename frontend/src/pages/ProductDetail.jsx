import { useParams } from "react-router-dom";

function ProductDetail() {
  // useParams giúp lấy các tham số truyền trên URL, ví dụ: /product/123 -> id = "123"
  const { id } = useParams();

  return (
    <div className="product-detail-page" style={{ padding: "20px" }}>
      <h2>Chi tiết sản phẩm</h2>
      <p>Đang xem chi tiết sản phẩm có ID: <strong>{id}</strong></p>
      {/* Sau này chúng ta sẽ gọi API get sản phẩm theo ID để hiển thị thông tin chi tiết */}
    </div>
  );
}

export default ProductDetail;
