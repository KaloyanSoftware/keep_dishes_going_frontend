import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createRestaurant, getRestaurant} from "../services/dataService.ts";
import {useSecurity} from "../security/useSecurity.ts";
import type {RestaurantFormData} from "../model/RestaurantFormData.ts";

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
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["restaurants"]});
        },
    });

    return {addRestaurant, isPending, isError};
}
