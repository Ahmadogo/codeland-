import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('post')
export class PostController {
  @Post()
  public createPost(@Body() body: any) {

    console.log(body);
    return {
      message: 'Request sent to post new user',
      body: body,
    };
  }
}
