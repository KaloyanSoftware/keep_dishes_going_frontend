import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {changeOrderStatus, getAllActiveOrdersForRestaurant} from "../services/dataService.ts";
import type {OrderProjection} from "../model/owner/OrderProjection.ts";

export function useOrderProjections(restaurantId: string) {
    const {isLoading, isError, data: activeOrders} = useQuery({
        queryKey: ["activeOrders", restaurantId],
        queryFn: () => getAllActiveOrdersForRestaurant(restaurantId),
        staleTime: 0,
    });

    return {isLoading, isError, activeOrders};
}

export function useChangeOrderStatus(restaurantId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({orderId, status}: { orderId: string; status: string }) =>
            changeOrderStatus(orderId, status),

        onMutate: async ({orderId, status}) => {
            // Cancel any outgoing refetches (to avoid overwriting optimistic update)
            await queryClient.cancelQueries({queryKey: ["activeOrders", restaurantId]});

            // Snapshot previous state
            const previousOrders = queryClient.getQueryData<OrderProjection[]>([
                "activeOrders",
                restaurantId,
            ]);

            // Optimistically update the cache
            if (previousOrders) {
                queryClient.setQueryData<OrderProjection[]>(["activeOrders", restaurantId], (old) =>
                    old
                        ? old.map((order) =>
                            order.orderId === orderId
                                ? {...order, status} // locally update status
                                : order
                        )
                        : []
                );
            }
            return {previousOrders};
        },

        onError: (_error, _variables, context) => {
            // Roll back to previous cache if something failed
            if (context?.previousOrders) {
                queryClient.setQueryData(["activeOrders", restaurantId], context.previousOrders);
            }
        },

        onSettled: () => {
            // Always refetch to ensure backend state matches
            queryClient.invalidateQueries({queryKey: ["activeOrders", restaurantId]});
        },
    });
}
