import { Resolver, Mutation, Arg, Query, Ctx, Authorized } from 'type-graphql';
import { User } from './Entity/User';
import { RegisterUser } from './DTO/input';
import { mongo } from '../../mongo';
import { ctx } from '../../others/types';
@Resolver()
export default class UserResolver {
  user: any;
  constructor() {
    this.user = mongo.model(User.name);
  }
  @Mutation(() => User)
  async register(@Arg('input') body: RegisterUser) {
    return this.user.create(body);
  }

  @Query(() => [User])
  @Authorized(['ADMIN', 'OWNER'])
  async listUsers(@Ctx() { req }: ctx) {
    console.log(req.headers.token);
    return await this.user.collection.find().toArray();
  }
}
