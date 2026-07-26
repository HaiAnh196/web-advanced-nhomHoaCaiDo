import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

function FilterBar({ 
  selectedPriceRange, 
  setSelectedPriceRange, 
  sortBy, 
  setSortBy, 
  totalResults 
}) {
  return (
    <div className="filter-bar-container">
      <div className="filter-info">
        <SlidersHorizontal size={18} className="filter-icon" />
        <span className="filter-title">Bộ lọc sản phẩm</span>
        <span className="filter-count">({totalResults} sản phẩm)</span>
      </div>

      <div className="filter-controls">
        {/* Khoảng giá */}
        <div className="filter-group">
          <label htmlFor="priceRange">Khoảng giá:</label>
          <select 
            id="priceRange"
            value={selectedPriceRange} 
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả giá</option>
            <option value="under-500k">Dưới 500.000 ₫</option>
            <option value="500k-2m">500.000 ₫ - 2.000.000 ₫</option>
            <option value="over-2m">Trên 2.000.000 ₫</option>
          </select>
        </div>

        {/* Sắp xếp */}
        <div className="filter-group">
          <ArrowUpDown size={16} className="sort-icon" />
          <label htmlFor="sortBy">Sắp xếp:</label>
          <select 
            id="sortBy"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
