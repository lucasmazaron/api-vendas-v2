import { getRepository, Repository } from 'typeorm';
import { ICreateUser } from 'modules/users/domain/models/ICreateUser';
import { IUsersRepository } from 'modules/users/domain/repositories/IUsersRepository';
import { IUser } from 'modules/users/domain/models/IUser';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    avatar,
  }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      avatar,
    });

    await this.ormRepository.save(user);

    return user;
  }

  // public async save(User: User): Promise<User> {
  //   await this.ormRepository.save(User);

  //   return User;
  // }

  // public async findByName(name: string): Promise<User | undefined> {
  //   const User = await this.ormRepository.findOne({
  //     where: {
  //       name,
  //     },
  //   });

  //   return User;
  // }

  // public async findById(id: string): Promise<User | undefined> {
  //   const User = await this.ormRepository.findOne(id);

  //   return User;
  // }

  // public async remove(User: User): Promise<void> {
  //   await this.ormRepository.remove(User);
  // }
}
