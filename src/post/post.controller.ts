import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { PostParamDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public findAllPosts() {
    return this.postService.findAllPosts();
  }

  @Post()
  public createPost(@Body() createPostDto: PostParamDto) {
    return this.postService.createPost(createPostDto);
  }

  @Patch()
  public editPost(@Body() patchPostDto:PatchPostDto) {
    return this.postService.editPost(patchPostDto)
  }

  @Delete(':id')
  public deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
