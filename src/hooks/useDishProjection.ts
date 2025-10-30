import {useQuery} from "@tanstack/react-query";
import {getDishProjections} from "../services/dataService.ts";

export function useDishProjections(restaurantId: string) {
    const {isLoading, isError, data: dishes} = useQuery({
        queryKey: ["dishes", restaurantId],
        queryFn: () => getDishProjections(restaurantId),
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        staleTime: 3000,
        refetchOnWindowFocus: true,
    });

    return {isLoading, isError, dishes};
}