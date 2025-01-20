import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionsService } from './providers/meta-option.service';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOption } from './meta-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaOptionsService],
  controllers: [MetaOptionsController],
  exports: [MetaOptionsService],
})
export class MetaOptionsModule {}
