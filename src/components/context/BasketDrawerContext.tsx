import {createContext, type PropsWithChildren, useContext, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import type {Basket} from "../../model/customer/Basket";

interface BasketDrawerContextValue {
    isOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    basketCount: number;
}

const BasketDrawerContext = createContext<BasketDrawerContextValue | null>(null);

export function BasketDrawerContextProvider({children}: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const basket: Basket | undefined = queryClient.getQueryData(["basket"]);
    const basketCount = basket?.basketLines?.length ?? 0;

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    return (
        <BasketDrawerContext.Provider value={{isOpen, openDrawer, closeDrawer, basketCount}}>
            {children}
        </BasketDrawerContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBasketDrawer() {
    const ctx = useContext(BasketDrawerContext);
    if (!ctx) throw new Error("useBasketDrawer must be used within BasketDrawerProvider");
    return ctx;
}
