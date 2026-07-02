import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateTareaInput } from './create-tarea.input';

/**
 * Datos para actualizar una tarea existente.
 * Hereda los campos de CreateTareaInput como opcionales (PartialType),
 * de modo que solo se envían los que se desean cambiar, y exige el id.
 */
@InputType()
export class UpdateTareaInput extends PartialType(CreateTareaInput) {
  @Field(() => ID, { description: 'Identificador de la tarea a actualizar.' })
  id: string;
}
