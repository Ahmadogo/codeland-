import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth-constants';


@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, //dependency injection of jwtService

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>, //dependency injection of jwtConfigurations
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Extract the request from the execution context
    const request = context.switchToHttp().getRequest();
    // Extract the token from the header
    const token = this.extractRequest(request);
    // Validate the token
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfigurations,
      );
      request[REQUEST_USER_KEY ] = payload;
      console.log(payload);
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }

  private extractRequest(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
