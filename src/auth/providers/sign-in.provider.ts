import {
  Injectable,
  Inject,
  forwardRef,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/user.services';
import { SignInDto } from '../dto/signIn.dto';
import { HashingProvider } from './hashing.provider';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly hashingProvider: HashingProvider, //dependency injection of hashingProvider

    private readonly jwtService: JwtService, //dependency injection of jwtService

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>, //dependency injection of jwtConfigurations
  ) {}

  public async SignIn(signInDto: SignInDto) {
    //finding a  user in the DB
    const user = await this.userService.GetOneByEmail(signInDto.email);

    //comparing password provided to the hashed password
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparedPassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'password does not match',
      });
    }

    //confirmation message
    if (!isEqual) {
      throw new UnauthorizedException('email/password misMatch');
    }

    const access_token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfigurations.audience,
        issuer: this.jwtConfigurations.issuer,
        expiresIn: this.jwtConfigurations.ttl,
      },
    );
    return { access_token };
  }
}
