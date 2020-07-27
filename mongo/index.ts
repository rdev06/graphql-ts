import { mongoConfig } from '../config';
import { MongoClient } from 'mongodb';
import MongoQuery from './query';

const { mongoOption, mongoUri, defaultDbName } = mongoConfig;

class Mongoose {
  client: MongoClient;
  db: any;
  async connect(str: string = mongoUri, dbName: string = defaultDbName) {
    try {
      this.client = await MongoClient.connect(str, mongoOption);
      this.db = this.client?.db(dbName);
      console.log('mongo connected');
    } catch (error) {
      throw error;
    }
  }
  useDb(dbName: string) {
    return this.client?.db(dbName);
  }
  collection(collectionName: string) {
    return this.db?.collection(collectionName);
  }
  model(collectionName: string) {
    return new MongoQuery(collectionName);
  }
}

export const Entity = () => {
  return (className: Function) => {};
};

type KeyOptions = {
  enum?: String[];
  default?: any;
  required?: Boolean;
  unique?: Boolean;
  msg?: String;
};

// requirement is to make an ORM for collection in mongodb

export const Schema: any = {};

export const Key = (fn: () => any, options: KeyOptions = {}) => {
  return ({ constructor }: { constructor: any }, key: string): void => {
    const { name } = constructor;
    !Schema[name] ? (Schema[name] = {}) : '';
    Schema[name][key] = { fn, options };
  };
};

export const mongo = new Mongoose();
