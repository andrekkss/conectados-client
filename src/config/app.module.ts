import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entity/user.entity';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '0.0.0.0',
      port: 27017,
      database: 'conectados-db',
      entities: [
        UserEntity
      ],
      keepConnectionAlive: true,
      useUnifiedTopology: true
    }
  ), UserModule],
})
export class AppModule {}
