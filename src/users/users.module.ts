import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByEmail } from './providers/find-one-by-email';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule), //import the authModule as a callBack fn
    
    ConfigModule.forFeature(jwtConfig), //import jwt for security purpose
    JwtModule.registerAsync(jwtConfig.asProvider()) //register the jwt module
  ],
  controllers: [UsersController],
  providers: [UserService, CreateUserProvider, FindOneByEmail, {

    provide: APP_GUARD,
    useClass: AccessTokenGuard    //this generalizes our guards to protect everything in users module
  }],
  exports: [UserService, TypeOrmModule, FindOneByEmail],
})
export class UsersModule {}
