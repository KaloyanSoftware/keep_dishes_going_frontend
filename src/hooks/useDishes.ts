import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getDishes, publishADish, unpublishADish} from "../services/dataService.ts";

export function useDishes(restaurantId: string) {
    const {isLoading, isError, data: dishes} = useQuery({
        queryKey: ["dishes", restaurantId],
        queryFn: () => getDishes(restaurantId),
        staleTime: 0,
    });

    return {isLoading, isError, dishes};
}

export function useUnpublishDish(restaurantId: string) {
    const queryClient = useQueryClient();

    const {mutate: unpublishDish, isPending, isError} = useMutation({
        mutationFn: (dishId: string) => unpublishADish(dishId, restaurantId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["dishes", restaurantId]});
        },
    });

    return {unpublishDish, isPending, isError};
}

export function usePublishDish(restaurantId: string) {
    const queryClient = useQueryClient();

    const {mutate: publishDish, isPending, isError} = useMutation({
        mutationFn: (dishId: string) => publishADish(dishId, restaurantId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["dishes", restaurantId]});
        },
    });
    return {publishDish, isPending, isError};
}
