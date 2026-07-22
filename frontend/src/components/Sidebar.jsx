import { Link } from "react-router-dom";
import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  RotateCcw,
  RefreshCw,
  BatteryCharging,
  ChevronRight,
} from "lucide-react";

function Sidebar() {
  const categories = [
    {
      id: "iphone",
      name: "iPhone",
      icon: Smartphone,
      hasArrow: true,
      path: "/category/iphone",
    },
    {
      id: "dien-thoai",
      name: "Điện thoại",
      icon: Smartphone,
      hasArrow: true,
      path: "/category/dien-thoai",
    },
    {
      id: "hang-cu",
      name: "Hàng cũ",
      icon: RotateCcw,
      hasArrow: true,
      path: "/category/hang-cu",
    },
    {
      id: "samsung",
      name: "Samsung",
      icon: Smartphone,
      hasArrow: true,
      path: "/category/samsung",
    },
    {
      id: "may-tinh-bang",
      name: "Máy tính bảng",
      icon: Tablet,
      hasArrow: true,
      path: "/category/may-tinh-bang",
    },
    {
      id: "laptop",
      name: "Laptop",
      icon: Laptop,
      hasArrow: true,
      path: "/category/laptop",
    },
    {
      id: "dong-ho",
      name: "Đồng hồ",
      icon: Watch,
      hasArrow: true,
      path: "/category/dong-ho",
    },
    {
      id: "phu-kien",
      name: "Phụ kiện",
      icon: BatteryCharging,
      hasArrow: true,
      path: "/category/phu-kien",
    },
    {
      id: "am-thanh",
      name: "Âm thanh",
      icon: Headphones,
      hasArrow: true,
      path: "/category/am-thanh",
    },
  ];

  return (
    <aside className="sidebar-container">
      <ul className="sidebar-menu">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <li key={cat.id} className="sidebar-item">
              <Link to={cat.path} className="sidebar-link">
                <div className="sidebar-item-left">
                  {IconComponent ? (
                    <IconComponent className="sidebar-icon" size={20} />
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
    </aside>
  );
}

export default Sidebar;
