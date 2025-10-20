import {
  BadRequestException,
  Body,
  Controller,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { ConvertidorService } from 'src/convertidor/services/convertidor/convertidor.service';

@Controller('convertidor')
export class ConvertidorController {
  constructor(private readonly convertidorService: ConvertidorService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const fileExt = path.extname(file.originalname); // .docx
          const fileName = `${Date.now()}${fileExt}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (_req, file, err) => {
        if (path.extname(file.originalname).toLocaleLowerCase() !== '.docx') {
          return err(
            new BadRequestException('El archivo ingresado debe ser .docx'),
            false,
          );
        }
        err(null, true);
      },
    }),
  )
  async docToPdfFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<StreamableFile> {
    if (!file) {
      throw new BadRequestException('Archivo no enviado');
    }
    try {
      const pdf = await this.convertidorService.docToPdf(file);
      return new StreamableFile(pdf, {
        type: 'application/pdf',
        disposition: `attachment; filename="${file.originalname}.pdf"`,
      });
    } catch (error) {
      throw new BadRequestException(`Error al convertir el archivo - ${error}`);
    }
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const fileExt = path.extname(file.originalname); // .docx
          const fileName = `${Date.now()}${fileExt}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (_req, file, err) => {
        if (path.extname(file.originalname).toLocaleLowerCase() !== '.docx') {
          return err(
            new BadRequestException('El archivo ingresado debe ser .docx'),
            false,
          );
        }
        err(null, true);
      },
    }),
  )
  async docToPdf(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Express.Multer.File> {
    if (!file) {
      throw new BadRequestException('Archivo no enviado');
    }
    try {
      const buffer = await this.convertidorService.docToPdf(file);
      const stream = this.convertidorService.bufferToStream(buffer);
      const filename = `${Date.now()}.pdf`;
      return {
        fieldname: 'file',
        originalname: 'new_doc.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        size: buffer.length,
        destination: '',
        filename,
        path: '',
        buffer,
        stream,
      };
    } catch (error) {
      throw new BadRequestException(`Error al convertir el archivo - ${error}`);
    }
  }
}
