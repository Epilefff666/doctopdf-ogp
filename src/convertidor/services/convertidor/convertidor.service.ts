import { Injectable } from '@nestjs/common';
import * as libre from 'libreoffice-convert';
import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';

const convertAsync = promisify(libre.convert);

@Injectable()
export class ConvertidorService {
  async docToPdf(file: Express.Multer.File): Promise<Buffer> {
    if (!file || file.size === 0) {
      throw new Error('No se envió ningún archivo o está vacío');
    }
    const ext = '.pdf';
    const inputPath = path.resolve(file.path); // archivo subido temporal

    // Leer el archivo DOC/DOCX
    const docBuffer = fs.readFileSync(inputPath);

    // Convertir a PDF
    /*  const pdfBuffer = await convertAsync(docBuffer, ext, 'writer_pdf_Export'); */
    let pdfBuffer: Buffer;
    try {
      pdfBuffer = await convertAsync(docBuffer, ext, undefined);
    } catch (err) {
      console.error('Error converting file with LibreOffice:', err);
      // Opcional: si quieres seguir aunque haya warnings:
      pdfBuffer = Buffer.from([]);
      // O bien, lanzar error controlado:
      throw new Error('Error convirtiendo el archivo a PDF');
    }

    // Guardar PDF (opcional, si quieres mantenerlo en disco)
    //fs.writeFileSync(outputPath, pdfBuffer);

    // Limpiar archivo temporal subido
    fs.unlinkSync(inputPath);

    return pdfBuffer;
  }
}
