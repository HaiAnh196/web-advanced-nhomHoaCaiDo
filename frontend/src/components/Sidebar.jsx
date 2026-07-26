import { useState, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  RotateCcw,
  BatteryCharging,
  ChevronRight,
  Zap,
  ArrowRight,
  Flame,
  DollarSign
} from "lucide-react";

function Sidebar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get("category") || "";
  const activeSearch = searchParams.get("search") || "";
  const [hoveredCatId, setHoveredCatId] = useState(null);

  const timeoutRef = useRef(null);

  const categories = [
    {
      id: "iphone",
      name: "iPhone",
      icon: Smartphone,
      hasArrow: true,
      categoryValue: "iPhone",
      subgroups: [
        {
          title: "Dòng iPhone Hot",
          items: [
            { name: "iPhone 17 Pro Max", query: "iPhone 17" },
            { name: "iPhone 16 Pro Max", query: "iPhone 16" },
            { name: "iPhone 15 Series", query: "iPhone 15" },
            { name: "iPhone Cũ Giá Tốt", query: "iPhone" }
          ]
        },
        {
          title: "Phụ kiện Apple",
          items: [
            { name: "Sạc nhanh iphone 20W", query: "Sạc" },
            { name: "Cáp sạc Type-C", query: "Sạc" },
            { name: "Ốp lưng Magsafe", query: "iPhone" }
          ]
        }
      ]
    },
    {
      id: "iphone17",
      name: "iPhone 17",
      icon: Flame,
      iconColor: "#ef4444",
      hasArrow: false,
      categoryValue: "iPhone 17",
      subgroups: [
        {
          title: "iPhone 17 Series 2026",
          items: [
            { name: "iPhone 17 Pro Max 256GB", query: "iPhone 17" },
            { name: "iPhone 17 Pro 128GB", query: "iPhone 17" },
            { name: "iPhone 17 Plus", query: "iPhone 17" }
          ]
        }
      ]
    },
    {
      id: "galaxy-s26",
      name: "Galaxy S26 Ultra",
      icon: Smartphone,
      iconColor: "#3b82f6",
      hasArrow: false,
      categoryValue: "Samsung",
      subgroups: [
        {
          title: "Samsung Flagship",
          items: [
            { name: "Samsung Galaxy S26 Ultra", query: "Samsung" },
            { name: "Samsung Galaxy S24 Ultra", query: "Samsung" },
            { name: "Galaxy Z Fold 6", query: "Samsung" }
          ]
        }
      ]
    },
    {
      id: "dien-thoai",
      name: "Điện thoại",
      icon: Smartphone,
      hasArrow: true,
      categoryValue: "Điện thoại",
      subgroups: [
        {
          title: "Thương hiệu điện thoại",
          items: [
            { name: "Samsung Galaxy Series", query: "Samsung" },
            { name: "Xiaomi / Redmi", query: "Điện thoại" },
            { name: "OPPO / Realme", query: "Điện thoại" }
          ]
        }
      ]
    },
    {
      id: "hang-cu",
      name: "Hàng cũ",
      icon: RotateCcw,
      hasArrow: true,
      categoryValue: "Hàng cũ",
      subgroups: [
        {
          title: "Sản phẩm cũ giá rẻ",
          items: [
            { name: "iPhone Cũ Đẹp 99%", query: "iPhone" },
            { name: "Máy tính bảng cũ", query: "cũ" }
          ]
        }
      ]
    },
    {
      id: "samsung",
      name: "Samsung",
      icon: Smartphone,
      iconColor: "#e20031",
      hasArrow: true,
      categoryValue: "Samsung",
      subgroups: [
        {
          title: "Samsung Galaxy",
          items: [
            { name: "Samsung Galaxy S24 Ultra", query: "Samsung" },
            { name: "Samsung Galaxy A Series", query: "Samsung" }
          ]
        }
      ]
    },
    {
      id: "may-tinh-bang",
      name: "Máy tính bảng",
      icon: Tablet,
      hasArrow: true,
      categoryValue: "Máy tính bảng",
      subgroups: [
        {
          title: "Máy tính bảng Hot",
          items: [
            { name: "Apple iPad Pro / Air", query: "iPad" },
            { name: "Samsung Galaxy Tab", query: "Tab" }
          ]
        }
      ]
    },
    {
      id: "laptop",
      name: "Laptop",
      icon: Laptop,
      hasArrow: true,
      categoryValue: "Laptop",
      subgroups: [
        {
          title: "Laptop Học tập & Đồ họa",
          items: [
            { name: "Balo Laptop Phenikaa", query: "Balo" },
            { name: "MacBook Pro / Air", query: "Laptop" }
          ]
        }
      ]
    },
    {
      id: "dong-ho",
      name: "Đồng hồ",
      icon: Watch,
      hasArrow: true,
      categoryValue: "Đồng hồ",
      subgroups: [
        {
          title: "Smartwatch",
          items: [
            { name: "Apple Watch Series", query: "Watch" },
            { name: "Galaxy Watch Series", query: "Watch" }
          ]
        }
      ]
    },
    {
      id: "phu-kien",
      name: "Phụ kiện",
      icon: BatteryCharging,
      hasArrow: true,
      categoryValue: "Phụ kiện",
      subgroups: [
        {
          title: "Phụ kiện Phenikaa Uni",
          items: [
            { name: "Bình Nước Giữ Nhiệt Phenikaa", query: "Bình Nước" },
            { name: "Balo Laptop Sinh Viên", query: "Balo" },
            { name: "Sạc nhanh iphone 20W", query: "Sạc" }
          ]
        }
      ]
    },
    {
      id: "am-thanh",
      name: "Âm thanh",
      icon: Headphones,
      hasArrow: true,
      categoryValue: "Âm thanh",
      subgroups: [
        {
          title: "Tai nghe & Loa",
          items: [
            { name: "AirPods Pro 2", query: "AirPods" },
            { name: "Loa Bluetooth", query: "Loa" }
          ]
        }
      ]
    },
    {
      id: "thu-cu",
      name: "Thu cũ - Đổi mới",
      icon: DollarSign,
      iconColor: "#e20031",
      hasArrow: false,
      categoryValue: "Hàng cũ",
      subgroups: [
        {
          title: "Trợ giá đổi máy",
          items: [
            { name: "Thu Cũ Trợ Giá 2 Triệu", query: "iPhone" }
          ]
        }
      ]
    }
  ];

  const cancelClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnterCat = (catId) => {
    cancelClose();
    setHoveredCatId(catId);
  };

  const handleMouseLeaveSidebar = () => {
    cancelClose();
    timeoutRef.current = setTimeout(() => {
      setHoveredCatId(null);
    }, 450);
  };

  const handleSubItemClick = (query) => {
    cancelClose();
    setHoveredCatId(null);
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  const handleCategoryClick = () => {
    cancelClose();
    setHoveredCatId(null);
  };

  const activeHoveredCat = categories.find((c) => c.id === hoveredCatId);

  return (
    <aside 
      className="sidebar-clickbuy-theme"
      onMouseLeave={handleMouseLeaveSidebar}
      onMouseEnter={cancelClose}
    >
      <div className="sidebar-body-wrapper">
        <ul className="sidebar-clickbuy-menu">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = activeCategory.toLowerCase() === cat.categoryValue.toLowerCase();
            const isHovered = hoveredCatId === cat.id;

            return (
              <li 
                key={cat.id} 
                className={`sidebar-clickbuy-item ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnterCat(cat.id)}
              >
                <Link 
                  to={cat.categoryValue ? `/?category=${encodeURIComponent(cat.categoryValue)}` : "/"} 
                  className={`sidebar-clickbuy-link ${isSelected ? "active" : ""}`}
                  onClick={handleCategoryClick}
                >
                  <div className="sidebar-item-left">
                    {IconComponent ? (
                      <IconComponent className="sidebar-icon" size={18} style={{ color: cat.iconColor || "#e20031" }} />
                    ) : (
                      <span className="sidebar-icon-placeholder"></span>
                    )}
                    <span className="sidebar-label">{cat.name}</span>
                  </div>
                  {cat.hasArrow && <ChevronRight className="sidebar-arrow" size={16} />}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* FLYOUT SUBCATEGORIES MEGA-MENU PANEL */}
        {activeHoveredCat && activeHoveredCat.subgroups && (
          <div 
            className="sidebar-flyout-menu"
            onMouseEnter={cancelClose}
            onMouseLeave={handleMouseLeaveSidebar}
          >
            <div className="flyout-header">
              <span className="flyout-title">{activeHoveredCat.name}</span>
              <Link 
                to={activeHoveredCat.categoryValue ? `/?category=${encodeURIComponent(activeHoveredCat.categoryValue)}` : "/"}
                className="flyout-see-all"
                onClick={handleCategoryClick}
              >
                Xem tất cả {activeHoveredCat.name} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="flyout-groups-grid">
              {activeHoveredCat.subgroups.map((group, idx) => (
                <div key={idx} className="flyout-group">
                  <h4 className="group-title">
                    <Zap size={14} className="group-icon" />
                    {group.title}
                  </h4>
                  <ul className="group-items">
                    {group.items.map((subItem, itemIdx) => (
                      <li key={itemIdx}>
                        <button 
                          onClick={() => handleSubItemClick(subItem.query)}
                          className={`sub-item-btn ${activeSearch.toLowerCase() === subItem.query.toLowerCase() ? "active" : ""}`}
                        >
                          <ChevronRight size={12} className="sub-item-arrow" />
                          <span>{subItem.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
