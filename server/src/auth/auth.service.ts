import { Injectable } from '@nestjs/common';
import type { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(payload: LoginDto) {
    const email = payload.email.trim().toLowerCase();

    const user = await this.prisma.usuario.findFirst({
      where: { email },
    });

    if (!user || user.password !== payload.password) {
      return null;
    }

    return {
      token: 'demo-token',
      user: {
        email: user.email,
        role: user.role,
      },
    };
  }
}