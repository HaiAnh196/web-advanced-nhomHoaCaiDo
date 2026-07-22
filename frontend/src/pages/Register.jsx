import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    api
      .post("/auth/register", { username, password })
      .then((response) => {
        alert("Đăng ký tài khoản thành công! Hãy đăng nhập.");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Lỗi đăng ký:", err);
        setError(
          err.response?.data?.message ||
            "Đăng ký thất bại. Tên đăng nhập có thể đã tồn tại!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-container" style={{ padding: "40px 20px", maxWidth: "450px", margin: "40px auto" }}>
      <div className="auth-card" style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.18)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>Tạo Tài Khoản</h2>
        
        {error && (
          <div style={{
            background: "#ffebee",
            color: "#c62828",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
            fontSize: "14px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#555" }}>
              Tên đăng nhập:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box"
              }}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#555" }}>
              Mật khẩu:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box"
              }}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#555" }}>
              Xác nhận mật khẩu:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box"
              }}
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#e53935",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
          >
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
          Đã có tài khoản?{" "}
          <Link to="/login" style={{ color: "#e53935", fontWeight: "600", textDecoration: "none" }}>
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
