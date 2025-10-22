import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createRestaurant, getRestaurant, getRestaurantProjections} from "../services/dataService.ts";
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
        queryFn: () => getRestaurantProjections()
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
