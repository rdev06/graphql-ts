import { Entity, Key } from '../../../mongo';
import { ObjectType, Field, ID, Int, Root } from 'type-graphql';
import { ObjectID } from 'mongodb';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { nullable: true })
  @Key(() => ObjectID)
  _id: ObjectID;

  @Field(() => String)
  @Key(() => String)
  firstName: string;

  @Field(() => String)
  @Key(() => String, { enum: ['Dev', 'Prasad'] })
  lastName: string;

  @Field(() => String)
  name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field(() => String)
  @Key(() => String, { unique: true })
  email: string;

  @Field(() => Number)
  @Key(() => Number)
  phone: number;

  @Field(() => Int)
  @Key(() => Number)
  age: number;

  @Key(() => String)
  password: string;
}
