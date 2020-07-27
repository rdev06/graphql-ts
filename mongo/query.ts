import { mongo, Schema } from './index';
import { feildData } from './feildData';
export default class MongoQuery {
  collectionName: string;
  collection: any;
  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.collection = mongo.collection(collectionName);
  }
  async create(data: any) {
    const thisCollectionSchema = Schema[this.collectionName];
    Object.keys(thisCollectionSchema).forEach(async key => {
      thisCollectionSchema[key].options.unique
        ? await this.collection.createIndex(key, { unique: true })
        : '';
    });
    const parsedData = await feildData(this.collectionName, data).catch(err => {
      throw new Error(err);
    });
    const {
      ops: [result]
    } = await this.collection.insertOne(parsedData);
    return result;
  }
}
