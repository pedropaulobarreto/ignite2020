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
    available = true,
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
      available,
      created_at: Date.now(),
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category && car.category_id === category) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });
  }
}
