import Category from "../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}
