import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SecurityContextProvider} from "./security/SecurityContextProvider";
import {Restaurant} from "./pages/owner/Restaurant.tsx";
import {ThemeProvider} from "@emotion/react";
import {theme} from "../theme.ts";
import {CssBaseline} from "@mui/material";
import {Drafts} from "./pages/owner/Drafts.tsx";
import {Dishes} from "./pages/owner/Dishes.tsx";
import {RouteGuard} from "./security/RouteGuard.tsx";
import {Landing} from "./pages/Landing.tsx";
import {CustomerExplore} from "./pages/customer/CustomerExplore.tsx";
import {RestaurantsExplore} from "./pages/customer/RestaurantsExplore.tsx";
import {Menu} from "./pages/owner/Menu.tsx";


const queryClient = new QueryClient();

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <QueryClientProvider client={queryClient}>
                <SecurityContextProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/owner/restaurant" element={<RouteGuard><Restaurant/></RouteGuard>}/>
                            <Route path="/landing" element={<Landing/>}/>
                            <Route path="/customer/explore" element={<CustomerExplore/>}/>
                            <Route path="/" element={<Navigate to="/landing"/>}/>
                            <Route path="/owner/restaurant/:id/drafts" element={<RouteGuard><Drafts/></RouteGuard>}/>
                            <Route path="/owner/restaurant/:id/menu/dishes"
                                   element={<RouteGuard><Dishes/></RouteGuard>}/>
                            <Route path="/customer/explore/restaurants" element={<RestaurantsExplore/>}/>
                            <Route path="/customer/explore/restaurants/:id/menu/dishes" element={<Menu/>}/>
                        </Routes>
                    </BrowserRouter>
                </SecurityContextProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
