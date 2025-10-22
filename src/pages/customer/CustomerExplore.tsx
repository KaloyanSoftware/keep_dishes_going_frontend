import {Box, Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import "./CustomerExplore.scss";
import {CustomerHeader} from "../../components/customer/CustomerHeader.tsx";

export function CustomerExplore() {
    const navigate = useNavigate();

    return (
        <Box className="customer-explore-page">
            {/* Header */}
            <CustomerHeader/>
            <Container maxWidth="md" className="explore-root">
                <Box className="explore-center">
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Welcome to KDG
                    </Typography>

                    <Box className="explore-buttons">
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate("/landing")}
                            fullWidth
                        >
                            Back to Landing
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/customer/explore/restaurants")}
                            fullWidth
                        >
                            Explore Restaurants
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
