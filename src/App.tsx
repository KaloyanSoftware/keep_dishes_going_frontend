import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useContext} from "react";
import {SecurityContext} from "./security/SecurityContext";
import {SecurityContextProvider} from "./security/SecurityContextProvider";
import {Restaurant} from "./pages/Restaurant.tsx";
import {ThemeProvider} from "@emotion/react";
import {theme} from "../theme.ts";
import {CssBaseline} from "@mui/material";
import {Drafts} from "./pages/Drafts.tsx";

const queryClient = new QueryClient();

function AppContent() {
    const security = useContext(SecurityContext);

    if (!security?.isInitialised) {
        return <p>Loading...</p>;
    }

    if (!security.keycloak.authenticated) {
        return <p>Redirecting to login...</p>;
    }

    return (
        <Routes>
            <Route path="/owner/restaurant" element={<Restaurant/>}/>
            <Route path="/" element={<Navigate to="/owner/restaurant"/>}/>
            <Route path="/owner/restaurant/:id/drafts" element={<Drafts/>}/>
        </Routes>
    );
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <QueryClientProvider client={queryClient}>
                <SecurityContextProvider>
                    <BrowserRouter>
                        <AppContent/>
                    </BrowserRouter>
                </SecurityContextProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
