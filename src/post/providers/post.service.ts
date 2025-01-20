import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { PostParamDto } from '../dto/create-post.dto';
import { UserService } from 'src/users/providers/user.services';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dto/patch-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaRepository: Repository<MetaOption>,

    private readonly userService: UserService, //  Dependency Injection

    private readonly tagsService: TagsService,
  ) {}

  public async findAllPosts(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: { author: true },
    });
  }

  public async createPost(createPostDto: PostParamDto): Promise<Post> {
    // Create author
    const author = await this.userService.findOneById(createPostDto.authorId);

    // find Tags
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    // Create a post
    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags,
    });

    // Return the post to the user
    return await this.postRepository.save(post);
  }

  public async deletePost(
    id: number,
  ): Promise<{ message: string; id: number }> {
    // Find the target post and metaOption
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      return { message: 'Post not found', id };
    }

    // Delete the target post
    await this.postRepository.delete({ id });

    // Delete the target metaOption, if it exists
    if (post.metaOptions) {
      await this.metaRepository.delete(post.metaOptions.id);
    }

    // Confirmation
    return { message: 'Hurray!! you don delete am', id };
  }

  public async editPost(patchPost: PatchPostDto) {
    //find the target tag
      const tags = await this.tagsService.findMultipleTags(patchPost.tags);
    //find the target post
      let post = await this.postRepository.findOneBy({ id: patchPost.id });
    //edit their properties
      post.title = patchPost.title ?? post.title;
      post.content = patchPost.content ?? post.content;
      post.postType = patchPost.postType ?? post.postType;
      post.imageUrl = patchPost.imageUrl ?? post.imageUrl;
    //assign new tags
      post.tags = tags;
    //save the post
    return await this.postRepository.save(post)
  }
}
