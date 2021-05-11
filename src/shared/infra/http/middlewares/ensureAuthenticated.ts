import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import UsersRepository from "@modules/accounts/infra/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "1f13e7ff79dc72fcde05cc055dfa919f"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
