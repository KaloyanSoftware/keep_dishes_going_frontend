import {useQuery} from "@tanstack/react-query";
import {getDishTypes} from "../services/dataService.ts";

export function useDishTypes() {
    const {
        isLoading,
        isError,
        data: dishTypes,
    } = useQuery({
        queryKey: ["dishTypes"],
        queryFn: getDishTypes
    });

    return {isLoading, isError, dishTypes: dishTypes ?? []};
}
