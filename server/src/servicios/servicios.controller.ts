import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import type { CreateServicioDto } from './dto/create-servicio.dto';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get()
  async findAll() {
    return this.serviciosService.findAll();
  }

  @Get('especialidad/:slug')
  async findByEspecialidad(@Param('slug') slug: string) {
    return this.serviciosService.findByEspecialidad(slug);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.serviciosService.findOne(slug);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateServicioDto) {
    return this.serviciosService.create(body);
  }

  @Put(':slug')
  async update(@Param('slug') slug: string, @Body() body: Partial<CreateServicioDto>) {
    return this.serviciosService.update(slug, body);
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('slug') slug: string) {
    await this.serviciosService.remove(slug);
  }
}