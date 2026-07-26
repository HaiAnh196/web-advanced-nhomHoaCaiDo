import { useState } from "react";
import { X, Save, Ticket, Image, FileText, Upload, Sparkles, Link as LinkIcon, Palette } from "lucide-react";

const GRADIENT_PRESETS = [
  { name: "Navy Bất Tận", value: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)" },
  { name: "Đỏ Rực Nắng", value: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)" },
  { name: "Xanh Emerald", value: "linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)" },
  { name: "Cam Titan", value: "linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #ea580c 100%)" },
  { name: "Đen Slate VIP", value: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)" },
];

function AdminBannerModal({ isOpen, onClose, onSave, editingBanner }) {
  const [prevBanner, setPrevBanner] = useState(editingBanner);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [formData, setFormData] = useState({
    tabTitle: "",
    title: "",
    subtitle: "",
    badge: "ƯU ĐÃI NỔI BẬT",
    bgGradient: GRADIENT_PRESETS[0].value,
    image: "",
    link: "/",
    status: "Active",
  });

  const [imageInputMode, setImageInputMode] = useState("file");
  const gradientPresets = GRADIENT_PRESETS;

  if (editingBanner !== prevBanner || isOpen !== prevIsOpen) {
    setPrevBanner(editingBanner);
    setPrevIsOpen(isOpen);
    if (editingBanner) {
      setFormData({
        tabTitle: editingBanner.tabTitle || "",
        title: editingBanner.title || "",
        subtitle: editingBanner.subtitle || "",
        badge: editingBanner.badge || "ƯU ĐÃI NỔI BẬT",
        bgGradient: editingBanner.bgGradient || GRADIENT_PRESETS[0].value,
        image: editingBanner.image || "",
        link: editingBanner.link || "/",
        status: editingBanner.status || "Active",
      });
      setImageInputMode(editingBanner.image && editingBanner.image.startsWith("data:") ? "file" : "url");
    } else {
      setFormData({
        tabTitle: "",
        title: "",
        subtitle: "",
        badge: "ƯU ĐÃI ĐỘC QUYỀN",
        bgGradient: GRADIENT_PRESETS[0].value,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
        link: "/",
        status: "Active",
      });
      setImageInputMode("file");
    }
  }

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file ảnh không được vượt quá 5MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image || !formData.tabTitle) {
      alert("Vui lòng điền các trường bắt buộc (Tiêu đề Tab, Tiêu đề Banner, Ảnh)!");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="admin-modal-card">
        <div className="admin-modal-header">
          <div className="header-title-box">
            <Ticket className="modal-icon" size={22} />
            <h3>{editingBanner ? "Chỉnh sửa Banner Khuyến Mãi" : "Thêm Banner Khuyến Mãi Mới"}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-body">
          <div className="form-grid-2col">
            <div className="form-group">
              <label><FileText size={15} /> Tiêu đề Tab bên dưới *</label>
              <input
                type="text"
                name="tabTitle"
                value={formData.tabTitle}
                onChange={handleChange}
                placeholder="Ví dụ: Galaxy S26 Series giá tốt"
                required
              />
            </div>

            <div className="form-group">
              <label><Sparkles size={15} /> Nhãn Badge nổi bật</label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="Ví dụ: GIẢM 20% CHO SINH VIÊN"
              />
            </div>

            <div className="form-group">
              <label><FileText size={15} /> Tiêu đề chính Banner *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ví dụ: THU CŨ ĐỔI XANH"
                required
              />
            </div>

            <div className="form-group">
              <label><FileText size={15} /> Tiêu đề phụ (Subtitle)</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Ví dụ: Tái tạo năng lượng - Giá từ 399k"
              />
            </div>

            <div className="form-group">
              <label><LinkIcon size={15} /> Đường dẫn liên kết (Link)</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Ví dụ: /category/dien-thoai"
              />
            </div>

            <div className="form-group">
              <label><Palette size={15} /> Chọn tông màu nền Gradient</label>
              <select
                name="bgGradient"
                value={formData.bgGradient}
                onChange={handleChange}
              >
                {gradientPresets.map((preset, idx) => (
                  <option key={idx} value={preset.value}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CHỌN VÀ TẢI ẢNH BANNER */}
          <div className="form-group image-upload-group">
            <div className="image-mode-toggle-row">
              <label><Image size={15} /> Hình ảnh Banner *</label>
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
                  id="adminBannerFileInput"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <label htmlFor="adminBannerFileInput" className="btn-browse-file">
                  <Upload size={20} /> Chọn file ảnh banner từ máy tính
                </label>
                <span className="file-hint-text">Khuyên dùng ảnh định dạng PNG/JPG sắc nét</span>
              </div>
            ) : (
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Dán link ảnh tại đây (https://...)"
              />
            )}

            {/* PREVIEW BANNER LIVE CARD */}
            {formData.image && (
              <div className="banner-live-preview-card" style={{ background: formData.bgGradient }}>
                <div className="preview-text">
                  <span className="preview-badge">{formData.badge || "BADGE"}</span>
                  <h4 className="preview-title">{formData.title || "TIÊU ĐỀ BANNER"}</h4>
                  <p className="preview-sub">{formData.subtitle || "Tiêu đề phụ của banner"}</p>
                </div>
                <div className="preview-img-wrapper">
                  <img src={formData.image} alt="Banner Preview" onError={(e) => (e.target.style.display = 'none')} />
                </div>
              </div>
            )}
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn-submit-save">
              <Save size={18} /> {editingBanner ? "Lưu thay đổi Banner" : "Tạo Banner Mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminBannerModal;
