import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import UserModel from '../../model/user.model';

@Entity('Client')
export class UserEntity {
  @ObjectIdColumn()
  id: UserModel['id'];

  @Column()
  name: UserModel['name'];

  @Column()
  cpf: UserModel['cpf'];

  @Column()
  createdAt: UserModel['createdAt'];

  @Column()
  updatedAt: UserModel['updatedAt'];

  @BeforeInsert()
  setDefaultValue() {
    const newDate = new Date();
    this.createdAt = newDate;
    this.updatedAt = newDate;
  }

  @BeforeUpdate()
  updateDefaultValues() {
    this.updatedAt = new Date();
  }
}