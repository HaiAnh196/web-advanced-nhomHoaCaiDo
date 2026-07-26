import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";
import AdminProductModal from "../components/AdminProductModal";
import AdminBannerModal from "../components/AdminBannerModal";
import AdminUserModal from "../components/AdminUserModal";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Ticket,
  Plus,
  Edit2,
  Trash2,
  Search,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Home,
  LogOut,
  Store,
  ShieldCheck,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Shield
} from "lucide-react";

function Admin() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("products"); // 'overview', 'products', 'orders', 'promotions'
  const username = localStorage.getItem("username") || "Quản trị viên";

  // Kiểm tra quyền truy cập Admin - Chỉ duy nhất tài khoản Admin được phép vào
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    const isAdmin = !!token && (role === "ADMIN" || (storedUsername && storedUsername.toLowerCase() === "admin"));

    if (!isAdmin) {
      addToast("Bạn không có quyền truy cập trang Quản lý Admin!", "error");
      navigate("/login");
    }
  }, [navigate, addToast]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    addToast("Đã đăng xuất tài khoản Admin!", "info");
    navigate("/login");
  };

  // States quản lý Sản Phẩm
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // States quản lý Đơn Hàng Mẫu & Đơn Hàng Mới
  const defaultOrders = [
    {
      id: "HCD-892301",
      customer: "Nguyễn Văn An",
      phone: "0988123456",
      items: "iPhone 17 Pro Max 256GB (x1)",
      total: 33990000,
      paymentMethod: "QR VietQR",
      status: "Processing",
      createdAt: "2026-07-26 08:15",
    },
    {
      id: "HCD-771204",
      customer: "Trần Thị Mai",
      phone: "0912345678",
      items: "Bình Nước Giữ Nhiệt Phenikaa (x2)",
      total: 798000,
      paymentMethod: "COD",
      status: "Shipping",
      createdAt: "2026-07-25 14:30",
    },
    {
      id: "HCD-654109",
      customer: "Lê Hoàng Nam",
      phone: "0934567890",
      items: "Xiaomi Redmi Note 15 (x1), Balo Laptop (x1)",
      total: 5589000,
      paymentMethod: "Thẻ ATM",
      status: "Completed",
      createdAt: "2026-07-24 10:20",
    },
    {
      id: "HCD-541290",
      customer: "Phạm Thu Hà",
      phone: "0977889900",
      items: "Tai nghe Bluetooth Phenikaa Sound (x1)",
      total: 1250000,
      paymentMethod: "QR VietQR",
      status: "Completed",
      createdAt: "2026-07-23 16:45",
    },
  ];

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("adminOrders");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      /* empty */
    }
    return defaultOrders;
  });

  useEffect(() => {
    localStorage.setItem("adminOrders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem("adminOrders");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setOrders(parsed);
          }
        }
      } catch {
        /* empty */
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // States quản lý Banner Khuyến Mãi
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  
  const defaultBanners = [
    {
      id: 1,
      tabTitle: "Galaxy S26 Series đã sẵn hàng",
      title: "THU CŨ ĐỔI XANH",
      subtitle: "TÁI TẠO NĂNG LƯỢNG - GIÁ CHỈ TỪ 399K",
      badge: "THỜI GIAN: Từ ngày 24.06 đến 30.06.2026",
      bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
      link: "/product/1",
      status: "Active",
    },
    {
      id: 2,
      tabTitle: "IPHONE 17 SERIES CHÍNH HÃNG",
      title: "IPHONE 17 PRO MAX",
      subtitle: "Siêu Phẩm Đỉnh Cao 2026 - Tặng gói bảo hành 24 tháng",
      badge: "HOT LAUNCH 2026",
      bgGradient: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
      link: "/product/1",
      status: "Active",
    },
    {
      id: 3,
      tabTitle: "Thu cũ đổi xanh - Tái tạo năng lượng",
      title: "SIÊU SẢN PHẨM PHENIKAA",
      subtitle: "Bình giữ nhiệt & Balo Laptop chống nước cao cấp",
      badge: "GIẢM 20% CHO SINH VIÊN",
      bgGradient: "linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      link: "/category/phu-kien",
      status: "Active",
    },
    {
      id: 4,
      tabTitle: "Xiaomi Redmi Note 15 Series giá tốt",
      title: "XIAOMI REDMI NOTE 15",
      subtitle: "Bền Titan - Bền tuyệt đỉnh - Giá chỉ từ 4.990.000đ",
      badge: "TẶNG LOA BLUETOOTH 399K",
      bgGradient: "linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #ea580c 100%)",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
      link: "/category/dien-thoai",
      status: "Active",
    },
    {
      id: 5,
      tabTitle: "Trả góp iPhone dễ dàng tại HoaCaiDo",
      title: "TRẢ GÓP 0% LÃI SUẤT",
      subtitle: "Trả trước 0đ - Duyệt hồ sơ siêu tốc trong 15 phút",
      badge: "ƯU ĐÃI ĐỘC QUYỀN",
      bgGradient: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)",
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&auto=format&fit=crop&q=80",
      link: "/category/iphone",
      status: "Active",
    },
  ];

  const [promotions, setPromotions] = useState(() => {
    try {
      const saved = localStorage.getItem("adminBanners");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      /* empty */
    }
    return defaultBanners;
  });

  useEffect(() => {
    localStorage.setItem("adminBanners", JSON.stringify(promotions));
    window.dispatchEvent(new Event("storage"));
  }, [promotions]);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem("adminBanners");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setPromotions(parsed);
          }
        }
      } catch {
        /* empty */
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // States quản lý Người Dùng (Users)
  const [usersList, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch danh sách người dùng từ backend
  const fetchUsers = useCallback(() => {
    api
      .get("/users")
      .then((res) => {
        setUsersList(res.data);
      })
      .catch((err) => {
        console.error("Lỗi tải danh sách tài khoản:", err);
      })
      .finally(() => {
        setLoadingUsers(false);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Thao tác CRUD Người dùng
  const handleOpenAddUserModal = () => {
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  const handleOpenEditUserModal = (u) => {
    setEditingUser(u);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (formData) => {
    if (editingUser) {
      api
        .put(`/users/${editingUser.id}`, formData)
        .then((res) => {
          addToast(`Đã cập nhật tài khoản "${res.data.username}" thành công!`, "success");
          fetchUsers();
          setIsUserModalOpen(false);
        })
        .catch((err) => {
          console.error("Lỗi cập nhật tài khoản:", err);
          const errMsg = err.response?.data?.message || "Cập nhật thất bại!";
          addToast(`Cập nhật thất bại: ${errMsg}`, "error");
        });
    } else {
      api
        .post("/users", formData)
        .then((res) => {
          addToast(`Đã tạo tài khoản "${res.data.username}" mới!`, "success");
          fetchUsers();
          setIsUserModalOpen(false);
        })
        .catch((err) => {
          console.error("Lỗi thêm tài khoản:", err);
          const errMsg = err.response?.data?.message || "Thêm thất bại!";
          addToast(`Thêm thất bại: ${errMsg}`, "error");
        });
    }
  };

  const handleToggleUserStatus = (u) => {
    const newStatus = u.status === "Blocked" ? "Active" : "Blocked";
    api
      .put(`/users/${u.id}`, { status: newStatus })
      .then(() => {
        addToast(`Đã ${newStatus === "Blocked" ? "khóa" : "mở khóa"} tài khoản "${u.username}"!`, "info");
        fetchUsers();
      })
      .catch((err) => {
        console.error("Lỗi đổi trạng thái tài khoản:", err);
        addToast("Không thể thay đổi trạng thái tài khoản!", "error");
      });
  };

  const handleDeleteUser = (u) => {
    if (u.username === "admin") {
      addToast("Không thể xóa tài khoản Admin mặc định!", "error");
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${u.username}"?`)) {
      api
        .delete(`/users/${u.id}`)
        .then(() => {
          addToast(`Đã xóa tài khoản "${u.username}" thành công!`, "info");
          fetchUsers();
        })
        .catch((err) => {
          console.error("Lỗi xóa tài khoản:", err);
          addToast("Xóa tài khoản thất bại!", "error");
        });
    }
  };

  // Fetch danh sách sản phẩm từ backend
  const fetchProducts = useCallback(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
        addToast("Không thể tải danh sách sản phẩm từ Backend!", "error");
      })
      .finally(() => {
        setLoadingProducts(false);
      });
  }, [addToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Thao tác CRUD Sản phẩm
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      // Cập nhật
      api
        .put(`/products/${editingProduct.id}`, formData)
        .then((res) => {
          addToast(`Đã cập nhật sản phẩm "${res.data.name}" thành công!`, "success");
          fetchProducts();
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.error("Lỗi cập nhật sản phẩm:", err);
          const errMsg = err.response?.data?.message || "Cập nhật thất bại!";
          addToast(`Cập nhật thất bại: ${errMsg}`, "error");
        });
    } else {
      // Thêm mới
      api
        .post("/products", formData)
        .then((res) => {
          addToast(`Đã thêm mới sản phẩm "${res.data.name}"!`, "success");
          fetchProducts();
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.error("Lỗi thêm sản phẩm:", err);
          const errMsg = err.response?.data?.message || "Thêm sản phẩm thất bại!";
          addToast(`Thêm sản phẩm thất bại: ${errMsg}`, "error");
        });
    }
  };

  const handleDeleteProduct = (prod) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${prod.name}"?`)) {
      api
        .delete(`/products/${prod.id}`)
        .then(() => {
          addToast(`Đã xóa sản phẩm "${prod.name}"!`, "info");
          setProducts((prev) => prev.filter((p) => p.id !== prod.id));
        })
        .catch((err) => {
          console.error("Lỗi xóa sản phẩm:", err);
          addToast("Xóa sản phẩm thất bại!", "error");
        });
    }
  };

  // Thao tác CRUD Banner Khuyến Mãi
  const handleOpenAddBanner = () => {
    setEditingBanner(null);
    setIsBannerModalOpen(true);
  };

  const handleOpenEditBanner = (promo) => {
    setEditingBanner(promo);
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (bannerData) => {
    if (editingBanner) {
      setPromotions((prev) =>
        prev.map((item) => (item.id === editingBanner.id ? { ...item, ...bannerData } : item))
      );
      addToast(`Đã cập nhật banner "${bannerData.title}" thành công!`, "success");
    } else {
      const newBanner = {
        id: Date.now(),
        ...bannerData,
      };
      setPromotions((prev) => [newBanner, ...prev]);
      addToast(`Đã thêm banner "${bannerData.title}" mới thành công!`, "success");
    }
    setIsBannerModalOpen(false);
  };

  const handleToggleBannerStatus = (promoId) => {
    setPromotions((prev) =>
      prev.map((item) =>
        item.id === promoId
          ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
          : item
      )
    );
    addToast("Đã thay đổi trạng thái hiển thị của Banner!", "info");
  };

  const handleDeleteBanner = (promoId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa Banner này khỏi hệ thống?")) {
      setPromotions((prev) => prev.filter((item) => item.id !== promoId));
      addToast("Đã xóa Banner thành công!", "info");
    }
  };

  // Cập nhật trạng thái đơn hàng
  const handleChangeOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast(`Đã cập nhật mã đơn ${orderId} sang "${newStatus}"`, "success");
  };

  // Lọc sản phẩm theo từ khóa
  const filteredProducts = (products || []).filter((p) =>
    p && (
      (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  // Thống kê tổng quan
  const totalRevenue = (orders || [])
    .filter((o) => o && o.status !== "Cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  // Lọc người dùng theo từ khóa
  const filteredUsers = (usersList || []).filter((u) =>
    u && (
      (u.username && u.username.toLowerCase().includes(userSearchQuery.toLowerCase())) ||
      (u.fullName && u.fullName.toLowerCase().includes(userSearchQuery.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(userSearchQuery.toLowerCase()))
    )
  );

  return (
    <div className="admin-page-wrapper">
      {/* HEADER TOP DÀNH RIÊNG CHO ADMIN LAYOUT */}
      <header className="admin-top-header">
        <div className="admin-header-left">
          <Link to="/admin" className="admin-brand-logo">
            <Store size={26} className="brand-icon" />
            <div className="brand-text">
              <span className="brand-title">HoaCaiDo Admin Panel</span>
              <span className="brand-sub">Phenikaa Uni Store Management</span>
            </div>
          </Link>
        </div>

        <div className="admin-header-right">
          <Link to="/" className="btn-back-to-store">
            <Home size={18} /> Về Trang Chủ Cửa Hàng
          </Link>

          <div className="admin-user-profile-tag">
            <ShieldCheck size={18} className="user-icon" />
            <span>Xin chào, <strong>{username}</strong></span>
          </div>

          <button className="btn-admin-logout" onClick={handleLogout} title="Đăng xuất">
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>
      </header>

      <div className="admin-dashboard-container">
        {/* SIDEBAR BÊN TRÁI ADMIN */}
        <aside className="admin-sidebar">
          <div className="admin-brand-card">
            <Sparkles size={24} className="brand-icon" />
            <div>
              <h3>Bảng Điều Khiển</h3>
              <span>Quản trị viên</span>
            </div>
          </div>

        <nav className="admin-menu">
          <button
            className={`admin-menu-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={18} /> Tổng quan KPI
          </button>
          <button
            className={`admin-menu-item ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <Package size={18} /> Quản lý Sản Phẩm
          </button>
          <button
            className={`admin-menu-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag size={18} /> Quản lý Đơn Hàng
          </button>
          <button
            className={`admin-menu-item ${activeTab === "promotions" ? "active" : ""}`}
            onClick={() => setActiveTab("promotions")}
          >
            <Ticket size={18} /> Chương Trình Khuyến Mãi
          </button>
          <button
            className={`admin-menu-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={18} /> Quản lý Người Dùng
          </button>
        </nav>
      </aside>

      {/* NỘI DUNG CHÍNH ADMIN */}
      <main className="admin-main-content">
        {/* TOP KPI CARDS */}
        <div className="admin-kpi-grid">
          <div className="kpi-card text-emerald">
            <div className="kpi-icon-box bg-emerald-light">
              <DollarSign size={24} />
            </div>
            <div className="kpi-info">
              <span>Doanh Thu Tổng</span>
              <h4>{totalRevenue.toLocaleString()} ₫</h4>
              <p><TrendingUp size={14} /> +18.5% so với tháng trước</p>
            </div>
          </div>

          <div className="kpi-card text-blue">
            <div className="kpi-icon-box bg-blue-light">
              <ShoppingBag size={24} />
            </div>
            <div className="kpi-info">
              <span>Tổng Số Đơn Hàng</span>
              <h4>{orders.length} đơn</h4>
              <p><Clock size={14} /> 2 đơn đang chờ xử lý</p>
            </div>
          </div>

          <div className="kpi-card text-purple">
            <div className="kpi-icon-box bg-purple-light">
              <Package size={24} />
            </div>
            <div className="kpi-info">
              <span>Sản Phẩm Trong Kho</span>
              <h4>{products.length} mặt hàng</h4>
              <p><CheckCircle2 size={14} /> Sẵn sàng bán</p>
            </div>
          </div>

          <div className="kpi-card text-amber">
            <div className="kpi-icon-box bg-amber-light">
              <Users size={24} />
            </div>
            <div className="kpi-info">
              <span>Khách Hàng Đăng Ký</span>
              <h4>128 thành viên</h4>
              <p><ArrowUpRight size={14} /> Tăng trưởng ổn định</p>
            </div>
          </div>
        </div>

        {/* TAB 1: TỔNG QUAN */}
        {activeTab === "overview" && (
          <div className="admin-section-box">
            <div className="section-header-bar">
              <h2><LayoutDashboard size={20} /> Tổng Quan Hệ Thống</h2>
            </div>
            <div className="overview-welcome-banner">
              <h3>Chào mừng bạn đến với trang quản trị cửa hàng Phenikaa Store!</h3>
              <p>Hệ thống tự động đồng bộ sản phẩm, thống kê doanh số bán hàng và theo dõi đơn hàng thực tế từ backend NestJS.</p>
            </div>

            <div className="recent-orders-preview">
              <h3>Đơn hàng mới nhất cần duyệt</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Khách Hàng</th>
                    <th>Sản Phẩm</th>
                    <th>Tổng Tiền</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td><strong>{o.id}</strong></td>
                      <td>{o.customer} ({o.phone})</td>
                      <td>{o.items}</td>
                      <td className="price-bold">{o.total.toLocaleString()} ₫</td>
                      <td>
                        <span className={`status-badge ${o.status.toLowerCase()}`}>
                          {o.status === "Processing" && "Đang xử lý"}
                          {o.status === "Confirmed" && "Đã xác nhận"}
                          {o.status === "Shipping" && "Đang giao"}
                          {o.status === "Completed" && "Hoàn tất"}
                          {o.status === "Cancelled" && "Đã hủy"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: QUẢN LÝ SẢN PHẨM */}
        {activeTab === "products" && (
          <div className="admin-section-box">
            <div className="section-header-bar">
              <h2><Package size={20} /> Quản Lý Danh Sách Sản Phẩm</h2>
              <button className="btn-admin-primary" onClick={handleOpenAddModal}>
                <Plus size={18} /> Thêm sản phẩm mới
              </button>
            </div>

            {/* Thanh Tìm Kiếm & Lọc */}
            <div className="admin-filter-bar">
              <div className="search-input-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm theo tên hoặc danh mục..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <span className="total-count-badge">Tổng số: {filteredProducts.length} sản phẩm</span>
            </div>

            {/* Bảng Danh Sách Sản Phẩm */}
            {loadingProducts ? (
              <div className="admin-loading-box">
                <div className="spinner"></div>
                <p>Đang tải dữ liệu sản phẩm từ hệ thống...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Danh mục</th>
                      <th>Giá bán</th>
                      <th>Giá niêm yết</th>
                      <th>Kho</th>
                      <th>Nhãn (Badge)</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-6">
                          Không tìm thấy sản phẩm nào khớp với tìm kiếm.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((prod) => (
                        <tr key={prod.id}>
                          <td>
                            <img src={prod.imageUrl} alt={prod.name} className="admin-prod-thumb" />
                          </td>
                          <td>
                            <strong className="prod-title-text">{prod.name}</strong>
                          </td>
                          <td>
                            <span className="cat-tag-pill">{prod.category}</span>
                          </td>
                          <td>
                            <strong className="price-bold">{prod.price.toLocaleString()} ₫</strong>
                          </td>
                          <td>
                            <span className="price-old-text">
                              {prod.oldPrice ? `${prod.oldPrice.toLocaleString()} ₫` : "-"}
                            </span>
                          </td>
                          <td>
                            <span className={`stock-count ${prod.stock < 5 ? "low" : ""}`}>
                              {prod.stock || 10} món
                            </span>
                          </td>
                          <td>
                            <span className="badge-promo-text">{prod.badge || "-"}</span>
                          </td>
                          <td>
                            <div className="table-action-btns">
                              <button
                                className="btn-action edit"
                                title="Sửa sản phẩm"
                                onClick={() => handleOpenEditModal(prod)}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className="btn-action delete"
                                title="Xóa sản phẩm"
                                onClick={() => handleDeleteProduct(prod)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: QUẢN LÝ ĐƠN HÀNG */}
        {activeTab === "orders" && (
          <div className="admin-section-box">
            <div className="section-header-bar">
              <h2><ShoppingBag size={20} /> Quản Lý Đơn Hàng Khách Hàng</h2>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Ngày Đặt</th>
                    <th>Khách Hàng</th>
                    <th>Địa Chỉ & SĐT</th>
                    <th>Chi Tiết Hàng</th>
                    <th>Tổng Tiền</th>
                    <th>Thanh Toán</th>
                    <th>Trạng Thái</th>
                    <th>Cập Nhật</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.createdAt}</td>
                      <td><strong>{order.customer}</strong></td>
                      <td>{order.phone}</td>
                      <td>{order.items}</td>
                      <td className="price-bold">{order.total.toLocaleString()} ₫</td>
                      <td><span className="pay-method">{order.paymentMethod}</span></td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status === "Processing" && "Đang xử lý"}
                          {order.status === "Confirmed" && "Đã xác nhận"}
                          {order.status === "Shipping" && "Đang giao"}
                          {order.status === "Completed" && "Hoàn tất"}
                          {order.status === "Cancelled" && "Đã hủy"}
                        </span>
                      </td>
                      <td>
                        <select
                          className="status-select"
                          value={order.status}
                          onChange={(e) => handleChangeOrderStatus(order.id, e.target.value)}
                        >
                          <option value="Processing">Đang xử lý</option>
                          <option value="Confirmed">Đã xác nhận</option>
                          <option value="Shipping">Đang giao hàng</option>
                          <option value="Completed">Hoàn tất đơn</option>
                          <option value="Cancelled">Hủy đơn</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CHƯƠNG TRÌNH KHUYẾN MÃI & BANNER */}
        {activeTab === "promotions" && (
          <div className="admin-section-box">
            <div className="section-header-bar">
              <h2><Ticket size={20} /> Quản Lý Banner Khuyến Mãi & Slide Trang Chủ</h2>
              <button
                className="btn-admin-primary"
                onClick={handleOpenAddBanner}
              >
                <Plus size={18} /> Thêm Banner Mới
              </button>
            </div>

            <div className="admin-banner-cards-grid">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className={`admin-banner-manage-card ${promo.status === "Inactive" ? "disabled" : ""}`}
                  style={{ background: promo.bgGradient }}
                >
                  <div className="banner-card-top-tags">
                    <span className="promo-badge-tag">{promo.badge}</span>
                    <span className={`status-pill ${promo.status.toLowerCase()}`}>
                      {promo.status === "Active" ? "Đang chạy" : "Tạm ẩn"}
                    </span>
                  </div>

                  <div className="banner-card-body">
                    <div className="banner-text-details">
                      <span className="tab-title-tag">Tab: {promo.tabTitle}</span>
                      <h3 className="banner-main-name">{promo.title}</h3>
                      <p className="banner-sub-name">{promo.subtitle}</p>
                    </div>
                    <div className="banner-thumb-img-box">
                      <img src={promo.image} alt={promo.title} />
                    </div>
                  </div>

                  <div className="banner-card-actions-bar">
                    <button
                      className="btn-banner-action edit"
                      onClick={() => handleOpenEditBanner(promo)}
                      title="Chỉnh sửa Banner"
                    >
                      <Edit2 size={15} /> Sửa
                    </button>
                    <button
                      className={`btn-banner-action toggle ${promo.status.toLowerCase()}`}
                      onClick={() => handleToggleBannerStatus(promo.id)}
                      title={promo.status === "Active" ? "Ẩn Banner" : "Bật Banner"}
                    >
                      {promo.status === "Active" ? <EyeOff size={15} /> : <Eye size={15} />}
                      {promo.status === "Active" ? "Tạm ẩn" : "Kích hoạt"}
                    </button>
                    <button
                      className="btn-banner-action delete"
                      onClick={() => handleDeleteBanner(promo.id)}
                      title="Xóa Banner"
                    >
                      <Trash2 size={15} /> Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: QUẢN LÝ NGƯỜI DÙNG / TÀI KHOẢN */}
        {activeTab === "users" && (
          <div className="admin-section-box">
            <div className="section-header-bar">
              <h2><Users size={20} /> Quản Lý Tài Khoản Người Dùng & Khách Hàng</h2>
              <button
                className="btn-admin-primary"
                onClick={handleOpenAddUserModal}
              >
                <Plus size={18} /> Thêm Tài Khoản Mới
              </button>
            </div>

            {/* Thanh Tìm Kiếm Người Dùng */}
            <div className="admin-filter-bar">
              <div className="search-input-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo username, họ tên hoặc email..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                />
              </div>
              <span className="total-count-badge">Tổng số: {filteredUsers.length} tài khoản</span>
            </div>

            {loadingUsers ? (
              <div className="admin-loading-box">
                <div className="spinner"></div>
                <p>Đang tải danh sách tài khoản từ hệ thống...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên đăng nhập</th>
                      <th>Họ và Tên</th>
                      <th>Email & SĐT</th>
                      <th>Quyền Hạn</th>
                      <th>Trạng Thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-6">
                          Không tìm thấy tài khoản nào khớp với tìm kiếm.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td><strong>#{u.id}</strong></td>
                          <td>
                            <strong className="user-name-title">{u.username}</strong>
                          </td>
                          <td>{u.fullName || "-"}</td>
                          <td>
                            <div className="user-contact-info">
                              {u.email && <span><Mail size={12} /> {u.email}</span>}
                              {u.phone && <span><Phone size={12} /> {u.phone}</span>}
                            </div>
                          </td>
                          <td>
                            <span className={`role-badge ${u.role ? u.role.toLowerCase() : "user"}`}>
                              {u.role === "ADMIN" ? <Shield size={12} /> : <Users size={12} />}
                              {u.role === "ADMIN" ? "ADMIN (Quản trị)" : "USER (Khách hàng)"}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${u.status === "Blocked" ? "cancelled" : "completed"}`}>
                              {u.status === "Blocked" ? "Khóa" : "Hoạt động"}
                            </span>
                          </td>
                          <td>
                            <div className="table-action-btns">
                              <button
                                className="btn-action edit"
                                title="Sửa tài khoản"
                                onClick={() => handleOpenEditUserModal(u)}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className={`btn-action ${u.status === "Blocked" ? "unlock" : "lock"}`}
                                title={u.status === "Blocked" ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                                onClick={() => handleToggleUserStatus(u)}
                              >
                                {u.status === "Blocked" ? <UserCheck size={16} /> : <UserX size={16} />}
                              </button>
                              <button
                                className="btn-action delete"
                                title="Xóa tài khoản"
                                onClick={() => handleDeleteUser(u)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL THÊM / SỬA SẢN PHẨM */}
      <AdminProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />

      {/* MODAL THÊM / SỬA BANNER */}
      <AdminBannerModal
        isOpen={isBannerModalOpen}
        onClose={() => setIsBannerModalOpen(false)}
        onSave={handleSaveBanner}
        editingBanner={editingBanner}
      />

      {/* MODAL THÊM / SỬA TÀI KHOẢN NGƯỜI DÙNG */}
      <AdminUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
        editingUser={editingUser}
      />
      </div>
    </div>
  );
}

export default Admin;
