import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './providers/auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  public async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.SignIn(signInDto);
  }

  public async refreshToken (refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto)
  }
}

//   @Get()
//   findAll() {
//     return this.authService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.authService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
// }
