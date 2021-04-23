import { Router } from "express";

import CreateUserController from "../modules/accounts/userCases/createUser.ts/CreateUserController";

const usersRoutes = Router();
const createUsersController = new CreateUserController();

usersRoutes.post("/", createUsersController.handle);

export default usersRoutes;
