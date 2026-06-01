import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    const result = await this.authService.login(body);

    if (!result) {
      return {
        ok: false,
        message: 'Credenciales invalidas',
      };
    }

    return {
      ok: true,
      ...result,
    };
  }
}
