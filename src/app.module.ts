import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { PostModule } from './post/post.module';


@Module({
  imports: [UsersModule, PostModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})

export class AppModule {}

