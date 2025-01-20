import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { PostParamDto } from './create-post.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PatchPostDto extends PartialType(PostParamDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}

