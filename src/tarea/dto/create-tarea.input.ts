import { InputType, Field } from '@nestjs/graphql';
import { EstadoTarea } from '../entities/tarea.entity';

/**
 * Datos requeridos para crear una nueva tarea.
 * El identificador y la fecha de creación los genera el servidor,
 * por eso no se incluyen aquí.
 */
@InputType()
export class CreateTareaInput {
  @Field(() => String, { description: 'Título de la tarea.' })
  titulo: string;

  @Field(() => String, { description: 'Descripción de la tarea.' })
  descripcion: string;

  @Field(() => EstadoTarea, {
    nullable: true,
    defaultValue: EstadoTarea.BACKLOG,
    description: 'Estado inicial. Por defecto Backlog.',
  })
  estado?: EstadoTarea;

  @Field(() => [String], {
    nullable: true,
    defaultValue: [],
    description: 'Etiquetas iniciales de la tarea.',
  })
  etiquetas?: string[];

  @Field(() => String, { description: 'Usuario asignado a la tarea.' })
  usuarioAsignado: string;

  @Field(() => String, { description: 'Proyecto al que pertenece la tarea.' })
  proyecto: string;
}
