import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Level1 {
    @Field(() => ID)
    level1Field: string;
    level2: Promise<Level2>;
}

@ObjectType()
export class Level2 {
    @Field(() => ID)
    level2Field: string;
}