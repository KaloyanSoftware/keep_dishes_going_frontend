import axios from "axios";

export function addAccessTokenToAuthHeader(token: string | undefined): void {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        removeAccessTokenFromAuthHeader();
    }
}

export function removeAccessTokenFromAuthHeader(): void {
    delete axios.defaults.headers.common["Authorization"];
}