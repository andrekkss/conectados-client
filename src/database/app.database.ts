import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entity/entities';

export default TypeOrmModule.forRoot({
    type: 'mongodb',
    host: '0.0.0.0',
    port: 27017,
    database: 'conectados-db',
    entities,
    keepConnectionAlive: true,
    useUnifiedTopology: true
  }
);