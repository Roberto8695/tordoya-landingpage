import {
  Controller,
  Get,
  Put,
  Post,
  Body,
} from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import type { UpdateHeaderDto } from './dto/update-header.dto';
import type { UpdateFooterDto } from './dto/update-footer.dto';

@Controller('configuracion')
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Get('header')
  getHeader() {
    return this.configuracionService.getHeader();
  }

  @Put('header')
  updateHeader(@Body() dto: UpdateHeaderDto) {
    return this.configuracionService.updateHeader(dto);
  }

  @Post('header/reset')
  resetHeader() {
    return this.configuracionService.resetHeader();
  }

  @Get('footer')
  getFooter() {
    return this.configuracionService.getFooter();
  }

  @Put('footer')
  updateFooter(@Body() dto: UpdateFooterDto) {
    return this.configuracionService.updateFooter(dto);
  }

  @Post('footer/reset')
  resetFooter() {
    return this.configuracionService.resetFooter();
  }
}