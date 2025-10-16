import axios from "axios";
import type {Restaurant} from "../model/Restaurant.ts";
import type Keycloak from "keycloak-js";
import type {RestaurantFormData} from "../model/RestaurantFormData.ts";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export async function getRestaurant(keycloak: Keycloak): Promise<Restaurant> {
    const ownerId = keycloak.tokenParsed?.sub;

    if (!ownerId) {
        throw new Error("User is not authenticated or token is missing subject ID");
    }

    try {
        const response = await axios.get(`/owners/${ownerId}/restaurant`);
        return response.data;
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        throw err;
    }
}

export async function createRestaurant(newRestaurant: RestaurantFormData, keycloak: Keycloak) {
    const ownerId = keycloak.tokenParsed?.sub;
    if (!ownerId) throw new Error("User not authenticated");

    const address = {
        street: newRestaurant.street,
        number: Number(newRestaurant.number),
        postalCode: newRestaurant.postalCode,
        city: newRestaurant.city,
        country: newRestaurant.country,
    };


    const openingHours = {weeklySchedule: newRestaurant.openingHours};

    const requestBody = {
        ownerId,
        address,
        email: newRestaurant.email,
        pictureURL: newRestaurant.pictureURL,
        defaultPrepTime: newRestaurant.defaultPrepTime,
        cuisineType: newRestaurant.cuisineType,
        openingHours,
    };

    const response = await axios.post(`/restaurants`, requestBody);
    return response.data;
}

