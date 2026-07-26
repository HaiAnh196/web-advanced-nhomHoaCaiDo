import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import BannerSlider from "../components/BannerSlider";
import FilterBar from "../components/FilterBar";
import { Sparkles, AlertCircle } from "lucide-react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  // Bộ lọc & Sắp xếp client-side
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (categoryQuery) params.category = categoryQuery;

    api
      .get("/products", { params })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery, categoryQuery]);

  const processedProducts = useMemo(() => {
    let result = [...products];

    if (selectedPriceRange === "under-500k") {
      result = result.filter((p) => p.price < 500000);
    } else if (selectedPriceRange === "500k-2m") {
      result = result.filter((p) => p.price >= 500000 && p.price <= 2000000);
    } else if (selectedPriceRange === "over-2m") {
      result = result.filter((p) => p.price > 2000000);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, selectedPriceRange, sortBy]);

  const handleFilterPillClick = (filterName) => {
    if (filterName === "ALL") {
      setSearchParams({});
    } else {
      setSearchParams({ search: filterName });
    }
  };

  const filterPills = [
    { name: "iPhone", query: "iPhone" },
    { name: "Samsung", query: "Samsung" },
    { name: "Xiaomi", query: "Xiaomi" },
    { name: "Vivo", query: "Vivo" },
    { name: "TECNO", query: "TECNO" },
    { name: "Realme", query: "Realme" },
    { name: "Phụ kiện", query: "Phụ kiện" },
    { name: "Balo", query: "Balo" },
    { name: "Bình nước", query: "Bình Nước" },
    { name: "Điện thoại", query: "Điện thoại" },
  ];

  return (
    <div className="clickbuy-home-container">
      {/* SECTION HERO 3 CỘT NỔI BẬT (CHỈ HIỆN KHI Ở TRANG CHỦ MẶC ĐỊNH) */}
      {!searchQuery && !categoryQuery && (
        <div className="clickbuy-hero-3col-layout">
          {/* Cột 1: Sidebar Menu bên trái */}
          <div className="hero-col-sidebar">
            <Sidebar />
          </div>

          {/* Cột 2: Banner Slider + Tab + Sub-banner ở giữa */}
          <div className="hero-col-main-slider">
            <BannerSlider />
          </div>

          {/* Cột 3: Khối Khuyến Mãi Nổi Bật bên phải */}
          <div className="hero-col-right-widgets">
            <div className="promo-widget-card">
              <div className="widget-header-title">Khuyến mãi nổi bật</div>
              <div className="widget-banner-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80" 
                  alt="Khuyến mãi nổi bật" 
                  className="widget-img" 
                />
                <div className="widget-img-badge">THÁNG 7 RỰC NẮNG - PHỤ KIỆN GIẢM 20%</div>
              </div>
            </div>

            <div className="promo-widget-card secondary">
              <div className="widget-banner-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80" 
                  alt="iPhone 17 Series" 
                  className="widget-img" 
                />
                <div className="widget-price-overlay">
                  <strong>REDMI NOTE 15 SERIES</strong>
                  <span>4.990.000 ₫ - Tặng Loa Bluetooth 399k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THANH THẺ PHÂN LOẠI NHANH CATEGORY PILLS BAR BÊN DƯỚI HERO */}
      <div className="quick-category-pills-bar">
        <button 
          className="pill-btn-primary"
          onClick={() => handleFilterPillClick("ALL")}
        >
          ĐIỆN THOẠI
        </button>
        <div className="pills-scroll-list">
          {filterPills.map((pill, idx) => (
            <button
              key={idx}
              className={`pill-btn-tag ${searchQuery.toLowerCase() === pill.query.toLowerCase() ? "active" : ""}`}
              onClick={() => handleFilterPillClick(pill.query)}
            >
              {pill.name}
            </button>
          ))}
        </div>
      </div>

      {/* KHU VỰC TRANG DANH SÁCH SẢN PHẨM & BỘ LỌC */}
      <div className="product-section-wrapper">
        <div className="product-list-header">
          <h2 className="section-title-left">
            <Sparkles className="title-icon" size={22} />
            {searchQuery
              ? `Kết quả tìm kiếm cho: "${searchQuery}"`
              : categoryQuery
              ? `Danh mục: ${categoryQuery}`
              : "Sản phẩm nổi bật tại Phenikaa Store"}
          </h2>
        </div>

        {/* Thanh Bộ Lọc & Sắp Xếp */}
        <FilterBar
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={processedProducts.length}
        />

        {/* Lưới Sản Phẩm */}
        <div className="product-list-page">
          {loading ? (
            <div className="loading-state-container">
              <div className="spinner"></div>
              <p>Đang tải danh sách sản phẩm...</p>
            </div>
          ) : processedProducts.length === 0 ? (
            <div className="empty-state-container">
              <AlertCircle size={48} className="empty-icon" />
              <h3>Không tìm thấy sản phẩm phù hợp!</h3>
              <p>Vui lòng thử chọn lại bộ lọc hoặc tìm kiếm từ khóa khác.</p>
            </div>
          ) : (
            <div className="product-grid">
              {processedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
