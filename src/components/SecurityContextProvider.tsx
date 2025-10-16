import {type PropsWithChildren, useEffect, useState} from "react";
import Keycloak from "keycloak-js";
import axios from "axios";
import {SecurityContext} from "./SecurityContext";
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from "../services/auth";

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
};
const keycloak = new Keycloak(keycloakConfig);

export function SecurityContextProvider({children}: PropsWithChildren) {
    const [isInitialised, setIsInitialised] = useState(false);

    useEffect(() => {
        keycloak
            .init({
                onLoad: "check-sso",        // check if already logged in
                checkLoginIframe: false,    // disables the iframe check
            })
            .then(async (authenticated) => {
                if (!authenticated) {
                    await keycloak.login();
                    return;
                }

                addAccessTokenToAuthHeader(keycloak.token);

                // Register or link the owner in backend
                await registerOwnerIfNeeded(keycloak);

                setIsInitialised(true);
            })
            .catch((err) => console.error("Keycloak init failed:", err));

        // Handle keycloak lifecycle events
        keycloak.onAuthSuccess = () => {
            addAccessTokenToAuthHeader(keycloak.token);
        };

        keycloak.onAuthLogout = () => {
            removeAccessTokenFromAuthHeader();
        };

        keycloak.onAuthError = () => {
            removeAccessTokenFromAuthHeader();
        };
    }, []);

    const logout = () => keycloak.logout({redirectUri: window.location.origin});

    return (
        <SecurityContext.Provider value={{keycloak, isInitialised, logout}}>
            {children}
        </SecurityContext.Provider>
    );
}


interface KeycloakTokenParsed {
    sub: string;
    email?: string;
    given_name?: string;
    family_name?: string;
    preferred_username?: string;
}

async function registerOwnerIfNeeded(keycloak: Keycloak) {
    try {
        const token = keycloak.token;
        const userInfo = keycloak.tokenParsed as KeycloakTokenParsed;

        const ownerPayload = {
            externalRef: userInfo.sub,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
            email: userInfo.email,
        };

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/owners/register`, ownerPayload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
    } catch (err) {
        console.error("Owner registration failed! :", err);
    }
}

