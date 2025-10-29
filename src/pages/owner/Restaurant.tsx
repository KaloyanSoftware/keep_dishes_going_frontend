import {Box, Button, Chip, CircularProgress, Stack, Typography,} from "@mui/material";
import {AccessTime, Email, LocationOn, PowerSettingsNew, Restaurant as RestaurantIcon,} from "@mui/icons-material";
import "./Restaurant.scss";
import {useEffect, useState} from "react";
import {useCloseRestaurant, useOpenRestaurant, useRestaurant,} from "../../hooks/useRestaurant";
import {OwnerHeader} from "../../components/owner/header/OwnerHeader";
import {RestaurantDialog} from "../../components/owner/restaurant/RestaurantDialog";

export function Restaurant() {
    const {isLoading, isError, restaurant} = useRestaurant();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {doOpenRestaurant, isPending: isOpening} = useOpenRestaurant(
        restaurant?.id ?? ""
    );
    const {doCloseRestaurant, isPending: isClosing} = useCloseRestaurant(
        restaurant?.id ?? ""
    );

    useEffect(() => {
        if (!isLoading && !restaurant) {
            setIsDialogOpen(true);
        }
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
                <Box className="error-card">
                    <Typography variant="h5" className="error-title">
                        ⚠️ Oops!
                    </Typography>
                    <Typography className="error-message">
                        Something went wrong loading your restaurant.
                    </Typography>
                </Box>
            </Box>
        );

    return (
        <Box className="restaurant-root">
            <OwnerHeader restaurantId={restaurant?.id}/>

            {!restaurant ? (
                <Box className="center">
                    <Typography variant="h5" className="create-message" sx={{mb: 3}}>
                        No restaurant found yet. Let’s create one!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Create Restaurant
                    </Button>

                    <RestaurantDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                    />
                </Box>
            ) : (
                <>
                    <Box className="restaurant-layout">
                        <Box className="restaurant-hero">
                            <img
                                src={restaurant.pictureURL || "/placeholder.jpg"}
                                alt="Restaurant"
                                className="restaurant-image"
                            />
                            <Box className="hero-overlay">
                                <Typography variant="h3" className="restaurant-title">
                                    Your Restaurant
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Chip
                                        icon={<RestaurantIcon/>}
                                        label={restaurant.cuisineType}
                                        className="cuisine-chip"
                                    />
                                    <Chip
                                        label={restaurant.isOpen ? "OPEN" : "CLOSED"}
                                        color={restaurant.isOpen ? "success" : "error"}
                                        className="status-chip"
                                    />
                                </Stack>
                            </Box>
                        </Box>

                        <Box className="restaurant-status-action">
                            <Button
                                variant="contained"
                                color={restaurant.isOpen ? "error" : "success"}
                                size="large"
                                startIcon={<PowerSettingsNew/>}
                                onClick={() =>
                                    restaurant.isOpen ? doCloseRestaurant() : doOpenRestaurant()
                                }
                                disabled={isOpening || isClosing}
                            >
                                {isOpening || isClosing
                                    ? "Updating..."
                                    : restaurant.isOpen
                                        ? "Close Restaurant"
                                        : "Open Restaurant"}
                            </Button>
                        </Box>

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
                    </Box>

                    <RestaurantDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                    />
                </>
            )}
        </Box>
    );
}
