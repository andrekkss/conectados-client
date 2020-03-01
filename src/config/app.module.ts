import { Module } from '@nestjs/common';

import { UserModule } from './user.module';
import database from '../database/app.database';

@Module({
  imports: [database, UserModule],
})
export class AppModule {}
