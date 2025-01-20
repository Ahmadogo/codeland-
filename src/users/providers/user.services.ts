import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmail } from './find-one-by-email';

// Any communication to the dataBase must come from the services

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, //Repo injection of user entity

    @Inject(forwardRef(() => AuthService)) //circular dependency injection of authservice
    private readonly authService: AuthService, //dependency injection of authservice

    private readonly findOneByEmail: FindOneByEmail, //dependency injection of FindOneByEmail

    private readonly createUserProvider: CreateUserProvider, //dependency injection of CreateUserProvider
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    //creating a User
    return this.createUserProvider.createUsers(createUserDto);
  }

  public async GetOneByEmail(email: string) {
    return this.findOneByEmail.findOneBy(email); //checking of an email before LogIn
  }

  public async deleteUser() {
    throw new HttpException(
      {
        status: HttpStatus.GONE,
        error: 'user deleted successfully',
      },
      HttpStatus.GONE,
    );
  }
  public async findOneById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
