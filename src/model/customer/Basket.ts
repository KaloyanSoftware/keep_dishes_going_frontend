import type {BasketLine} from "./BasketLine"

export type Basket = {
    basketId: string,
    restaurantId: string
    basketLines: BasketLine[]
}