import {createContext, type PropsWithChildren, useContext, useState,} from "react";
import {QueryCache, useQueryClient} from "@tanstack/react-query";
import type {Basket} from "../../model/customer/Basket";

interface BasketDrawerContextValue {
    isOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    basketCount: number;
    resetBasket: () => void;
}

const BasketDrawerContext = createContext<BasketDrawerContextValue | null>(null);

export function BasketDrawerContextProvider({children}: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);
    const [basketCount, setBasketCount] = useState(0);
    const queryClient = useQueryClient();

    //subscribe directly to the basket quert
    const queryCache: QueryCache = queryClient.getQueryCache();

    queryCache.subscribe((event) => {
        if (event?.query?.queryKey?.[0] === "basket") {
            const basket: Basket | undefined = queryClient.getQueryData(["basket"]);
            setBasketCount(basket?.basketLines?.length ?? 0);
        }
    });

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    const resetBasket = () => {
        queryClient.removeQueries({queryKey: ["basket"]});
        setBasketCount(0);
    };

    return (
        <BasketDrawerContext.Provider
            value={{
                isOpen,
                openDrawer,
                closeDrawer,
                basketCount,
                resetBasket,
            }}
        >
            {children}
        </BasketDrawerContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBasketDrawer() {
    const ctx = useContext(BasketDrawerContext);
    if (!ctx) throw new Error("useBasketDrawer must be used within BasketDrawerContextProvider");
    return ctx;
}
