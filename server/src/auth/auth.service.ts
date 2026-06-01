import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(payload: LoginDto) {
    const email = payload.email.trim().toLowerCase();

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    const users = await this.prisma.$queryRaw<
      Array<{ id: string; email: string; password: string; role: string }>
    >(
      Prisma.sql`
        SELECT id, email, password, role
        FROM usuarios
        WHERE lower(email) = lower(${email})
        LIMIT 1
      `,
    );

    const user = users[0];
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
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
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  }
}
