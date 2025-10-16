import {Box, Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {AppHeader} from "../components/AppHeader";
import "./OwnerHomePage.scss";

export function OwnerHomePage() {
    const navigate = useNavigate();

    return (
        <Box className="owner-home">
            <AppHeader/>
            <Box className="content">
                <Typography variant="h4" gutterBottom>
                    Welcome back!
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Manage your restaurant profile and menus easily.
                </Typography>

                <Stack spacing={2} direction="column" alignItems="center">
                    <Button variant="contained" color="primary" onClick={() => navigate("/profile")}>
                        Profile
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => navigate("/restaurants")}>
                        Restaurants
                    </Button>
                </Stack>
            </Box>

            <footer className="footer">
                <Typography variant="body2">© Keep Dishes Going 2025</Typography>
            </footer>
        </Box>
    );
}
