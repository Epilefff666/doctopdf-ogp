import {
  BadRequestException,
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

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExt = path.extname(file.originalname); // .docx
          const fileName = `${Date.now()}${fileExt}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async convertir(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<StreamableFile> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const pdf = await this.convertidorService.docToPdf(file);

    return pdf;
  }
}
