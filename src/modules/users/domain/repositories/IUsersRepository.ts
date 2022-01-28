import { User } from './../../infra/typeorm/entities/User';
import { ICreateUser } from '../models/ICreateUser';

export interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
}
