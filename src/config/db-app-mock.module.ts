import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserEntity } from '../database/entity/user.entity';

const mongo = new MongoMemoryServer();

export default (customOpts: any = {}) => TypeOrmModule.forRootAsync({
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
});