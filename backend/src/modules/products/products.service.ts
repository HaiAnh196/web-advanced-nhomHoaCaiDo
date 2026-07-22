import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  subBanner?: string;
  rating?: number;
  reviewCount?: number;
  eduPrice?: number;
  vipPrice?: number;
  promotionText?: string;
  extraPromotions?: number;
  stock: number;
  imageUrl: string;
  category: string;
  createdAt: Date;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'iPhone 17 Pro Max 256GB Chính Hãng',
      description: 'Super Retina XDR, Chip A19 Pro siêu mạnh mẽ, Camera cao cấp.',
      price: 34790000,
      oldPrice: 37490000,
      badge: 'Trả góp 0% trả trước 0đ',
      subBanner: 'iPhone chính hãng bảo hành 24 tháng miễn phí.',
      rating: 5.0,
      reviewCount: 46,
      eduPrice: 34690000,
      vipPrice: 34640000,
      promotionText: 'Tặng gói bảo hành 2 năm trị giá 2.000.000đ',
      extraPromotions: 3,
      stock: 15,
      imageUrl: 'https://clickbuy.com.vn/uploads/pro/iphone-17-pro-max-7908-hqzm-1024x1024-218698.jpg',
      category: 'iPhone',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Sạc nhanh iphone',
      description: 'Áo thun đồng phục chất liệu cotton thoáng mát, logo thêu sắc nét.',
      price: 150000,
      oldPrice: 180000,
      badge: 'Bán chạy nhất',
      subBanner: 'Dây sạc iphone chính hãng ĐT',
      rating: 4.8,
      reviewCount: 128,
      eduPrice: 140000,
      vipPrice: 135000,
      promotionText: 'Tặng kèm 01 túi bóng',
      extraPromotions: 2,
      stock: 50,
      imageUrl: 'https://clickbuy.com.vn/uploads/pro/104234/214840-sac-nhanh-iphone-20w-original-1.jpg',
      category: 'Phụ kiện',
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Bình Nước Giữ Nhiệt Phenikaa Uni',
      description: 'Bình inox 304 dung tích 500ml giữ nhiệt 12 tiếng.',
      price: 120000,
      oldPrice: 150000,
      badge: 'Ưu đãi 20%',
      subBanner: 'Inox 304 giữ nhiệt cao cấp 12h',
      rating: 4.9,
      reviewCount: 64,
      eduPrice: 110000,
      vipPrice: 105000,
      promotionText: 'Tặng túi chống sốc đựng bình nước',
      extraPromotions: 1,
      stock: 30,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80',
      category: 'Phụ kiện',
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'Balo Laptop Sinh Viên Phenikaa',
      description: 'Balo chống nước, ngăn chứa laptop 15.6 inch chống sốc.',
      price: 280000,
      oldPrice: 350000,
      badge: 'Giảm 70k',
      subBanner: 'Chống nước 100% bảo hành 12 tháng',
      rating: 4.7,
      reviewCount: 89,
      eduPrice: 260000,
      vipPrice: 250000,
      promotionText: 'Tặng bao che mưa balo thời trang',
      extraPromotions: 2,
      stock: 20,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
      category: 'Phụ kiện',
      createdAt: new Date(),
    },
  ];

  findAll(search?: string, category?: string): Product[] {
    let result = this.products;

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    return result;
  }

  findOne(id: string): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có ID: ${id}`);
    }
    return product;
  }

  create(dto: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...dto,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, dto: Partial<Omit<Product, 'id' | 'createdAt'>>): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có ID: ${id}`);
    }

    this.products[index] = {
      ...this.products[index],
      ...dto,
    };
    return this.products[index];
  }

  remove(id: string): { message: string } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có ID: ${id}`);
    }

    this.products.splice(index, 1);
    return { message: 'Đã xóa sản phẩm thành công!' };
  }
}
