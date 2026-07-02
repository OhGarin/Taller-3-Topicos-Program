import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TareaService } from './tarea.service';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaInput } from './dto/create-tarea.input';
import { UpdateTareaInput } from './dto/update-tarea.input';

/**
 * Resolver de GraphQL para las operaciones relacionadas con las tareas.
 * Delega toda la lógica de negocio en el TareaService.
 */
@Resolver(() => Tarea)
export class TareaResolver {
  constructor(private readonly tareaService: TareaService) {}

  /**
   * Crea una nueva tarea.
   * @param {CreateTareaInput} createTareaInput - Datos de la tarea a crear.
   * @returns {Tarea} La tarea creada.
   */
  @Mutation(() => Tarea, { description: 'Crea una nueva tarea.' })
  crearTarea(
    @Args('createTareaInput') createTareaInput: CreateTareaInput,
  ): Tarea {
    return this.tareaService.create(createTareaInput);
  }

  /**
   * Devuelve el listado completo de tareas.
   * @returns {Tarea[]} Todas las tareas registradas.
   */
  @Query(() => [Tarea], {
    name: 'tareas',
    description: 'Lista todas las tareas.',
  })
  findAll(): Tarea[] {
    return this.tareaService.findAll();
  }

  /**
   * Devuelve una tarea por su identificador.
   * @param {string} id - Identificador de la tarea.
   * @returns {Tarea} La tarea encontrada.
   */
  @Query(() => Tarea, {
    name: 'tarea',
    description: 'Busca una tarea por su id.',
  })
  findOne(@Args('id', { type: () => ID }) id: string): Tarea {
    return this.tareaService.findOne(id);
  }

  /**
   * Actualiza una tarea existente.
   * @param {UpdateTareaInput} updateTareaInput - Campos a modificar (incluye el id).
   * @returns {Tarea} La tarea actualizada.
   */
  @Mutation(() => Tarea, { description: 'Actualiza una tarea existente.' })
  actualizarTarea(
    @Args('updateTareaInput') updateTareaInput: UpdateTareaInput,
  ): Tarea {
    return this.tareaService.update(updateTareaInput.id, updateTareaInput);
  }

  /**
   * Elimina una tarea por su identificador.
   * @param {string} id - Identificador de la tarea a eliminar.
   * @returns {Tarea} La tarea eliminada.
   */
  @Mutation(() => Tarea, { description: 'Elimina una tarea por su id.' })
  eliminarTarea(@Args('id', { type: () => ID }) id: string): Tarea {
    return this.tareaService.remove(id);
  }
}
