import {Box, Button, Card, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import type {RestaurantProjection} from "../../model/customer/RestaurantProjection";
import "./RestaurantCard.scss";

interface RestaurantCardProps {
    restaurant: RestaurantProjection;
    onExplore: () => void;
}

export function RestaurantCard({restaurant, onExplore}: RestaurantCardProps) {
    const location = `${restaurant.location.street} ${restaurant.location.number}, ${restaurant.location.city}`;

    return (
        <Card className="restaurant-card" elevation={3}>
            <CardMedia
                component="img"
                height="180"
                image={restaurant.pictureURL || "/placeholder.jpg"}
                alt={restaurant.email}
            />
            <CardContent className="restaurant-card-content">
                <Typography variant="h6" fontWeight="600" gutterBottom>
                    {restaurant.email.split("@")[0]}'s Restaurant
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {location}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Cuisine: {restaurant.cuisineType}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Prep Time: {restaurant.defaultPrepTime} min
                </Typography>

                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Chip
                        label={restaurant.isOpen ? "OPEN" : "CLOSED"}
                        color={restaurant.isOpen ? "success" : "error"}
                        size="small"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={onExplore}
                        disabled={!restaurant.isOpen}
                    >
                        Explore Menu
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
