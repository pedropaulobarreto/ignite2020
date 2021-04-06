import Specification from "../../model/Specification";
import { ICreateCategoryDTO } from "../ICategoriesRepository";
import ISpecificationsRepository from "../ISpecificationsRepository";

export default class SpecificationsRepository
  implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  public create({ description, name }: ICreateCategoryDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  public findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}
