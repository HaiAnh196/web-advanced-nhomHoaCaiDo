import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, ShoppingCart, User, LogOut, PhoneCall, ShieldCheck, MapPin, Store, UserCheck, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import UserProfileModal from "./UserProfileModal";

function Navbar() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const { totalItemsCount } = useCart();
  const { addToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username") || "Khách hàng";
    setIsLoggedIn(!!token);
    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-menu-wrapper")) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setShowUserDropdown(false);
    addToast("Đã đăng xuất thành công!", "info");
    navigate("/login");
  };

  const handleOpenProfile = () => {
    setShowUserDropdown(false);
    setIsProfileModalOpen(true);
  };

  return (
    <>
      <header className="header-clickbuy-theme">
        {/* Thanh Header Đỏ Chính */}
        <div className="header-top-bar">
          <div className="header-top-inner">
            {/* Logo Brand */}
            <div className="logo-brand-group">
              <Link to="/" className="logo-clickbuy-link">
                <Store size={26} className="brand-logo-icon" />
                <div className="brand-text">
                  <span className="brand-title">HoaCaiDo</span>
                  <span className="brand-slogan">Phenikaa Uni Store</span>
                </div>
              </Link>
            </div>

            {/* Ô Tìm Kiếm Trung Tâm */}
            <form className="clickbuy-search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Bạn cần tìm gì..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-search-icon">
                <Search size={18} />
              </button>
            </form>

            {/* Nhóm Nút Tiện Ích Bên Phải Header */}
            <div className="header-quick-links">
              {/* Pill Chọn Tỉnh Thành */}
              <div className="header-location-pill">
                <span>Xem giá tại ▾</span>
                <strong>Hà Nội</strong>
              </div>

              {/* Gọi Mua Hàng */}
              <div className="header-nav-item">
                <PhoneCall size={18} className="item-icon" />
                <div className="item-text">
                  <span>Gọi mua hàng</span>
                  <strong>1900.633.471</strong>
                </div>
              </div>

              {/* Chính sách Bảo Hành */}
              <a href="#warranty" className="header-nav-item">
                <ShieldCheck size={18} className="item-icon" />
                <div className="item-text">
                  <span>Chính sách</span>
                  <strong>Bảo Hành</strong>
                </div>
              </a>

              {/* Hệ thống cửa hàng */}
              <a href="#stores" className="header-nav-item">
                <MapPin size={18} className="item-icon" />
                <div className="item-text">
                  <span>Hệ thống</span>
                  <strong>Cửa hàng</strong>
                </div>
              </a>

              {/* Giỏ Hàng */}
              <Link to="/cart" className="header-nav-item cart-item">
                <ShoppingCart size={18} className="item-icon" />
                <div className="item-text">
                  <span>Giỏ hàng</span>
                  <strong>{totalItemsCount} món</strong>
                </div>
                {totalItemsCount > 0 && <span className="cart-badge-dot">{totalItemsCount}</span>}
              </Link>

              {/* Đăng nhập / Tài Khoản */}
              {isLoggedIn ? (
                <div className="user-menu-wrapper">
                  <button onClick={() => setShowUserDropdown(!showUserDropdown)} className="header-nav-item user-btn">
                    <User size={18} className="item-icon" />
                    <div className="item-text">
                      <span>Tài khoản</span>
                      <strong>{username}</strong>
                    </div>
                  </button>

                  {showUserDropdown && (
                    <div className="user-dropdown-menu">
                      <div className="dropdown-header">
                        <strong>{username}</strong>
                        <span></span>
                      </div>
                      <hr />
                      <button onClick={handleOpenProfile} className="dropdown-item">
                        <Edit3 size={16} /> Chỉnh sửa thông tin cá nhân
                      </button>
                      <button onClick={handleLogout} className="dropdown-item logout">
                        <LogOut size={16} /> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="header-nav-item">
                  <User size={18} className="item-icon" />
                  <div className="item-text">
                    <span>Đăng nhập</span>
                    <strong>Tài khoản</strong>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Thanh Thông Báo Chạy Ticker Màu Trắng bên dưới Header */}
        <div className="ticker-banner-wrapper">
          <div className="ticker-capsule">
            <span className="dot-red">🔴</span>
            <strong>THÁNG 7 RỰC NẮNG - QUÀ TẶNG CỰC CĂNG!</strong>
          </div>
        </div>
      </header>

      {/* Modal Chỉnh Sửa Thông Tin Cá Nhân */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onUpdateUsername={(newUsername) => setUsername(newUsername)}
      />
    </>
  );
}

export default Navbar;
