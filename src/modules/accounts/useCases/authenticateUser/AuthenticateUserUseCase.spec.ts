import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import CreateUserUseCase from "../createUser.ts/CreateUserUseCase";
import AuthenticateUserUserCase from "./AuthenticateUserUseCase";

let authenticateUserUserCase: AuthenticateUserUserCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUserCase = new AuthenticateUserUserCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@test.com",
      password: "password",
      name: "User Test",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUserCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non-existing user", async () => {
    await expect(async () => {
      await authenticateUserUserCase.execute({
        email: "fake@email.com",
        password: "fakepassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with incorrect password", async () => {
    await expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "00123",
        email: "user@test.com",
        password: "password",
        name: "User Test",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUserCase.execute({
        email: user.email,
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
