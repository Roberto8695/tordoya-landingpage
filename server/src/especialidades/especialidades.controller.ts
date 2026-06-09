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
import { EspecialidadesService } from './especialidades.service';
import type { CreateEspecialidadWithServiciosDto } from './dto/create-especialidad.dto';
import type { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Get()
  async findAll() {
    return this.especialidadesService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.especialidadesService.findBySlug(slug);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateEspecialidadWithServiciosDto) {
    return this.especialidadesService.create(body);
  }

  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() body: UpdateEspecialidadDto,
  ) {
    return this.especialidadesService.update(slug, body);
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('slug') slug: string) {
    await this.especialidadesService.remove(slug);
  }
}