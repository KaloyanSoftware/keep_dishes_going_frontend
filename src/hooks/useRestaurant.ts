import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    closeRestaurant,
    createRestaurant,
    getRestaurant,
    getRestaurantProjections,
    openRestaurant
} from "../services/dataService.ts";
import {useSecurity} from "../security/useSecurity.ts";
import type {RestaurantFormData} from "../model/owner/RestaurantFormData.ts";

export function useRestaurant() {
    const {keycloak, isInitialised} = useSecurity();

    const {
        isLoading,
        isError,
        data: restaurant,
    } = useQuery({
        queryKey: ["restaurant"],
        queryFn: () => getRestaurant(keycloak),
        enabled: isInitialised,
    });

    return {isLoading, isError, restaurant};
}

export function useRestaurants() {
    const {
        isLoading,
        isError,
        data: restaurants,
    } = useQuery({
        queryKey: ["restaurants"],
        queryFn: getRestaurantProjections,
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        staleTime: 3000,
        refetchOnWindowFocus: true,
    });

    return {isLoading, isError, restaurants};
}

export function usePostRestaurant() {
    const queryClient = useQueryClient();
    const {keycloak} = useSecurity();

    const {
        mutate: addRestaurant,
        isPending,
        isError,
    } = useMutation({
        mutationFn: (newRestaurant: RestaurantFormData) =>
            createRestaurant(newRestaurant, keycloak),

        onSuccess: (createdRestaurant) => {
            queryClient.setQueryData(["restaurant"], createdRestaurant);
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["restaurant"]});
        },
    });

    return {addRestaurant, isPending, isError};
}

export function useCloseRestaurant(restaurantId: string) {
    const queryClient = useQueryClient();

    const {
        mutate: doCloseRestaurant,
        isPending,
        isError,
    } = useMutation({
        mutationFn: () =>
            closeRestaurant(restaurantId),

        onSuccess: (closedRestaurant) => {
            queryClient.setQueryData(["restaurant"], closedRestaurant);
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["restaurant"]});
        },
    });

    return {doCloseRestaurant, isPending, isError};
}

export function useOpenRestaurant(restaurantId: string) {
    const queryClient = useQueryClient();

    const {
        mutate: doOpenRestaurant,
        isPending,
        isError,
    } = useMutation({
        mutationFn: () =>
            openRestaurant(restaurantId),

        onSuccess: (openRestaurant) => {
            queryClient.setQueryData(["restaurant"], openRestaurant);
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["restaurant"]});
        },
    });

    return {doOpenRestaurant, isPending, isError};
}
