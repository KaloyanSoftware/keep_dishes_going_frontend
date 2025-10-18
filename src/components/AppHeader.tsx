import {useContext, useState} from "react";
import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {SecurityContext} from "../security/SecurityContext";
import {useLocation, useNavigate} from "react-router";
import "./AppHeader.scss";

interface AppHeaderProps {
    restaurantId: string | undefined
}

export function AppHeader({restaurantId}: AppHeaderProps) {
    const security = useContext(SecurityContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    if (!security?.keycloak.authenticated) return null;

    const email = security.keycloak.tokenParsed?.email || "User";

    const open = Boolean(anchorEl);

    const gotoDrafts = () => {
        if (restaurantId) navigate(`/owner/restaurant/${restaurantId}/drafts`);
        else navigate("/owner/restaurant");
    };

    return (
        <AppBar
            position="fixed"
            className="app-header"
            elevation={3}
            sx={{zIndex: theme.zIndex.drawer + 1}}
        >
            <Toolbar className="app-toolbar">
                {/* Logo */}
                <Typography
                    variant="h4"
                    className="logo"
                    onClick={() => navigate("/owner/restaurant")}
                >
                    KeepDishesGoing
                </Typography>

                {/* Navigation */}
                <Box className="nav-links">

                    <Button
                        color="inherit"
                        onClick={gotoDrafts}
                        className={location.pathname.includes("/drafts") ? "active-link" : ""}
                    >
                        Drafts
                    </Button>
                </Box>

                {/* User */}
                <Box className="user-menu">
                    <Typography variant="body1" className="greeting">
                        Hi, {email}
                    </Typography>
                    <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <KeyboardArrowDownIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                        transformOrigin={{vertical: "top", horizontal: "right"}}
                    >
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                security.logout();
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
