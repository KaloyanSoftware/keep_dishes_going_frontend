import {useQuery} from "@tanstack/react-query";
import {getFoodTags} from "../services/dataService.ts";

export function useFoodTags() {
    const {
        isLoading,
        isError,
        data: foodTags,
    } = useQuery({
        queryKey: ["foodTags"],
        queryFn: getFoodTags
    });

    return {isLoading, isError, foodTags: foodTags ?? []};
}
