import {Box, Typography} from "@mui/material";
import "./Footer.scss";

export function Footer() {
    return (
        <Box className="footer">
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} KeepDishesGoing
            </Typography>
        </Box>
    );
}
