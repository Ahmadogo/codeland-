import { AUTH_TYPE_KEY } from '../constants/auth-constants';
import { enumType } from '../enums/auth-type.enum';
import { SetMetadata } from '@nestjs/common';

export const Auth = (...authTypes: enumType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);

// export const Auth = (...args: string[]) => SetMetadata('auth', args);
