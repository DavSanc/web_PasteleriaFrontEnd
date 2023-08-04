import { Category } from "./category.interface";

export interface CategoryResponse {
  msg: string;
  ok: boolean;
  path?: string;
  categories: Array<Category>;
}
