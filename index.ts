require('reflect-metadata');
import Express from 'express';
import { mongo } from './mongo';
import { getApolloServer } from './ApolloServer';

const main = async () => {
  await mongo.connect(); // Mongodb connection
  const app = Express();
  const apolloServer = await getApolloServer();
  apolloServer.applyMiddleware({ app });
  app.listen(3000, () => console.log('server is up at port 3000'));
};

main().catch(err => console.error(err));
