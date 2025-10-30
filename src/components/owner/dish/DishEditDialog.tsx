import {Dialog} from "@mui/material";
import {DishDraftForm} from "../draft/DishDraftForm.tsx";
import {useAddDishDraft} from "../../../hooks/useDishDrafts.ts";
import type {Dish} from "../../../model/owner/Dish.ts";
import type {DishDraftFormData} from "../../../model/owner/DishDraftFormData.ts";

interface DishEditDialogProps {
    restaurantId: string;
    dish: Dish;
    isOpen: boolean;
    onClose: () => void;
}

export function DishEditDialog({
                                   restaurantId,
                                   dish,
                                   isOpen,
                                   onClose,
                               }: DishEditDialogProps) {
    const {addNewDishDraft, isPending, isError} = useAddDishDraft(restaurantId);

    function handleSubmit(formData: DishDraftFormData) {
        addNewDishDraft({
            ...formData,
            restaurantId,
            dishId: dish.id,
        });
        onClose();
    }

    if (isPending) return <div>Creating edit draft...</div>;
    if (isError) return <div>Error creating edit draft!</div>;

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DishDraftForm
                onSubmit={handleSubmit}
                disabled={isPending}
            />
        </Dialog>
    );
}
