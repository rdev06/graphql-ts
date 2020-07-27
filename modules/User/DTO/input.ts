import { InputType, Field, ID, Int } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { ObjectID } from 'mongodb';

@InputType()
export class RegisterUser {
  @Field(() => ID, { nullable: true })
  _id: ObjectID;

  @Field(() => String)
  @Length(1, 255)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => Number)
  phone: number;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  password: string;
}
