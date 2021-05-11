import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    await this.repository.save(data);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }
}
