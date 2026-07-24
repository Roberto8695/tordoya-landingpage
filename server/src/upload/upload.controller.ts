import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Response } from 'express';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const ESPECIALIDADES_DIR = join(process.cwd(), 'uploads', 'especialidades');
const BANNERS_DIR = join(process.cwd(), 'uploads', 'banners');

@Controller('upload')
export class UploadController {
  @Post('banner')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          if (!existsSync(BANNERS_DIR)) {
            mkdirSync(BANNERS_DIR, { recursive: true });
          }
          cb(null, BANNERS_DIR);
        },
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname).toLowerCase();
          const allowed = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
          if (!allowed.includes(ext)) {
            cb(
              new BadRequestException(
                `Formato no permitido: ${ext}. Usa: ${allowed.join(', ')}`,
              ),
              '',
            );
            return;
          }
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  uploadBanner(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se envió ningún archivo');
    }

    const url = `/uploads/banners/${file.filename}`;

    return {
      url,
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
    };
  }

  @Get('banner/:filename')
  getBannerFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(BANNERS_DIR, filename);
    if (!existsSync(filePath)) {
      throw new BadRequestException('Archivo no encontrado');
    }
    return res.sendFile(filePath);
  }

  @Post('especialidad')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          if (!existsSync(ESPECIALIDADES_DIR)) {
            mkdirSync(ESPECIALIDADES_DIR, { recursive: true });
          }
          cb(null, ESPECIALIDADES_DIR);
        },
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname).toLowerCase();
          const allowed = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
          if (!allowed.includes(ext)) {
            cb(
              new BadRequestException(
                `Formato no permitido: ${ext}. Usa: ${allowed.join(', ')}`,
              ),
              '',
            );
            return;
          }
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se envió ningún archivo');
    }

    const url = `/uploads/especialidades/${file.filename}`;

    return {
      url,
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
    };
  }

  @Get('especialidad/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(ESPECIALIDADES_DIR, filename);
    if (!existsSync(filePath)) {
      throw new BadRequestException('Archivo no encontrado');
    }
    return res.sendFile(filePath);
  }
}