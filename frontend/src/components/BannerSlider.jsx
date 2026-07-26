import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function BannerSlider() {
  const defaultSlides = [
    {
      id: 1,
      tabTitle: "Galaxy S26 Series đã sẵn hàng",
      title: "THU CŨ ĐỔI XANH",
      subtitle: "TÁI TẠO NĂNG LƯỢNG - GIÁ CHỈ TỪ 399K",
      badge: "THỜI GIAN: Từ ngày 24.06 đến 30.06.2026",
      bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
      link: "/product/1"
    },
    {
      id: 2,
      tabTitle: "IPHONE 17 SERIES CHÍNH HÃNG",
      title: "IPHONE 17 PRO MAX",
      subtitle: "Siêu Phẩm Đỉnh Cao 2026 - Tặng gói bảo hành 24 tháng",
      badge: "HOT LAUNCH 2026",
      bgGradient: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
      link: "/product/1"
    },
    {
      id: 3,
      tabTitle: "Thu cũ đổi xanh - Tái tạo năng lượng",
      title: "SIÊU SẢN PHẨM PHENIKAA",
      subtitle: "Bình giữ nhiệt & Balo Laptop chống nước cao cấp",
      badge: "GIẢM 20% CHO SINH VIÊN",
      bgGradient: "linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      link: "/category/phu-kien"
    },
    {
      id: 4,
      tabTitle: "Xiaomi Redmi Note 15 Series giá tốt",
      title: "XIAOMI REDMI NOTE 15",
      subtitle: "Bền Titan - Bền tuyệt đỉnh - Giá chỉ từ 4.990.000đ",
      badge: "TẶNG LOA BLUETOOTH 399K",
      bgGradient: "linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #ea580c 100%)",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
      link: "/category/dien-thoai"
    },
    {
      id: 5,
      tabTitle: "Trả góp iPhone dễ dàng tại HoaCaiDo",
      title: "TRẢ GÓP 0% LÃI SUẤT",
      subtitle: "Trả trước 0đ - Duyệt hồ sơ siêu tốc trong 15 phút",
      badge: "ƯU ĐÃI ĐỘC QUYỀN",
      bgGradient: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)",
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&auto=format&fit=crop&q=80",
      link: "/category/iphone"
    }
  ];

  const [slides, setSlides] = useState(() => {
    try {
      const stored = localStorage.getItem("adminBanners");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const active = parsed.filter((item) => item.status !== "Inactive");
          return active;
        }
      }
    } catch {
      /* empty */
    }
    return defaultSlides;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const activeSlideIndex = slides.length > 0 ? currentSlide % slides.length : 0;

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("adminBanners");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const active = parsed.filter((item) => item.status !== "Inactive");
            setSlides(active);
          }
        } else {
          setSlides(defaultSlides);
        }
      } catch {
        /* empty */
      }
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[activeSlideIndex] || slides[0];

  return (
    <div className="clickbuy-hero-slider-section">
      {/* Khung Slide Ảnh Khuyến Mãi */}
      <div className="hero-main-slide-card">
        <div 
          className="slide-inner-banner"
          style={{ background: activeSlide.bgGradient }}
        >
          <div className="banner-text-side">
            <span className="banner-badge-tag">{activeSlide.badge}</span>
            <h2 className="banner-main-title">{activeSlide.title}</h2>
            <p className="banner-sub-title">{activeSlide.subtitle}</p>
            <a href={activeSlide.link} className="banner-btn-action">
              Khám phá ngay →
            </a>
          </div>
          <div className="banner-img-side">
            <img src={activeSlide.image} alt={activeSlide.title} className="hero-slide-img" />
          </div>
        </div>

        {/* Nút Điều Hướng Trái / Phải */}
        <button className="slider-arrow-btn prev" onClick={handlePrev} aria-label="Slide trước">
          <ChevronLeft size={20} />
        </button>
        <button className="slider-arrow-btn next" onClick={handleNext} aria-label="Slide tiếp">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 5 Tab Tiêu Đề bên dưới Slide */}
      <div className="hero-slider-tabs-row">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`tab-btn-item ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          >
            <span>{slide.tabTitle}</span>
          </button>
        ))}
      </div>

      {/* Dải Banner Phụ Ngang Dưới Tab ("BACK TO SCHOOL") */}
      <div className="hero-sub-banner-strip">
        <div className="sub-strip-left">
          <span className="strip-badge">10.07 đến 30.09</span>
          <strong>BACK TO SCHOOL - HÈ CỰC VUI - SẮM QUÀ CỰC ĐÃ</strong>
        </div>
        <div className="sub-strip-right">
          <span className="strip-highlight">Bảo hành 1 đổi 1 1 năm</span>
          <span className="strip-discount">Giảm đến <strong>1.5 Triệu</strong></span>
        </div>
      </div>
    </div>
  );
}

export default BannerSlider;
