import {Box, Typography} from "@mui/material";
import "./CustomerExplore.scss";

export function CustomerExplore() {
    return (
        <Box className="explore-root">
            <Typography variant="h3" fontWeight={700}>
                Welcome!
            </Typography>
            <Typography variant="h6" color="text.secondary" mt={2}>
                Start exploring restaurants soon.
            </Typography>
        </Box>
    );
}
