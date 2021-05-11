import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import CreateCarUseCase from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("should be able to create car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC555",
      fine_amount: 30,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create car with existing license plate", async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC-555",
        fine_amount: 30,
        brand: "Brand",
        category_id: "Category",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC-555",
        fine_amount: 30,
        brand: "Brand",
        category_id: "Category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create car with availability true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABCD-555",
      fine_amount: 30,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car.available).toBe(true);
  });
});
