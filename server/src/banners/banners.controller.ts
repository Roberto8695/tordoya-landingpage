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
import { BannersService } from './banners.service';
import type { CreateBannerDto } from './dto/create-banner.dto';
import type { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  async findAll() {
    return this.bannersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bannersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateBannerDto) {
    return this.bannersService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateBannerDto,
  ) {
    return this.bannersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.bannersService.remove(id);
  }

  @Put('reorder')
  async reorder(@Body() body: { ids: string[] }) {
    return this.bannersService.reorder(body.ids);
  }
}
