import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateEspecialidadWithServiciosDto } from './dto/create-especialidad.dto';
import type { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Injectable()
export class EspecialidadesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.especialidad.findMany({
      include: {
        servicios: {
          where: { activo: true },
          orderBy: { orden: 'asc' },
        },
      },
      orderBy: { orden: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const especialidad = await this.prisma.especialidad.findUnique({
      where: { slug },
      include: {
        servicios: {
          where: { activo: true },
          orderBy: { orden: 'asc' },
        },
      },
    });

    if (!especialidad) {
      throw new NotFoundException(`Especialidad "${slug}" no encontrada`);
    }

    return especialidad;
  }

  async create(data: CreateEspecialidadWithServiciosDto) {
    const { servicios, ...especialidadData } = data;
    return this.prisma.especialidad.create({
      data: {
        ...especialidadData,
        servicios: servicios?.length
          ? { create: servicios }
          : undefined,
      },
      include: { servicios: true },
    });
  }

  async update(slug: string, data: UpdateEspecialidadDto) {
    const existing = await this.prisma.especialidad.findUnique({
      where: { slug },
    });
    if (!existing) {
      throw new NotFoundException(`Especialidad "${slug}" no encontrada`);
    }

    return this.prisma.especialidad.update({
      where: { slug },
      data,
      include: { servicios: true },
    });
  }

  async remove(slug: string) {
    const existing = await this.prisma.especialidad.findUnique({
      where: { slug },
    });
    if (!existing) {
      throw new NotFoundException(`Especialidad "${slug}" no encontrada`);
    }

    return this.prisma.especialidad.delete({
      where: { slug },
    });
  }
}