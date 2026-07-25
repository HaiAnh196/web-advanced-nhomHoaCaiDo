import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";
import { Lock, User, Eye, EyeOff, UserPlus, Store } from "lucide-react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      const msg = "Mật khẩu xác nhận không trùng khớp!";
      setError(msg);
      addToast(msg, "error");
      return;
    }

    setLoading(true);
    api
      .post("/auth/register", { username, password })
      .then(() => {
        addToast("Tạo tài khoản thành công! Vui lòng đăng nhập.", "success");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Lỗi đăng ký:", err);
        const msg = err.response?.data?.message || "Tên đăng nhập đã tồn tại hoặc không hợp lệ!";
        setError(msg);
        addToast(msg, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-page-container">
      <div className="auth-glass-card">
        <div className="auth-brand-header">
          <div className="auth-logo-icon">
            <Store size={28} />
          </div>
          <h2>Tạo Tài Khoản Mới</h2>
          <p>Tham gia cộng đồng mua sắm HoaCaiDo Phenikaa</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-field">
            <label htmlFor="regUsername">Tên đăng nhập *</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input
                id="regUsername"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập muốn tạo"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="regPassword">Mật khẩu *</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                id="regPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                className="btn-toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="regConfirmPassword">Xác nhận mật khẩu *</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                id="regConfirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? "Đang xử lý..." : <><UserPlus size={18} /> Đăng Ký Tài Khoản</>}
          </button>
        </form>

        <div className="auth-footer-links">
          <span>Đã có tài khoản?</span>
          <Link to="/login">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
