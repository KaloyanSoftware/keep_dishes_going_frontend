import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addItemToBasket, deleteItemFromBasket} from "../services/dataService.ts";
import type {Basket} from "../model/customer/Basket.ts";

export function useAddItemToBasket(restaurantId: string) {
    const queryClient = useQueryClient();

    const {mutate: addDishToBasket, isPending, isError} = useMutation({
        mutationFn: (dishId: string) => addItemToBasket(dishId, restaurantId),
        onSuccess: async (basket: Basket) => {
            queryClient.setQueryData(["basket"], basket);
        },
    });

    return {addDishToBasket, isPending, isError};
}

export function useDeleteItemFromBasket(basketId: string) {
    const queryClient = useQueryClient();

    const {mutate: deleteDishFromBasket, isPending, isError} = useMutation({
        mutationFn: async (dishId: string) => {
            const response = await deleteItemFromBasket(basketId, dishId);
            // if backend returns 204, axios gives empty response.data
            return response || null;
        },
        onSuccess: async (basket: Basket | null) => {
            if (!basket) {
                queryClient.setQueryData(["basket"], null);
            } else {
                queryClient.setQueryData(["basket"], basket);
            }
        },
    });

    return {deleteDishFromBasket, isPending, isError};
}