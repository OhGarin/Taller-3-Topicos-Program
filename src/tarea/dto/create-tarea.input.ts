import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTareaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
