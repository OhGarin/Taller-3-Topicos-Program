import { CreateTareaInput } from './create-tarea.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTareaInput extends PartialType(CreateTareaInput) {
  @Field(() => Int)
  id: number;
}
