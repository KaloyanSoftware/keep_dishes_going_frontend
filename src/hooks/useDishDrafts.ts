import type {NewDishDraft} from "../model/owner/NewDishDraft.ts";
import {createDishDraft, deleteDraft, getDrafts, publishDishDraft} from "../services/dataService.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export function useDishDrafts(restaurantId: string) {
    const {
        isLoading,
        isError,
        data: drafts,
    } = useQuery({
        queryKey: ["drafts", restaurantId],
        queryFn: () => getDrafts(restaurantId),
        staleTime: 0,
    });

    return {isLoading, isError, drafts};
}

export function useAddDishDraft(restaurantId: string) {
    const queryClient = useQueryClient();

    const {mutate: addNewDishDraft, isPending, isError} = useMutation({
        mutationFn: (newDishDraft: NewDishDraft) => createDishDraft(newDishDraft),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["drafts", restaurantId]});
        },
    });

    return {addNewDishDraft, isPending, isError};
}

export function usePublishDishDraft(restaurantId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (draftId: string) => publishDishDraft(draftId, restaurantId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["drafts", restaurantId]});
        },
    });

    return {
        publishDraft: mutation.mutate,
        publishDraftAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
    };
}

export function useDeleteDishDraft(restaurantId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (draftId: string) => deleteDraft(draftId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["drafts", restaurantId]});
        },
    });

    return {
        deleteDishDraft: mutation.mutate,
        deleteDishDraftAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
}
