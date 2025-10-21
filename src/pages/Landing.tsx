import {Box, Button, Container, Stack, Typography} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {useNavigate} from "react-router";

export function Landing() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "background.default",
                color: "text.primary",
                textAlign: "center",
                px: 2,
            }}
        >
            <Container maxWidth="sm">
                <RestaurantIcon sx={{fontSize: 80, color: "primary.main", mb: 2}}/>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                    Welcome to Keep Dishes Going
                </Typography>
                <Typography variant="h6" color="text.secondary" mb={5}>
                    Explore restaurants and menus, or manage your own as an owner.
                </Typography>

                <Stack direction="column" spacing={2} alignItems="center">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate("/customer/explore")}
                        sx={{width: "250px"}}
                    >
                        Continue as Customer
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={() => navigate("/owner/restaurant")}
                        sx={{width: "250px"}}
                    >
                        Continue as Owner
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}
