import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import type {Dish} from "../model/Dish";
import "./DishCard.scss";

interface DishCardProps {
    dish: Dish;
    onUnpublish?: (dishId: string) => void;
    onMarkOutOfStock?: (dishId: string) => void;
}

export function DishCard({dish, onUnpublish, onMarkOutOfStock}: DishCardProps) {
    const handleUnpublish = () => {
        if (onUnpublish) onUnpublish(dish.id);
    };

    const handleMarkOutOfStock = () => {
        if (onMarkOutOfStock) onMarkOutOfStock(dish.id);
    };

    const isPublished = dish.state === "PUBLISHED" || dish.state === "ACTIVE";
    const isInStock = dish.stockStatus === "IN_STOCK";

    return (
        <Card className="dish-card" elevation={3}>
            <CardMedia
                component="img"
                height="180"
                image={dish.pictureURL || "/placeholder.jpg"}
                alt={dish.name}
            />
            <CardContent className="dish-card-content">
                <Typography variant="h6" fontWeight="600" gutterBottom>
                    {dish.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {dish.type.replace("_", " ")} · €{dish.price}
                </Typography>
                <Box mt={1}>
                    <Typography variant="caption" color="text.secondary">
                        {dish.tags?.join(", ") || "No tags"}
                    </Typography>
                </Box>

                {/* Status section */}
                <Box mt={2} className="dish-status">
                    <Typography
                        variant="caption"
                        className={`dish-state ${isPublished ? "published" : "unpublished"}`}
                    >
                        {isPublished ? "Published" : "Unpublished"}
                    </Typography>
                    <Typography
                        variant="caption"
                        className={`dish-stock ${isInStock ? "in-stock" : "out-stock"}`}
                    >
                        {isInStock ? "In Stock" : "Out of Stock"}
                    </Typography>
                </Box>

                {/* Action buttons */}
                <Box mt={2} className="dish-actions">
                    <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={handleUnpublish}
                        className="unpublish-btn"
                    >
                        Unpublish
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleMarkOutOfStock}
                        className="outstock-btn"
                    >
                        Mark Out Of Stock
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
