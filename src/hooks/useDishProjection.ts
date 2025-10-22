import {useQuery} from "@tanstack/react-query";
import {getDishProjections} from "../services/dataService.ts";

export function useDishProjections(restaurantId: string) {
    const {isLoading, isError, data: dishes} = useQuery({
        queryKey: ["dishes", restaurantId],
        queryFn: () => getDishProjections(restaurantId),
        staleTime: 0,
    });

    return {isLoading, isError, dishes};
}