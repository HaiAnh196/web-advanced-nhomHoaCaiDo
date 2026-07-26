import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    try {
      const admin = await this.findOneByUsername('admin');
      if (!admin) {
        await this.create({
          username: 'admin',
          password: '123',
          role: 'ADMIN',
          fullName: 'Quản trị viên Hệ thống',
          email: 'admin@phenikaa-uni.edu.vn',
          status: 'Active',
        });
        console.log('✅ Created default admin account: admin / 123');
      }

      // Seed a sample customer account if none exists
      const userCount = await this.userRepository.count();
      if (userCount <= 1) {
        await this.create({
          username: 'sinhvien1',
          password: '123',
          role: 'USER',
          fullName: 'Nguyễn Văn An',
          email: 'an.nguyen@student.phenikaa-uni.edu.vn',
          phone: '0988123456',
          status: 'Active',
        });
        await this.create({
          username: 'khachhang2',
          password: '123',
          role: 'USER',
          fullName: 'Trần Thị Mai',
          email: 'mai.tran@gmail.com',
          phone: '0912345678',
          status: 'Active',
        });
      }
    } catch (e) {
      console.error('Error seeding admin/users:', e);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async create(data: Partial<User>): Promise<User> {
    if (!data.role) data.role = 'USER';
    if (!data.status) data.status = 'Active';
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
