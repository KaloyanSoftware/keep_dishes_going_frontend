import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getDishes, unpublishADish} from "../services/dataService.ts";

export function useDish(restaurantId: string) {
    const {
        isLoading,
        isError,
        data: dishes,
    } = useQuery({
        queryKey: ["dish"],
        queryFn: () => getDishes(restaurantId)
    });

    return {isLoading, isError, dishes};
}

export function useUnpublishDish(restaurantId: string) {
    const queryClient = useQueryClient();

    const {mutate: unpublishDish, isPending, isError} = useMutation({
        mutationFn: (dishId: string) =>
            unpublishADish(dishId, restaurantId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["dish", restaurantId]});
        },
    });

    return {unpublishDish, isPending, isError};
}