import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-option.service';
import { CreatePostMetaOptionsDto } from './dto/create-meta-option.dto';
import { UpdateMetaOptionDto } from './dto/update-meta-option.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  public createPostMetaOptions(
    @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    return this.metaOptionsService.create(createPostMetaOptionsDto);
  }

  // @Get()
  // public findAll() {
  //   return this.metaOptionsService.findAll();
  // }

  // @Get(':id')
  // public findOne(@Param('id') id: string) {
  //   return this.metaOptionsService.findOne(+id);
  // }

  // @Patch(':id')
  // public update(
  //   @Param('id') id: string,
  //   @Body() updateMetaOptionDto: UpdateMetaOptionDto,
  // ) {
  //   return this.metaOptionsService.update(+id, updateMetaOptionDto);
  // }

  // @Delete(':id')
  // public remove(@Param('id') id: string) {
  //   return this.metaOptionsService.remove(+id);
  // }
}
