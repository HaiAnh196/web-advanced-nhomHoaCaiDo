import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Kiểm thử E2E & Bắt lỗi hệ thống (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Kiểm thử gốc (Root /)', () => {
    it('/ (GET) - trả về Hello World!', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('Kiểm thử & Bắt lỗi API Sản phẩm (/products)', () => {
    it('/products (GET) - trả về danh sách sản phẩm (200 OK)', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('/products/:id (GET) - [Bắt lỗi] trả về 404 Not Found khi tìm ID không tồn tại', async () => {
      const response = await request(app.getHttpServer())
        .get('/products/9999999999')
        .expect(404);

      expect(response.body.message).toContain(
        'Không tìm thấy sản phẩm có ID: 9999999999',
      );
    });
  });

  describe('Kiểm thử & Bắt lỗi API Xác thực (/auth)', () => {
    it('/auth/login (POST) - [Bắt lỗi] trả về 401 Unauthorized khi sai mật khẩu', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: 'wrong_password_123' })
        .expect(401);

      expect(response.body.message).toContain(
        'Tên đăng nhập hoặc mật khẩu không chính xác!',
      );
    });

    it('/auth/login (POST) - đăng nhập thành công với admin (200 OK)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: '123' })
        .expect(201); // NestJS @Post mặc định trả về 201

      expect(response.body).toHaveProperty('access_token');
      expect(response.body.role).toBe('ADMIN');
    });
  });
});
