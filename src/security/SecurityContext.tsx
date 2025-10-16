import {createContext} from "react";
import Keycloak from "keycloak-js";

export interface SecurityContextType {
    keycloak: Keycloak;
    isInitialised: boolean;
    logout: () => void;
}

export const SecurityContext = createContext<SecurityContextType | undefined>(undefined);
