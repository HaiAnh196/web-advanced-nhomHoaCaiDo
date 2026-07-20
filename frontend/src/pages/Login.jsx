import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/login", { username, password })
      .then((response) => {
        alert("Đăng nhập thành công! Token: " + response.data.access_token);
        // Lưu token vào localStorage để phân quyền
        localStorage.setItem("token", response.data.access_token);
      })
      .catch((error) => {
        console.error("Lỗi đăng nhập:", error);
        alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản!");
      });
  };

  return (
    <div className="login-page" style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Tên đăng nhập:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
