import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByEmail {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async findOneBy(email: string) {
    let user: User | undefined;
    try {
      user = await this.usersRepository.findOneBy({ email });
      
    } catch (error) {
      throw new  RequestTimeoutException( error,
        { 
          description: "error while connecting to the database", 
          cause: 'User not found' 
        },
      );
    }
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
