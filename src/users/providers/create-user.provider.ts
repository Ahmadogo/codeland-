import {
  BadRequestException,
  forwardRef,
  Injectable,
  Inject,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, //repo injection 

    @Inject(forwardRef(() => HashingProvider))
    
    private readonly hashingProvider: HashingProvider,    // dependency injecion of the hashed password 
  ) {}

  public async createUsers(createUserDto: CreateUserDto) {
    // check if user already exits
    let existingUser = undefined;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      //save/log the error
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error connecting to your database',
          cause: 'the user is on bad network',
        },
      );
    }

    // Handle Error
    if (existingUser) {
      throw new BadRequestException('User already exist');
    }

    // Create the user
    let newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashedPassword(
        createUserDto.password,
      ),
    });

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Taking too long to respond, Please try later',
        {
          description: 'Error connecting to your database',
          cause: 'the user is on a bad  network',
        },
      );
    }
    return newUser;
  }
}
