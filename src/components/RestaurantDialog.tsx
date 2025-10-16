import {Dialog} from "@mui/material";
import {RestaurantForm} from "./RestaurantForm.tsx";
import {usePostRestaurant} from "../hooks/useRestaurant.ts";
import type {RestaurantFormData} from "../model/RestaurantFormData.ts";

interface RestaurantDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RestaurantDialog({isOpen, onClose}: RestaurantDialogProps) {
    const {addRestaurant, isPending, isError} = usePostRestaurant();

    function handleSubmit(data: RestaurantFormData) {
        addRestaurant(data);
        onClose();
    }

    if (isPending) return <div>Creating restaurant...</div>;
    if (isError) return <div>Error creating restaurant!</div>;

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <RestaurantForm onSubmit={handleSubmit}/>
        </Dialog>
    );
}
