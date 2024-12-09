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
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; //import the Dto  validation that  we've done
import { ValidationPipe } from '@nestjs/common';
import { GetUserParamDto } from 'src/users/dto/get-usersParam.dto';
import { UserService } from './providers/user.services';

//http://localhost:3000/users

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService ) {}  // injecting a dependency of a userService 

  @Get('/:id?')
  public getUsers(
    @Param() getUserParamDto: GetUserParamDto, //converts the strings into numbers
    @Query('limits', new DefaultValuePipe(20), ParseIntPipe) limits: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // the nmber of values to appear in a single page
  ) {
    console.log(getUserParamDto);
    console.log(limits);
    console.log(page);
    return this.userService.findAll(getUserParamDto, limits, page)
  }

  @Post()
  public createtUsers(
    @Body() createtUserDto: CreateUserDto  //using the validation dto as the body type
  ) {
    console.log(createtUserDto); //getting an IP address of a user
    console.log(typeof createtUserDto)
    console.log(createtUserDto instanceof CreateUserDto)
    return {mesage: 'Request sent to post new user',
      body: createtUserDto
    };
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
