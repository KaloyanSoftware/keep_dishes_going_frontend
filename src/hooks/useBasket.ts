import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addItemToBasket} from "../services/dataService.ts";
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