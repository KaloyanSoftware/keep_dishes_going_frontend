import {useAddDishDraft} from "../../../hooks/useDishDrafts.ts";
import type {DishDraftFormData} from "../../../model/owner/DishDraftFormData.ts";
import {Dialog} from "@mui/material";
import {DishDraftForm} from "./DishDraftForm.tsx";

interface DishDraftDialogProps {
    restaurantId: string,
    isOpen: boolean,
    onClose: () => void
}

export function DishDraftDialog({restaurantId, isOpen, onClose}: DishDraftDialogProps) {
    const {isPending, isError, addNewDishDraft} = useAddDishDraft(restaurantId)

    function handleSumbit(draft: DishDraftFormData) {
        addNewDishDraft({
            ...draft,
            restaurantId: restaurantId
        })
        onClose()
    }

    if (isPending) {
        return <div>Creating draft...</div>
    }
    if (isError) {
        return <div>Error creating dish draft!</div>
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DishDraftForm onSubmit={handleSumbit}/>
        </Dialog>
    )
}