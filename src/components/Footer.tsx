import {Box, Typography} from "@mui/material";
import "./Footer.scss";

export function Footer() {
    return (
        <Box className="footer">
            <Typography variant="body2">
                © {new Date().getFullYear()} KeepDishesGoing
            </Typography>
        </Box>
    );
}
