import {useContext, useState} from "react";
import {AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
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
        <AppBar position="static" color="primary">
            <Toolbar className="app-header">
                <Typography variant="h6" className="logo">KDG</Typography>

                <Box className="nav-links">
                    <Typography variant="body1">Restaurants</Typography>
                    <Typography variant="body1">Profile</Typography>
                </Box>

                <Box className="user-menu">
                    <Typography variant="body1" className="greeting">Hi, {email}</Typography>
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
