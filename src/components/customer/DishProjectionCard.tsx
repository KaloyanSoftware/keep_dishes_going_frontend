import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import type {DishProjection} from "../../model/customer/DishProjection";
import "./DishProjectionCard.scss";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import type {Basket} from "../../model/customer/Basket";

interface DishProjectionCardProps {
    dish: DishProjection;
    onAddToBasket?: (dishId: string) => void;
    isAdding?: boolean;
}

export function DishProjectionCard({
                                       dish,
                                       onAddToBasket,
                                       isAdding = false,
                                   }: DishProjectionCardProps) {
    const queryClient = useQueryClient();
    const basket: Basket | null | undefined = queryClient.getQueryData(["basket"]);

    const [isOutOfStock, setOutOfStock] = useState(dish.stockStatus === "OUT_OF_STOCK");
    const [isDifferentRestaurant, setDifferentRestaurant] = useState(
        !!basket?.restaurantId && basket.restaurantId !== dish.restaurantId
    );

    useEffect(() => {
        setDifferentRestaurant(
            !!basket?.restaurantId && basket.restaurantId !== dish.restaurantId
        );
    }, [basket, dish.restaurantId]);

    const handleAddToBasket = () => {
        setOutOfStock(dish.stockStatus === "OUT_OF_STOCK");
        setDifferentRestaurant(
            !!basket?.restaurantId && basket.restaurantId !== dish.restaurantId
        );

        if (!isOutOfStock && !isDifferentRestaurant && onAddToBasket) {
            onAddToBasket(dish.dishId);
        }
    };

    return (
        <Card className="dish-projection-card" elevation={3}>
            <CardMedia
                component="img"
                height="200"
                image={dish.pictureURL || "/placeholder.jpg"}
                alt={dish.name}
            />

            <CardContent className="dish-projection-content">
                <Typography variant="h6" fontWeight="700" gutterBottom>
                    {dish.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {dish.type.replace("_", " ")}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {dish.description}
                </Typography>

                <Box mt={2}>
                    <Typography variant="body1" fontWeight="bold">
                        €{dish.price.toFixed(2)}
                    </Typography>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                            color: isOutOfStock
                                ? "#d32f2f"
                                : isDifferentRestaurant
                                    ? "#ed6c02"
                                    : "#2e7d32",
                        }}
                    >
                        {isOutOfStock
                            ? "Out of Stock"
                            : isDifferentRestaurant
                                ? "Different Restaurant"
                                : "In Stock"}
                    </Typography>
                </Box>

                {!isOutOfStock && (
                    <Box mt={2} textAlign="right">
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleAddToBasket}
                            disabled={isAdding || isDifferentRestaurant}
                        >
                            {isDifferentRestaurant
                                ? "Invalid"
                                : isAdding
                                    ? "Adding..."
                                    : "Add to Basket"}
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
