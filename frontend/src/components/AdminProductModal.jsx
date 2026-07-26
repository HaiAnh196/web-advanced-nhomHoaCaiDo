import { useState } from "react";
import { X, Save, Package, DollarSign, Tag, Image, FileText, ShieldAlert, Upload, Trash2 } from "lucide-react";

function AdminProductModal({ isOpen, onClose, onSave, editingProduct }) {
  const [prevProduct, setPrevProduct] = useState(editingProduct);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [formData, setFormData] = useState({
    name: "",
    category: "Điện thoại",
    price: "",
    oldPrice: "",
    stock: "10",
    badge: "Trả góp 0% trả trước 0đ",
    imageUrl: "",
    description: "",
  });

  const [imageInputMode, setImageInputMode] = useState("file"); // 'file' hoặc 'url'

  const categories = [
    "Điện thoại",
    "iPhone",
    "Samsung",
    "Xiaomi",
    "Phụ kiện",
    "Balo",
    "Bình Nước",
  ];

  if (editingProduct !== prevProduct || isOpen !== prevIsOpen) {
    setPrevProduct(editingProduct);
    setPrevIsOpen(isOpen);
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        category: editingProduct.category || "Điện thoại",
        price: editingProduct.price || "",
        oldPrice: editingProduct.oldPrice || "",
        stock: editingProduct.stock !== undefined ? editingProduct.stock : "10",
        badge: editingProduct.badge || "Trả góp 0% trả trước 0đ",
        imageUrl: editingProduct.imageUrl || "",
        description: editingProduct.description || "",
      });
      setImageInputMode(editingProduct.imageUrl && editingProduct.imageUrl.startsWith("data:") ? "file" : "url");
    } else {
      setFormData({
        name: "",
        category: "Điện thoại",
        price: "",
        oldPrice: "",
        stock: "20",
        badge: "Chính hãng Phenikaa",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
        description: "",
      });
      setImageInputMode("file");
    }
  }

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Đọc file ảnh tải lên trực tiếp từ máy tính
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file ảnh không được vượt quá 5MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.imageUrl) {
      alert("Vui lòng điền các trường bắt buộc (Tên, Giá, Ảnh)!");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : Math.round(Number(formData.price) * 1.15),
      stock: Number(formData.stock) || 10,
    };

    onSave(payload);
  };

  return (
    <div className="modal-overlay">
      <div className="admin-modal-card">
        <div className="admin-modal-header">
          <div className="header-title-box">
            <Package className="modal-icon" size={22} />
            <h3>{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-body">
          <div className="form-grid-2col">
            <div className="form-group">
              <label><FileText size={15} /> Tên sản phẩm *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ví dụ: iPhone 17 Pro Max 256GB"
                required
              />
            </div>

            <div className="form-group">
              <label><Tag size={15} /> Danh mục *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><DollarSign size={15} /> Giá bán (VNĐ) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ví dụ: 29990000"
                required
              />
            </div>

            <div className="form-group">
              <label><DollarSign size={15} /> Giá gốc niêm yết (VNĐ)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="Ví dụ: 33990000"
              />
            </div>

            <div className="form-group">
              <label><Package size={15} /> Số lượng tồn kho</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Ví dụ: 50"
              />
            </div>

            <div className="form-group">
              <label><ShieldAlert size={15} /> Nhãn khuyến mãi (Badge)</label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="Ví dụ: Trả góp 0% trả trước 0đ"
              />
            </div>
          </div>

          {/* KHU VỰC CHỌN VÀ TẢI ẢNH TRỰC TIẾP */}
          <div className="form-group image-upload-group">
            <div className="image-mode-toggle-row">
              <label><Image size={15} /> Hình ảnh sản phẩm *</label>
              <div className="toggle-mode-btns">
                <button
                  type="button"
                  className={`btn-mode-tab ${imageInputMode === "file" ? "active" : ""}`}
                  onClick={() => setImageInputMode("file")}
                >
                  <Upload size={14} /> Tải ảnh từ máy
                </button>
                <button
                  type="button"
                  className={`btn-mode-tab ${imageInputMode === "url" ? "active" : ""}`}
                  onClick={() => setImageInputMode("url")}
                >
                  <Image size={14} /> Dán URL ảnh
                </button>
              </div>
            </div>

            {imageInputMode === "file" ? (
              <div className="file-upload-dropzone">
                <input
                  type="file"
                  id="adminProductFileInput"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <label htmlFor="adminProductFileInput" className="btn-browse-file">
                  <Upload size={20} /> Chọn file ảnh từ máy tính
                </label>
                <span className="file-hint-text">Hỗ trợ các định dạng PNG, JPG, JPEG, WEBP (Dưới 5MB)</span>
              </div>
            ) : (
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Dán link ảnh tại đây (https://...)"
              />
            )}

            {/* XEM TRƯỚC ẢNH */}
            {formData.imageUrl && (
              <div className="admin-img-preview-box">
                <img
                  src={formData.imageUrl}
                  alt="Xem trước sản phẩm"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="img-preview-info">
                  <strong>Ảnh xem trước</strong>
                  <span>{formData.imageUrl.startsWith("data:") ? "Ảnh tải lên từ tệp cục bộ" : "Đường dẫn URL ảnh"}</span>
                </div>
                <button type="button" className="btn-remove-preview-img" onClick={handleRemoveImage} title="Xóa ảnh">
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label><FileText size={15} /> Mô tả sản phẩm</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Nhập mô tả đặc điểm nổi bật của sản phẩm..."
            />
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn-submit-save">
              <Save size={18} /> {editingProduct ? "Lưu cập nhật" : "Tạo sản phẩm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductModal;
