import { Request, Response, NextFunction } from "express";

import UsersRepository from "@modules/accounts/infra/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const userRepository = new UsersRepository();
  const user = await userRepository.findById(id);

  if (!user.is_admin) {
    throw new AppError("User is not an admin");
  }

  return next();
}
