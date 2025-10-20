import type {Address} from "./Address.ts";
import type {OpeningHours} from "./OpeningHours.ts";

export type Restaurant = {
    id: string;
    ownerId: string;
    address: Address;
    email: string;
    pictureURL: string;
    defaultPrepTime: number;
    cuisineType: CuisineType;
    openingHours: OpeningHours;
};

export type CuisineType =
    | "ITALIAN"
    | "JAPANESE"
    | "MEXICAN"
    | "INDIAN"
    | "GREEK"
