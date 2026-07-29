import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService - Đơn vị kiểm định (Unit Test) & Bắt lỗi xác thực', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByUsername: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock_jwt_token_12345'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login() - Kiểm thử đăng nhập hợp lệ & Bắt lỗi bảo mật', () => {
    it('nên đăng nhập thành công với tài khoản admin hợp lệ', async () => {
      jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue({
        id: 1,
        username: 'admin',
        password: '123',
        role: 'ADMIN',
        status: 'Active',
      });

      const result = await service.login('admin', '123');
      expect(result).toEqual({
        access_token: 'mock_jwt_token_12345',
        username: 'admin',
        role: 'ADMIN',
      });
      expect(jwtService.signAsync).toHaveBeenCalled();
    });

    it('nên đăng nhập thành công với tài khoản người dùng thường (user)', async () => {
      jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue({
        id: 2,
        username: 'toan',
        password: 'password123',
        role: 'USER',
        status: 'Active',
      });

      const result = await service.login('toan', 'password123');
      expect(result.access_token).toBe('mock_jwt_token_12345');
      expect(result.role).toBe('USER');
    });

    it('[Bắt lỗi] nên ném UnauthorizedException khi sai mật khẩu', async () => {
      jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue({
        id: 2,
        username: 'toan',
        password: 'correct_password',
        role: 'USER',
        status: 'Active',
      });

      await expect(service.login('toan', 'wrong_password')).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(service.login('toan', 'wrong_password')).rejects.toThrow(
        'Tên đăng nhập hoặc mật khẩu không chính xác!',
      );
    });

    it('[Bắt lỗi] nên ném UnauthorizedException khi tài khoản không tồn tại', async () => {
      jest.spyOn(usersService, 'findOneByUsername').mockResolvedValue(null as any);

      await expect(service.login('non_existing_user', 'any_pass')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register()', () => {
    it('nên tạo tài khoản mới thành công', async () => {
      const mockNewUser = {
        id: 3,
        username: 'newuser',
        password: 'hashed_password',
        role: 'USER',
        status: 'Active',
      };
      jest.spyOn(usersService, 'create').mockResolvedValue(mockNewUser);

      const result = await service.register({
        username: 'newuser',
        password: 'hashed_password',
      });
      expect(result).toEqual(mockNewUser);
      expect(usersService.create).toHaveBeenCalledWith({
        username: 'newuser',
        password: 'hashed_password',
      });
    });
  });
});
