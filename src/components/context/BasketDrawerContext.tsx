import {createContext, type PropsWithChildren, useContext, useState} from "react";

interface BasketDrawerContextValue {
    isOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const BasketDrawerContext = createContext<BasketDrawerContextValue | null>(null);

export function BasketDrawerContextProvider({children}: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    return (
        <BasketDrawerContext.Provider value={{isOpen, openDrawer, closeDrawer}}>
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
