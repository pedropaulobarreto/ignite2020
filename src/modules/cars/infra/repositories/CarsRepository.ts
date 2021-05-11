import { getRepository, Repository } from "typeorm";

import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

import Car from "../typeorm/entities/Car";

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    return this.repository.save({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }
}
