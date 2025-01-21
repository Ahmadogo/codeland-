import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInProvider } from './providers/sign-in.provider';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';


@Module({
  imports: [
    forwardRef(() => UsersModule), //import the userModule as a callBack fn
    ConfigModule.forFeature(jwtConfig), //import jwt for security purpose
    JwtModule.registerAsync(jwtConfig.asProvider()), //register the jwt module
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    BcryptProvider,
    SignInProvider,
    GenerateTokensProvider,
    RefreshTokensProvider,
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
