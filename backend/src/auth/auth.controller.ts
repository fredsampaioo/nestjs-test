import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../users/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      return this.authService.login(user);
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('recover-password')
  async recoverPassword(@Body() body: { email: string }) {
    await this.authService.recoverPassword(body.email);
    return { message: 'Password recovery email sent' };
  }
}
