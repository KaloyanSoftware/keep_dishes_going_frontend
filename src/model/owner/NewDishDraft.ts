import type {DishDraft} from "./DishDraft.ts";

export type NewDishDraft = Omit<DishDraft, 'id' | 'dishId'>