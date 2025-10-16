import {useEffect, useState} from "react";
import {Box, Button, CircularProgress, Container, Divider, Paper, Typography,} from "@mui/material";
import "./Restaurant.scss";
import {useRestaurant} from "../hooks/useRestaurant.ts";
import {Footer} from "../components/Footer";
import {AppHeader} from "../components/AppHeader";
import {RestaurantDialog} from "../components/RestaurantDialog";

export function Restaurant() {
    const {isLoading, isError, restaurant} = useRestaurant();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !restaurant) setIsDialogOpen(true);
    }, [isLoading, restaurant]);

    if (isLoading)
        return (
            <Box className="center">
                <CircularProgress/>
            </Box>
        );

    if (isError)
        return (
            <Typography color="error" sx={{mt: 8, textAlign: "center"}}>
                Something went wrong loading your restaurant.
            </Typography>
        );

    return (
        <Box className="restaurant-root">
            <AppHeader/>

            <Box className="restaurant-content">
                {!restaurant ? (
                    <Typography variant="h5" className="create-message">
                        Creating your restaurant...
                    </Typography>
                ) : (
                    <Container maxWidth="lg" className="restaurant-container">
                        <Paper className="restaurant-card" elevation={3}>
                            {/* Left info section */}
                            <Box className="restaurant-info">
                                <Typography variant="h4" className="restaurant-title">
                                    {restaurant.email.split("@")[0]}'s Restaurant
                                </Typography>
                                <Divider sx={{mb: 2}}/>

                                <Typography className="info-line">
                                    <strong>Address:</strong> {restaurant.address.street}{" "}
                                    {restaurant.address.number}, {restaurant.address.city},{" "}
                                    {restaurant.address.country}
                                </Typography>

                                <Typography className="info-line">
                                    <strong>Cuisine Type:</strong> {restaurant.cuisineType}
                                </Typography>

                                <Typography className="info-line">
                                    <strong>Email:</strong> {restaurant.email}
                                </Typography>

                                <Typography className="info-line">
                                    <strong>Default Prep Time:</strong>{" "}
                                    {restaurant.defaultPrepTime} min
                                </Typography>

                            </Box>

                            {/* Right image section */}
                            <Box className="restaurant-image-wrapper">
                                <img
                                    src={restaurant.pictureURL || "/placeholder.jpg"}
                                    alt="Restaurant"
                                    className="restaurant-image"
                                />
                            </Box>
                        </Paper>

                        {/* Dishes section placeholder */}
                        <Paper className="dishes-section" elevation={2}>
                            <Typography variant="h5" fontWeight={600} mb={2}>
                                🍝 Dishes
                            </Typography>
                            <Typography color="text.secondary">
                                You haven’t added any dishes yet. Add some to start building your menu!
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{mt: 2}}
                                onClick={() => alert("Coming soon")}
                            >
                                Add Dish
                            </Button>
                        </Paper>
                    </Container>
                )}
            </Box>

            <RestaurantDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}/>
            <Footer/>
        </Box>
    );
}
