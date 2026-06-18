import { Test, TestingModule } from '@nestjs/testing';
import { TareaResolver } from './tarea.resolver';
import { TareaService } from './tarea.service';

describe('TareaResolver', () => {
  let resolver: TareaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TareaResolver, TareaService],
    }).compile();

    resolver = module.get<TareaResolver>(TareaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
