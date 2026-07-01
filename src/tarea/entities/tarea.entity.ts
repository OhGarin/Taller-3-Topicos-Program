import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

/**
 * Enumeración para los estados permitidos de una tarea.
 * @enum {string}
 */
export enum EstadoTarea {
  BACKLOG = 'Backlog',
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

registerEnumType(EstadoTarea, {
  name: 'EstadoTarea',
  description: 'Estados permitidos en el ciclo de vida de una tarea.',
});
/**
 * Representa una tarea dentro de un proyecto de desarrollo de software.
 */
@ObjectType()
export class Tarea {
  /** Identificador único de la tarea. */
  @Field(() => ID, { description: 'Identificador único de la tarea.' })
  id: string;

  /** Título corto de la tarea. */
  @Field(() => String, { description: 'Título de la tarea.' })
  titulo: string;

  /** Descripción detallada de la tarea. */
  @Field(() => String, { description: 'Descripción de la tarea.' })
  descripcion: string;

  /** Estado actual dentro del flujo de trabajo. */
  @Field(() => EstadoTarea, { description: 'Estado actual de la tarea.' })
  estado: EstadoTarea;

  /** Lista dinámica de etiquetas asociadas. */
  @Field(() => [String], { description: 'Etiquetas o tags de la tarea.' })
  etiquetas: string[];

  /** Fecha en que se creó la tarea. */
  @Field(() => Date, { description: 'Fecha de creación de la tarea.' })
  fechaCreacion: Date;

  /** Usuario responsable de la tarea. */
  @Field(() => String, { description: 'Usuario asignado a la tarea.' })
  usuarioAsignado: string;

  /** Proyecto al que pertenece la tarea. */
  @Field(() => String, { description: 'Proyecto al que pertenece la tarea.' })
  proyecto: string;
}