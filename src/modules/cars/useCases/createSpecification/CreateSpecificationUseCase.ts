import ISpecificationsRepository from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  public execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}
