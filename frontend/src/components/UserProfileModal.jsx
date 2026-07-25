import { useState, useEffect } from "react";
import { X, User, Phone, Mail, MapPin, Save, ShieldCheck } from "lucide-react";
import { useToast } from "../context/ToastContext";

function UserProfileModal({ isOpen, onClose, onUpdateUsername }) {
  const { addToast } = useToast();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (isOpen) {
      setUsername(localStorage.getItem("username") || "Khách hàng");
      setPhone(localStorage.getItem("user_phone") || "0987654321");
      setEmail(localStorage.getItem("user_email") || "khachhang@phenikaa.edu.vn");
      setAddress(localStorage.getItem("user_address") || "Đại học Phenikaa, Yên Nghĩa, Hà Đông, Hà Nội");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      addToast("Tên tài khoản không được để trống!", "error");
      return;
    }

    localStorage.setItem("username", username.trim());
    localStorage.setItem("user_phone", phone.trim());
    localStorage.setItem("user_email", email.trim());
    localStorage.setItem("user_address", address.trim());

    if (onUpdateUsername) {
      onUpdateUsername(username.trim());
    }

    addToast("Cập nhật thông tin cá nhân thành công!", "success");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="profile-modal-card">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="profile-modal-header">
          <div className="profile-avatar-circle">
            {username.charAt(0).toUpperCase()}
          </div>
          <h3>Chỉnh Sửa Thông Tin Cá Nhân</h3>
          <p>Cập nhật thông tin nhận hàng và tài khoản của bạn</p>
        </div>

        <form onSubmit={handleSave} className="profile-form">
          <div className="form-group">
            <label><User size={16} /> Tên hiển thị tài khoản *</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên hiển thị"
              required
            />
          </div>

          <div className="form-group">
            <label><Phone size={16} /> Số điện thoại *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại nhận hàng"
              required
            />
          </div>

          <div className="form-group">
            <label><Mail size={16} /> Địa chỉ Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email"
              required
            />
          </div>

          <div className="form-group">
            <label><MapPin size={16} /> Địa chỉ giao hàng mặc định *</label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ nhận hàng chi tiết"
              required
            />
          </div>

          <div className="profile-footer-actions">
            <button type="button" className="btn-cancel-profile" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn-save-profile">
              <Save size={18} /> Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfileModal;
