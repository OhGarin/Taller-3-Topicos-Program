import { Module } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { TareaResolver } from './tarea.resolver';

@Module({
  providers: [TareaResolver, TareaService],
})
export class TareaModule {}
