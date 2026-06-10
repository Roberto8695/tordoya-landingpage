import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateServicioDto } from './dto/create-servicio.dto';

@Injectable()
export class ServiciosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.servicio.findMany({
      include: {
        especialidad: {
          select: { id: true, slug: true, nombre: true, color: true },
        },
      },
      orderBy: [{ especialidadId: 'asc' }, { orden: 'asc' }],
    });
  }

  async findByEspecialidad(slug: string) {
    const especialidad = await this.prisma.especialidad.findUnique({
      where: { slug },
    });
    if (!especialidad) {
      throw new NotFoundException(`Especialidad "${slug}" no encontrada`);
    }

    return this.prisma.servicio.findMany({
      where: { especialidadId: especialidad.id },
      orderBy: { orden: 'asc' },
    });
  }

  async findOne(slug: string) {
    const servicio = await this.prisma.servicio.findUnique({
      where: { slug },
      include: {
        especialidad: {
          select: { id: true, slug: true, nombre: true, color: true },
        },
      },
    });
    if (!servicio) {
      throw new NotFoundException(`Servicio "${slug}" no encontrado`);
    }
    return servicio;
  }

  async create(data: CreateServicioDto) {
    const { especialidadSlug, ...rest } = data;

    let especialidadId = data.especialidadId;
    if (especialidadSlug && !especialidadId) {
      const esp = await this.prisma.especialidad.findUnique({
        where: { slug: especialidadSlug },
      });
      if (!esp) {
        throw new NotFoundException(`Especialidad "${especialidadSlug}" no encontrada`);
      }
      especialidadId = esp.id;
    }

    return this.prisma.servicio.create({
      data: {
        ...rest,
        especialidadId: especialidadId!,
      },
      include: {
        especialidad: {
          select: { id: true, slug: true, nombre: true, color: true },
        },
      },
    });
  }

  async update(slug: string, data: Partial<CreateServicioDto>) {
    const existing = await this.prisma.servicio.findUnique({ where: { slug } });
    if (!existing) {
      throw new NotFoundException(`Servicio "${slug}" no encontrado`);
    }

    const { especialidadSlug, ...rest } = data;

    return this.prisma.servicio.update({
      where: { slug },
      data: rest,
      include: {
        especialidad: {
          select: { id: true, slug: true, nombre: true, color: true },
        },
      },
    });
  }

  async remove(slug: string) {
    const existing = await this.prisma.servicio.findUnique({ where: { slug } });
    if (!existing) {
      throw new NotFoundException(`Servicio "${slug}" no encontrado`);
    }
    await this.prisma.servicio.delete({ where: { slug } });
  }
}