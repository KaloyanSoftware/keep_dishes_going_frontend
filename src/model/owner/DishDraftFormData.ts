import type {DishDraft} from "./DishDraft.ts";

export type DishDraftFormData = Omit<DishDraft, 'id' | 'restaurantId' | 'dishId'>