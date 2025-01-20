import {
  IsArray,
  IsDate,
  IsEmpty,
  IsEnum,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { statusType } from '../enums/statusType.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dto/create-meta-option.dto';
import { Tag } from 'src/tags/tag.entity';

export class PostParamDto {

  @IsNotEmpty()
  @IsInt()
  authorId: number;


  @IsString()
  @MinLength(10)
  @ApiProperty({
    description: 'Tittle must be provided',
    example: 'Ahmad Abdul',
  })
  title: string;

  // @IsString()
  // @IsOptional()
  // @IsEnum(PostParamDto)
  // author: PostParamDto;

  @IsNotEmpty()
  @IsEnum(postType)
  @ApiProperty({
    enum: postType,
    description: 'post type must be specified  either story, post, page,series',
  })
  postType: postType;

  @IsEnum(statusType)
  @ApiProperty({
    enum: statusType,
    description:
      'status type should be there MF either draft, schedule, review, published',
  })
  postStatus: statusType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'content is required',
  })
  content: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'The published date of the post' })
  // @IsDate()
  @IsISO8601() // Remove @IsDate() and keep only this
  @IsISO8601()
  publishedDate?: Date;

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  @ApiProperty({
    description: 'tags are important  (Array of id of tags)',
    example: [1 ,2]
  })
  tags: number[];

  // @ApiPropertyOptional({
  //   type: 'object',
  //   required: false,
  //   items: {
  //     type: 'object',
  //     properties: {
  //       metavalue: {
  //         type: 'json',
  //         description: 'The metaValue is a JSON string',
  //         example: '{"sidebarEnabled": true,}',
  //       },
  //     },
  //   },
  // })

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;
}
