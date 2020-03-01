import { UserEntity } from './entity/user.entity';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

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
        entities: [
          UserEntity
        ],
        ...customOpts,
      };
    },
  }
}