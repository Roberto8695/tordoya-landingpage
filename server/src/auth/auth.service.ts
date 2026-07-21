import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import type { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(payload: LoginDto) {
    const email = payload.email.trim().toLowerCase();

    const user = await this.prisma.usuario.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const passwordValid = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!passwordValid) {
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