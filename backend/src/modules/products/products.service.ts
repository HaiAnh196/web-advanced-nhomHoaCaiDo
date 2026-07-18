import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
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
      name: 'Áo Đồng Phục Sinh Viên Phenikaa',
      description:
        'Áo thun đồng phục chất liệu cotton thoáng mát, logo thêu sắc nét.',
      price: 150000,
      stock: 50,
      imageUrl: 'https://via.placeholder.com/300x300?text=Ao+Phenikaa',
      category: 'Đồng phục',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Bình Nước Giữ Nhiệt Phenikaa Uni',
      description: 'Bình inox 304 dung tích 500ml giữ nhiệt 12 tiếng.',
      price: 120000,
      stock: 30,
      imageUrl: 'https://via.placeholder.com/300x300?text=Binh+Nuoc',
      category: 'Phụ kiện',
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Balo Laptop Sinh Viên Phenikaa',
      description: 'Balo chống nước, ngăn chứa laptop 15.6 inch chống sốc.',
      price: 280000,
      stock: 20,
      imageUrl: 'https://via.placeholder.com/300x300?text=Balo+Phenikaa',
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
