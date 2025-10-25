import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createOrderFromBasket} from "../services/dataService";
import type {CustomerInfoFormData} from "../model/customer/CustomerInfoFormData";
import type {Order} from "../model/customer/Order";

export function useCreateOrder(basketId: string) {
    const queryClient = useQueryClient();

    const {
        mutate: createOrder,
        isPending,
        isError,
        isSuccess,
        data: order,
    } = useMutation({
        mutationFn: (info: CustomerInfoFormData) =>
            createOrderFromBasket(basketId, info),
        onSuccess: (order: Order) => {
            queryClient.setQueryData(["order"], order);
            queryClient.removeQueries({queryKey: ["basket"]});
        },
    });

    return {createOrder, isPending, isError, isSuccess, order};
}
