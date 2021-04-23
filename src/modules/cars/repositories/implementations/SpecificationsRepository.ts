import { getRepository, Repository } from "typeorm";

import Specification from "../../entities/Specification";
import { ICreateCategoryDTO } from "../ICategoriesRepository";
import ISpecificationsRepository from "../ISpecificationsRepository";

export default class SpecificationsRepository
  implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  public async create({
    description,
    name,
  }: ICreateCategoryDTO): Promise<void> {
    const specification = this.repository.create({ description, name });

    await this.repository.save(specification);
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name });

    return specification;
  }
}
