import { Controller, Get, Put, Post, Body } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';

@Controller('configuracion')
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  @Get('header')
  getHeader() {
    return this.configuracionService.getHeader();
  }

  @Put('header')
  updateHeader(@Body() body: Record<string, unknown>) {
    return this.configuracionService.updateHeader(body);
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
  updateFooter(@Body() body: Record<string, unknown>) {
    return this.configuracionService.updateFooter(body);
  }

  @Post('footer/reset')
  resetFooter() {
    return this.configuracionService.resetFooter();
  }

  @Get('nosotros')
  getNosotros() {
    return this.configuracionService.getNosotros();
  }

  @Put('nosotros')
  updateNosotros(@Body() body: Record<string, unknown>) {
    return this.configuracionService.updateNosotros(body);
  }

  @Post('nosotros/reset')
  resetNosotros() {
    return this.configuracionService.resetNosotros();
  }
}

