import type {Address} from "../owner/Address.ts";

export type RestaurantProjection = {
    restaurantId: string;
    location: Address;
    email: string;
    pictureURL: string;
    defaultPrepTime: number;
    cuisineType: string;
}