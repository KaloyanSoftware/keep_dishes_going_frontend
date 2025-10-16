import {useContext, useState} from "react";
import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {SecurityContext} from "../security/SecurityContext";
import "./AppHeader.scss";

export function AppHeader() {
    const security = useContext(SecurityContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    if (!security?.keycloak.authenticated) return null;

    const email = security.keycloak.tokenParsed?.email || "User";
    const open = Boolean(anchorEl);

    return (
        <AppBar position="static" className="app-header" elevation={2}>
            <Toolbar className="app-toolbar">
                {/* Logo */}
                <Typography variant="h5" className="logo">
                    🍽 KeepDishesGoing
                </Typography>

                {/* Navigation links */}
                <Box className="nav-links">
                    <Button color="inherit">Restaurant</Button>
                    <Button color="inherit">Profile</Button>
                </Box>

                {/* User section */}
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
                        <MenuItem onClick={() => {
                            setAnchorEl(null);
                            security.logout();
                        }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
