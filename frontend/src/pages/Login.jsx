import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";
import { Lock, User, Eye, EyeOff, LogIn, Store } from "lucide-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    api
      .post("/auth/login", { username, password })
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("username", username);
        addToast(`Chào mừng ${username} đã quay trở lại!`, "success");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Lỗi đăng nhập:", err);
        const errMsg = err.response?.data?.message || "Tên đăng nhập hoặc mật khẩu không chính xác!";
        setError(errMsg);
        addToast(errMsg, "error");
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
          <h2>Đăng Nhập Tài Khoản</h2>
          <p>Chào mừng bạn đến với HoaCaiDo Phenikaa Store</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-field">
            <label htmlFor="usernameInput">Tên đăng nhập</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input
                id="usernameInput"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên tài khoản"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="passwordInput">Mật khẩu</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                id="passwordInput"
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

          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? "Đang xác thực..." : <><LogIn size={18} /> Đăng Nhập</>}
          </button>
        </form>

        <div className="auth-footer-links">
          <span>Chưa có tài khoản?</span>
          <Link to="/register">Đăng ký tài khoản ngay</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
