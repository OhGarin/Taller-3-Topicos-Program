import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TareaService } from './tarea.service';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaInput } from './dto/create-tarea.input';
import { UpdateTareaInput } from './dto/update-tarea.input';

@Resolver(() => Tarea)
export class TareaResolver {
  constructor(private readonly tareaService: TareaService) {}

  @Mutation(() => Tarea)
  createTarea(@Args('createTareaInput') createTareaInput: CreateTareaInput) {
    return this.tareaService.create(createTareaInput);
  }

  @Query(() => [Tarea], { name: 'tarea' })
  findAll() {
    return this.tareaService.findAll();
  }

  @Query(() => Tarea, { name: 'tarea' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tareaService.findOne(id);
  }

  @Mutation(() => Tarea)
  updateTarea(@Args('updateTareaInput') updateTareaInput: UpdateTareaInput) {
    return this.tareaService.update(updateTareaInput.id, updateTareaInput);
  }

  @Mutation(() => Tarea)
  removeTarea(@Args('id', { type: () => Int }) id: number) {
    return this.tareaService.remove(id);
  }
}
