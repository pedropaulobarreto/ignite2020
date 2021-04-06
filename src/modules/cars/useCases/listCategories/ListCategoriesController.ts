import { Request, Response } from "express";

import ListCategoriesUseCase from "./ListCategoriesUseCase";

export default class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoriesUseCase) {}

  public handle(rquest: Request, response: Response): Response {
    const all = this.listCategoryUseCase.execute();

    return response.json(all);
  }
}
