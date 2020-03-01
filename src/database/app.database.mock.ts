import { MongoMemoryServer } from 'mongodb-memory-server';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import entities from './entity/entities';
const mongo = new MongoMemoryServer();

export default (customOpts: any = {}): TypeOrmModuleAsyncOptions => {
  return {
    useFactory: async () => {
      const port = await mongo.getPort();
      const database = await mongo.getDbName();

      return {
        type: 'mongodb',
        host: '127.0.0.1',
        port,
        database,
        entities,
        ...customOpts,
      };
    },
  }
}