import { ObjectID } from 'typeorm';

export default interface  UserModel {
    id?: ObjectID;
    name: string;
    cpf: number,
    createdAt: Date;
    updatedAt: Date;
}