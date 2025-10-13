import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConvertidorController } from './controllers/convertidor/convertidor.controller';
import { ConvertidorService } from './services/convertidor/convertidor.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ConvertidorController],
  providers: [ConvertidorService],
})
export class ConvertidorModule {}
