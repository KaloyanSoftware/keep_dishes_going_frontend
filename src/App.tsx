import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useContext} from "react";
import {SecurityContext} from "./security/SecurityContext";
import {SecurityContextProvider} from "./security/SecurityContextProvider";
import {OwnerHomePage} from "./pages/OwnerHomePage.tsx";

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
            <Route path="/owner" element={<OwnerHomePage/>}/>
            <Route path="/" element={<Navigate to="/owner"/>}/>
        </Routes>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <AppContent/>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    );
}
