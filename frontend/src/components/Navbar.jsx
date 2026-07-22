import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItemsCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Đẩy query lên URL
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Đã đăng xuất thành công!");
    navigate("/login");
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
          placeholder="Bạn muốn tìm gì.."
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
          {totalItemsCount > 0 && <span className="cart-badge">{totalItemsCount}</span>}
        </Link>
        
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className="btn-login-icon" 
            style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </button>
        ) : (
          <Link to="/login" className="btn-login-icon">
            <User size={18} />
            <span>Đăng nhập</span>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
