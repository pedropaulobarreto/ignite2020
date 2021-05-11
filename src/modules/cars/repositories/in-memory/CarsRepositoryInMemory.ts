import { v4 as uuidV4 } from "uuid";

import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";

import ICarsRepository from "../ICarsRepository";

export default class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id: uuidV4(),
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      available: true,
      created_at: Date.now(),
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}
