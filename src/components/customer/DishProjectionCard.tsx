import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import type {DishProjection} from "../../model/customer/DishProjection";
import "./DishProjectionCard.scss";
import {useEffect, useState} from "react";

interface DishProjectionCardProps {
    dish: DishProjection;
    onAddToBasket?: (dishId: string) => void;
}

export function DishProjectionCard({dish, onAddToBasket}: DishProjectionCardProps) {
    const [isOutOfStock, setOutOfStock] = useState(dish.stockStatus === "OUT_OF_STOCK");

    useEffect(() => {
        setOutOfStock(dish.stockStatus === "OUT_OF_STOCK");
    }, [dish.stockStatus]);

    const handleAddToBasket = () => {
        onAddToBasket?.(dish.dishId);
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

                <Box mt={1}>
                    <Typography variant="caption" color="text.secondary">
                        Categories: {dish.tags?.join(", ") || "None"}
                    </Typography>
                </Box>

                <Box mt={2}>
                    <Typography variant="body1" fontWeight="bold">
                        Price: €{dish.price.toFixed(2)}
                    </Typography>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                            color: isOutOfStock ? "#d32f2f" : "#2e7d32",
                        }}
                    >
                        {isOutOfStock ? "Out of Stock" : "In Stock"}
                    </Typography>
                </Box>

                {!isOutOfStock && (
                    <Box mt={2} textAlign="right">
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleAddToBasket}
                        >
                            Add to Basket
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
