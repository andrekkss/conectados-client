import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

export default TypeOrmModule.forRoot({
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
);