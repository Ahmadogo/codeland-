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
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly hashingProvider: HashingProvider, //dependency injection of hashingProvider

    private readonly generateTokenProvider: GenerateTokensProvider,
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

    return await this.generateTokenProvider.generateToken(user);
  }
}
