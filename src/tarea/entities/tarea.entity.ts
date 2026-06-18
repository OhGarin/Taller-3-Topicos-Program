import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tarea {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
