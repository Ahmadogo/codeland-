import { PartialType } from '@nestjs/swagger';
import { CreatePostMetaOptionsDto } from './create-meta-option.dto';

export class UpdateMetaOptionDto extends PartialType(CreatePostMetaOptionsDto) {}
