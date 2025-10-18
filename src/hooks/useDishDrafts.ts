import type {NewDishDraft} from "../model/NewDishDraft.ts";
import {createDishDraft, getDrafts} from "../services/dataService.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export function useAddDishDraft(restaurantId: string) {
    const queryClient = useQueryClient();
    const {
        mutate,
        isPending,
        isError,
    } = useMutation(
        {
            mutationFn: (newDishDraft: NewDishDraft) => {
                return createDishDraft(newDishDraft)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['restaurant', restaurantId]}),
        })

    return {
        isPending,
        isError,
        addNewDishDraft: mutate,
    }
}

export function useDishDrafts(restaurantId: string) {
    const {
        isLoading,
        isError,
        data: drafts,
    } = useQuery({
        queryKey: ["draft"],
        queryFn: () => getDrafts(restaurantId)
    });

    return {isLoading, isError, drafts};
}