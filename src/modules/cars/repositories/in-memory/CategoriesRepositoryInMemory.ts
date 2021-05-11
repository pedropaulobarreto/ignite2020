import { v4 as uuidV4 } from "uuid";

import Category from "@modules/cars/infra/typeorm/entities/Category";

import ICategoriesRepository, {
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

export default class CategoriesRepositoryInMemory
  implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      id: uuidV4(),
      name,
      description,
      created_at: Date.now(),
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}
