import {RecipeItem} from "./recipeItem";

export enum Difficulty {
  easy = 1,
  medium = 2,
  hard = 3
}

export class Recipe {
  id: number;

  constructor(public name: string,
              public portions: number,
              public time: number,
              public rating: number,
              public difficulty: Difficulty,
              public description: string,
              public photo: string,
              public items: RecipeItem[],
              public tags: string[]) {
  }
}
