import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { UserService } from 'src/users/providers/user.services';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly generateTokenProvider: GenerateTokensProvider,

    private readonly jwtService: JwtService, //dependency injection of jwtService

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      // validate using jwtService
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );
      //find user from Db
      const user = await this.userService.findOneById(sub);

      //generate the token
      return await this.generateTokenProvider.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
