import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService - Đơn vị kiểm định (Unit Test) & Kiểm thử bắt lỗi', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('nên trả về toàn bộ danh sách sản phẩm mặc định (4 sản phẩm)', () => {
      const products = service.findAll();
      expect(products.length).toBe(4);
    });

    it('nên lọc sản phẩm theo từ khóa search (chọn lọc theo tên)', () => {
      const result = service.findAll('iPhone');
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0].name).toContain('iPhone');
    });

    it('nên lọc sản phẩm theo danh mục (category)', () => {
      const result = service.findAll(undefined, 'Phụ kiện');
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result.every((p) => p.category === 'Phụ kiện')).toBe(true);
    });
  });

  describe('findOne() - Kiểm thử bình thường & Bắt lỗi ngoại lệ', () => {
    it('nên trả về đúng sản phẩm khi ID tồn tại', () => {
      const product = service.findOne('1');
      expect(product).toBeDefined();
      expect(product.id).toBe('1');
    });

    it('[Bắt lỗi] nên ném ngoại lệ NotFoundException khi tìm ID không tồn tại', () => {
      expect(() => service.findOne('99999')).toThrow(NotFoundException);
      expect(() => service.findOne('99999')).toThrow(
        'Không tìm thấy sản phẩm có ID: 99999',
      );
    });
  });

  describe('create()', () => {
    it('nên tạo sản phẩm mới thành công và bổ sung vào danh sách', () => {
      const initialCount = service.findAll().length;
      const created = service.create({
        name: 'Sản phẩm Test',
        description: 'Mô tả test',
        price: 100000,
        stock: 10,
        imageUrl: 'http://example.com/test.jpg',
        category: 'Test',
      });

      expect(created).toHaveProperty('id');
      expect(created.name).toBe('Sản phẩm Test');
      expect(service.findAll().length).toBe(initialCount + 1);
    });
  });

  describe('update() - Kiểm thử cập nhật & Bắt lỗi', () => {
    it('nên cập nhật thông tin sản phẩm thành công khi ID tồn tại', () => {
      const updated = service.update('1', { price: 30000000 });
      expect(updated.price).toBe(30000000);
    });

    it('[Bắt lỗi] nên ném ngoại lệ NotFoundException khi cập nhật ID không tồn tại', () => {
      expect(() =>
        service.update('99999', { name: 'New Name' }),
      ).toThrow(NotFoundException);
    });
  });

  describe('remove() - Kiểm thử xóa & Bắt lỗi', () => {
    it('nên xóa sản phẩm thành công khi ID hợp lệ', () => {
      const result = service.remove('2');
      expect(result).toEqual({ message: 'Đã xóa sản phẩm thành công!' });
      expect(() => service.findOne('2')).toThrow(NotFoundException);
    });

    it('[Bắt lỗi] nên ném ngoại lệ NotFoundException khi xóa ID không tồn tại', () => {
      expect(() => service.remove('99999')).toThrow(NotFoundException);
    });
  });
});
