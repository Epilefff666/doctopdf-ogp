import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConvertidorModule } from './convertidor/convertidor.module';

@Module({
  imports: [ConvertidorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
