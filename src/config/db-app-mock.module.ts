import { TypeOrmModule } from '@nestjs/typeorm';
import databaseMock from '../database/app.database.mock'

export default (customOpts: any = {}) => TypeOrmModule.forRootAsync(databaseMock(customOpts));