import {Box, CircularProgress, Container, Typography} from "@mui/material";
import "./RestaurantsExplore.scss";
import {useNavigate} from "react-router";
import {RestaurantCard} from "../../components/customer/RestaurantCard.tsx";
import {useRestaurants} from "../../hooks/useRestaurant.ts";
import {CustomerHeader} from "../../components/customer/CustomerHeader.tsx";

export function RestaurantsExplore() {
    const {restaurants, isLoading, isError} = useRestaurants();
    const navigate = useNavigate();

    if (isLoading)
        return (
            <Box className="restaurants-loading">
                <CircularProgress/>
            </Box>
        );

    if (isError)
        return (
            <Typography color="error" textAlign="center" mt={10}>
                Failed to load restaurants.
            </Typography>
        );

    const hasRestaurants = restaurants && restaurants.length > 0;

    return (
        <Box className="restaurants-root">
            <CustomerHeader/>

            <Container maxWidth="lg" className="restaurants-page">
                <Box className="restaurants-header">
                    <Typography variant="h4" fontWeight={700}>
                        Restaurants
                    </Typography>
                </Box>

                {!hasRestaurants ? (
                    <Box className="no-restaurants">
                        <Typography variant="h5" fontWeight="600" gutterBottom>
                            No restaurants available right now.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Please check back later.
                        </Typography>
                    </Box>
                ) : (
                    <Box className="restaurants-grid">
                        {restaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.restaurantId}
                                restaurant={restaurant}
                                onExplore={() =>
                                    navigate(`/customer/explore/restaurants/${restaurant.restaurantId}/menu/dishes`)
                                }
                            />
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
}
