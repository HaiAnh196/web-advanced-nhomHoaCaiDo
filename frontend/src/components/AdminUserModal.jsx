import { useState } from "react";
import { X, Save, User as UserIcon, Mail, Phone, Key, Shield, UserCheck } from "lucide-react";

function AdminUserModal({ isOpen, onClose, onSave, editingUser }) {
  const [prevUser, setPrevUser] = useState(editingUser);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    role: "USER",
    status: "Active",
  });

  if (editingUser !== prevUser || isOpen !== prevIsOpen) {
    setPrevUser(editingUser);
    setPrevIsOpen(isOpen);
    if (editingUser) {
      setFormData({
        username: editingUser.username || "",
        password: editingUser.password || "",
        fullName: editingUser.fullName || "",
        email: editingUser.email || "",
        phone: editingUser.phone || "",
        role: editingUser.role || "USER",
        status: editingUser.status || "Active",
      });
    } else {
      setFormData({
        username: "",
        password: "",
        fullName: "",
        email: "",
        phone: "",
        role: "USER",
        status: "Active",
      });
    }
  }

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Vui lòng điền Tên đăng nhập và Mật khẩu!");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="admin-modal-card">
        <div className="admin-modal-header">
          <div className="header-title-box">
            <UserIcon className="modal-icon" size={22} />
            <h3>{editingUser ? "Chỉnh sửa Tài Khoản Người Dùng" : "Thêm Tài Khoản Người Dùng Mới"}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-body">
          <div className="form-grid-2col">
            <div className="form-group">
              <label><UserIcon size={15} /> Tên đăng nhập (Username) *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ví dụ: sinhvien_phenikaa"
                required
                disabled={!!editingUser}
              />
            </div>

            <div className="form-group">
              <label><Key size={15} /> Mật khẩu (Password) *</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu..."
                required
              />
            </div>

            <div className="form-group">
              <label><UserIcon size={15} /> Họ và Tên đầy đủ</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ví dụ: Nguyễn Văn An"
              />
            </div>

            <div className="form-group">
              <label><Mail size={15} /> Email liên hệ</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ví dụ: an.nguyen@student.phenikaa-uni.edu.vn"
              />
            </div>

            <div className="form-group">
              <label><Phone size={15} /> Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ví dụ: 0988123456"
              />
            </div>

            <div className="form-group">
              <label><Shield size={15} /> Quyền hạn (Role)</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="USER">USER - Khách hàng / Sinh viên</option>
                <option value="ADMIN">ADMIN - Quản trị viên hệ thống</option>
              </select>
            </div>

            <div className="form-group">
              <label><UserCheck size={15} /> Trạng thái tài khoản</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active - Đang hoạt động bình thường</option>
                <option value="Blocked">Blocked - Tạm khóa tài khoản</option>
              </select>
            </div>
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn-submit-save">
              <Save size={18} /> {editingUser ? "Lưu thay đổi Tài khoản" : "Tạo Tài Khoản Mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUserModal;
