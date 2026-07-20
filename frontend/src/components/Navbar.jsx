import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Sau này có thể đẩy query lên URL (ví dụ: /?search=...)
    alert("Tìm kiếm sản phẩm: " + searchQuery);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          HoaCaiDo
        </Link>
      </div>

      {/* Thanh tìm kiếm */}
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Tìm kiếm đồng phục, giáo trình, phụ kiện..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn-search">
          <Search size={18} />
        </button>
      </form>

      {/* Điều hướng bên phải */}
      <nav className="nav-links">
        <Link to="/" className="nav-link">Cửa hàng</Link>
        
        <Link to="/cart" className="nav-link cart-icon-wrapper">
          <ShoppingCart size={20} />
          <span className="cart-badge">0</span>
        </Link>
        
        <Link to="/login" className="btn-login-icon">
          <User size={18} />
          <span>Đăng nhập <br /> Tài khoản</span>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
