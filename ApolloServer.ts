import { ApolloServer } from 'apollo-server-express';
import { buildSchema, Query, Resolver } from 'type-graphql';
import UserResolver from './modules/User/UserResolver';
import AuthGuard from './others/AuthGuard';

@Resolver()
class RootResolver {
  @Query(() => String)
  _() {
    return 'Root';
  }
}

export const getApolloServer = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [RootResolver, UserResolver],
      authChecker: AuthGuard
    }),
    context: ({ req }) => ({ req })
  });
};
