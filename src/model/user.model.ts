import { ObjectID } from 'typeorm';

export default interface  ClientModel {
    id?: ObjectID;
    name: string;
    cpf: number,
    createdAt: Date;
    updatedAt: Date;
}