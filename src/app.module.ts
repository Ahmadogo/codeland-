import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guard/access-token/access-token.guard';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthTokenGuard } from './auth/guard/auth-token/auth-token.guard';
import { DataResponseInterceptor } from './common/nterceptors/data-response/data-response.interceptor';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, envFilePath: [".env.development"] // this is to make the config module global
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({   // this Fn secure our data just like .env file
        type: 'postgres',
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        synchronize: true, // Only use (TRUE) during Development
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    PostModule,
    TagsModule,
    MetaOptionsModule,
    AuthModule,

    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MailModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthTokenGuard 
    },

    {
      provide:APP_INTERCEPTOR ,
      useClass:  DataResponseInterceptor
    },
    AccessTokenGuard
  ],
})
export class AppModule {}
