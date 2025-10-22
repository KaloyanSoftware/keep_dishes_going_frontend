import {AppBar, Box, Toolbar, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router";
import "./CustomerHeader.scss";

export function CustomerHeader() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            className="app-header"
            elevation={3}
            sx={{zIndex: theme.zIndex.drawer + 1}}
        >
            <Toolbar className="app-toolbar">
                <Typography
                    variant="h4"
                    className="logo"
                    onClick={() => navigate("/customer/explore")}
                >
                    KeepDishesGoing
                </Typography>

                <Box className="user-menu">
                    <Typography variant="body1" className="greeting">
                        Hi, Guest
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
