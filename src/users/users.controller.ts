import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
  SetMetadata,
  Header,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; //import the Dto  validation that  we've done
import { ValidationPipe } from '@nestjs/common';
import { GetUserParamDto } from 'src/users/dto/get-usersParam.dto';
import { UserService } from './providers/user.services';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';
import { enumType } from 'src/auth/enums/auth-type.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';



//http://localhost:3000/users

@Controller('users')
// @ApiTags('users')ka
export class UsersController {
  constructor(private readonly userService: UserService) {} // injecting a dependency of a userService
  @ApiOperation({ summary: 'this fetches all users' })
  @ApiResponse(
    {
      status: 200,
      description: "users fetched succesfully based on the query"
    })
  @Get('/:id?/')
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'no of entries per querry 10',
  })
  public getUsers(
    @Param() getUserParamDto: GetUserParamDto, //converts the strings into numbers
    @Query('limits', new DefaultValuePipe(20), ParseIntPipe) limits: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // the nmber of values to appear in a single page
  ) {
    console.log(getUserParamDto);
    console.log(limits);
    console.log(page);

    if (getUserParamDto) {
      return this.userService.findOneById(getUserParamDto.id)
    }
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({summary : "this makes a new post"})
  // @SetMetadata("authType", "None")
  @Auth(enumType.None)
  public createtUsers(
    @Body() createtUserDto: CreateUserDto, //using the validation dto as the body type
    // @Headers() header: any
  ) {
    console.log(createtUserDto); //getting an IP address of a user
    console.log(typeof createtUserDto);
    console.log(createtUserDto instanceof CreateUserDto);
    // return { mesage: 'Request sent to post new user', body: createtUserDto };
    return this.userService.createUser(createtUserDto)
  }

  @Patch()
  public patchUsers(@Ip() ip: any) {
    console.log(ip);
    return 'Request sent to add new user';
  }

  @Delete()
  public deleteUsers() {
    return 'Request sent to delete  user';
  }
}
