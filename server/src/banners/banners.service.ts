import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateBannerDto } from './dto/create-banner.dto';
import type { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.bannerSlide.findMany({
      orderBy: { orden: 'asc' },
    });
  }

  async findOne(id: string) {
    const slide = await this.prisma.bannerSlide.findUnique({ where: { id } });
    if (!slide) throw new NotFoundException(`Banner slide with id "${id}" not found`);
    return slide;
  }

  async create(dto: CreateBannerDto) {
    const { cta2, ...rest } = dto;
    return this.prisma.bannerSlide.create({
      data: cta2 ? { ...rest, cta2 } : rest,
    });
  }

  async update(id: string, dto: UpdateBannerDto) {
    await this.findOne(id);
    const { cta2, ...rest } = dto;
    return this.prisma.bannerSlide.update({
      where: { id },
      data: cta2 ? { ...rest, cta2 } : rest,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.bannerSlide.delete({ where: { id } });
  }

  async reorder(ids: string[]) {
    const updates = ids.map((id, index) =>
      this.prisma.bannerSlide.update({ where: { id }, data: { orden: index } }),
    );
    await this.prisma.$transaction(updates);
    return this.findAll();
  }
}
