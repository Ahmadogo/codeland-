import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.services';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {}
