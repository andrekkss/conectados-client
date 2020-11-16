import TYPES from './type';

import {Container} from 'inversify';
import { ClientRepositoryImpl } from '../repository/ClientRepositoryImpl';

const container = new Container();

container.bind<ClientRepositoryImpl>(TYPES.ClientRepositoryImpl ).to(ClientRepositoryImpl).inSingletonScope();
export default container;