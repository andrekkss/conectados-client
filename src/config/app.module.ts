import { Module } from '@nestjs/common';
import { ClientController } from '../controller/client.controller';
import { ClientRepository } from '../repository/client.repository';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [ClientRepository],
})
export class AppModule {}
