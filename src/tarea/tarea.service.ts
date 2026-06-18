import { Injectable } from '@nestjs/common';
import { CreateTareaInput } from './dto/create-tarea.input';
import { UpdateTareaInput } from './dto/update-tarea.input';

@Injectable()
export class TareaService {
  create(createTareaInput: CreateTareaInput) {
    return 'This action adds a new tarea';
  }

  findAll() {
    return `This action returns all tarea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tarea`;
  }

  update(id: number, updateTareaInput: UpdateTareaInput) {
    return `This action updates a #${id} tarea`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarea`;
  }
}
