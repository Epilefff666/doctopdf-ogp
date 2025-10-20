import { Injectable } from '@nestjs/common';
import * as libre from 'libreoffice-convert';
import * as fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class ConvertidorService {
  async docToPdf(file: Express.Multer.File): Promise<Buffer> {
    const document = fs.readFileSync(file.path);

    const Buffer = await new Promise<Buffer>((resolve, reject) => {
      libre.convert(document, 'pdf', undefined, (err, done) => {
        if (err) reject(err);
        else resolve(done);
      });
    });
    fs.unlink(file.path, (err) => {
      if (err) console.log(err);
    });
    return Buffer;
  }

  bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
