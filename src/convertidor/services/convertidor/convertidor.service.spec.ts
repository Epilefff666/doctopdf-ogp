import { Test, TestingModule } from '@nestjs/testing';
import { ConvertidorService } from './convertidor.service';

describe('ConvertidorService', () => {
  let service: ConvertidorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvertidorService],
    }).compile();

    service = module.get<ConvertidorService>(ConvertidorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
