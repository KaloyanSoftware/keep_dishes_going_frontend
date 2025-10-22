import axios from "axios";
import type {Restaurant} from "../model/owner/Restaurant.ts";
import type Keycloak from "keycloak-js";
import type {RestaurantFormData} from "../model/owner/RestaurantFormData.ts";
import type {NewDishDraft} from "../model/owner/NewDishDraft.ts";
import type {DishDraft} from "../model/owner/DishDraft.ts";
import type {Dish} from "../model/owner/Dish.ts";
import type {RestaurantProjection} from "../model/customer/RestaurantProjection.ts";
import type {DishProjection} from "../model/customer/DishProjection.ts";

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

export async function createDishDraft(dishDraft: NewDishDraft) {
    const {data: newDishDraft} = await axios.post<DishDraft>(`/drafts`, dishDraft);

    return newDishDraft

}

export async function getFoodTags(): Promise<string[]> {
    const response = await axios.get("/enums/food-tags");
    return response.data;
}

export async function getDishTypes(): Promise<string[]> {
    const response = await axios.get("/enums/dish-types");
    return response.data;
}

export async function getDishes(restaurantId: string): Promise<Dish[]> {

    try {
        const response = await axios.get(`/restaurant/${restaurantId}/menu/dishes`);
        return response.data;
    } catch (err) {
        console.error("Error fetching dishes:", err);
        throw err;
    }
}


export async function getDrafts(restaurantId: string): Promise<DishDraft[]> {

    try {
        const response = await axios.get(`/owner/restaurant/${restaurantId}/drafts`);
        return response.data;
    } catch (err) {
        console.error("Error fetching drafts:", err);
        throw err;
    }
}

export async function publishDishDraft(draftId: string, restaurantId: string) {
    const response = await axios.post(`/restaurant/${restaurantId}/menu/dishes`, {
        draftId: draftId
    });
    return response.data;
}

export async function unpublishADish(dishId: string, restaurantId: string) {
    const response = await axios.patch(`/restaurant/${restaurantId}/menu/dishes/unpublished`, {
        id: dishId
    });
    return response.data;
}

export async function publishADish(dishId: string, restaurantId: string) {
    const response = await axios.patch(`/restaurant/${restaurantId}/menu/dishes/published`, {
        id: dishId
    });
    return response.data;
}

export async function getRestaurantProjections(): Promise<RestaurantProjection[]> {

    try {
        const response = await axios.get(`/customer/restaurants`);
        return response.data;
    } catch (err) {
        console.error("Error fetching restaurant projections:", err);
        throw err;
    }
}

export async function getDishProjections(restaurantId: string): Promise<DishProjection[]> {

    try {
        const response = await axios.get(`/customer/restaurants/${restaurantId}/menu/dishes`);
        return response.data;
    } catch (err) {
        console.error("Error fetching dish projections:", err);
        throw err;
    }
}

