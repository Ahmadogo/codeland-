import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { Reflector } from '@nestjs/core';
import { enumType } from 'src/auth/enums/auth-type.enum';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  private static readonly defaultOfType = enumType;

  private readonly authTypeGuardMap = {

    [enumType.Bearer] : this.accessTokenGuard,
    [enumType.None] : this.canActivate
  };

  constructor(
    private readonly reflector: Reflector,

    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
