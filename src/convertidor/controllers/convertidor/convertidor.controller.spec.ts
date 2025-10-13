import { Test, TestingModule } from '@nestjs/testing';
import { ConvertidorController } from './convertidor.controller';

describe('ConvertidorController', () => {
  let controller: ConvertidorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConvertidorController],
    }).compile();

    controller = module.get<ConvertidorController>(ConvertidorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
