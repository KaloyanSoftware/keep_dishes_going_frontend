import {useEffect, useState} from "react";
import {Box, Chip, CircularProgress, Container, Paper, Typography,} from "@mui/material";
import {AccessTime, Email, LocationOn, Restaurant as RestaurantIcon,} from "@mui/icons-material";
import "./Restaurant.scss";
import {useRestaurant} from "../../hooks/useRestaurant";
import {OwnerHeader} from "../../components/owner/header/OwnerHeader";
import {RestaurantDialog} from "../../components/owner/restaurant/RestaurantDialog";

export function Restaurant() {
    const {isLoading, isError, restaurant} = useRestaurant();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !restaurant) setIsDialogOpen(true);
    }, [isLoading, restaurant]);

    if (isLoading)
        return (
            <Box className="center">
                <CircularProgress size={60} thickness={4}/>
            </Box>
        );

    if (isError)
        return (
            <Box className="center">
                <Paper className="error-card" elevation={3}>
                    <Typography variant="h5" className="error-title">
                        ⚠️ Oops!
                    </Typography>
                    <Typography className="error-message">
                        Something went wrong loading your restaurant.
                    </Typography>
                </Paper>
            </Box>
        );

    return (
        <Box className="restaurant-root">
            <OwnerHeader restaurantId={restaurant?.id}/>

            <Box className="restaurant-content">
                {!restaurant ? (
                    <Box className="center">
                        <CircularProgress size={60} thickness={4}/>
                        <Typography variant="h5" className="create-message">
                            Creating your restaurant...
                        </Typography>
                    </Box>
                ) : (
                    <Container maxWidth="lg" className="restaurant-container">
                        <Paper className="restaurant-card" elevation={4}>
                            {/* Hero Section with Image */}
                            <Box className="restaurant-hero">
                                <img
                                    src={restaurant.pictureURL || "/placeholder.jpg"}
                                    alt="Restaurant"
                                    className="restaurant-image"
                                />
                                <Box className="hero-overlay">
                                    <Typography variant="h3" className="restaurant-title">
                                        {restaurant.email.split("@")[0]}'s Restaurant
                                    </Typography>
                                    <Chip
                                        icon={<RestaurantIcon/>}
                                        label={restaurant.cuisineType}
                                        className="cuisine-chip"
                                    />
                                </Box>
                            </Box>

                            {/* Info Grid */}
                            <Box className="restaurant-details">
                                <Box className="info-grid">
                                    <Box className="info-item">
                                        <Box className="info-icon-wrapper">
                                            <LocationOn className="info-icon"/>
                                        </Box>
                                        <Box className="info-content">
                                            <Typography variant="overline" className="info-label">
                                                Address
                                            </Typography>
                                            <Typography variant="body1" className="info-value">
                                                {restaurant.address.street} {restaurant.address.number}
                                            </Typography>
                                            <Typography variant="body2" className="info-secondary">
                                                {restaurant.address.city}, {restaurant.address.country}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box className="info-item">
                                        <Box className="info-icon-wrapper">
                                            <Email className="info-icon"/>
                                        </Box>
                                        <Box className="info-content">
                                            <Typography variant="overline" className="info-label">
                                                Email
                                            </Typography>
                                            <Typography variant="body1" className="info-value">
                                                {restaurant.email}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box className="info-item">
                                        <Box className="info-icon-wrapper">
                                            <RestaurantIcon className="info-icon"/>
                                        </Box>
                                        <Box className="info-content">
                                            <Typography variant="overline" className="info-label">
                                                Cuisine Type
                                            </Typography>
                                            <Typography variant="body1" className="info-value">
                                                {restaurant.cuisineType}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box className="info-item">
                                        <Box className="info-icon-wrapper">
                                            <AccessTime className="info-icon"/>
                                        </Box>
                                        <Box className="info-content">
                                            <Typography variant="overline" className="info-label">
                                                Default Prep Time
                                            </Typography>
                                            <Typography variant="body1" className="info-value">
                                                {restaurant.defaultPrepTime} minutes
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Container>
                )}
            </Box>

            <RestaurantDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </Box>
    );
}
