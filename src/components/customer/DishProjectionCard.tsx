import {Button, Card, CardContent, CardMedia, CircularProgress, Typography,} from "@mui/material";
import type {DishProjection} from "../../model/customer/DishProjection";

interface DishProjectionCardProps {
    dish: DishProjection;
    onAddToBasket: (dishId: string) => void;
    isAdding?: boolean;
}

export function DishProjectionCard({
                                       dish,
                                       onAddToBasket,
                                       isAdding = false,
                                   }: DishProjectionCardProps) {
    return (
        <Card className="dish-card">
            <CardMedia
                component="img"
                height="160"
                image={dish.pictureURL}
                alt={dish.name}
            />
            <CardContent>
                <Typography variant="h6" fontWeight={600}>
                    {dish.name}
                </Typography>
                <Typography color="text.secondary">{dish.type}</Typography>
                <Typography variant="body1" fontWeight="bold" mt={1}>
                    €{dish.price.toFixed(2)}
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isAdding}
                    onClick={() => onAddToBasket(dish.dishId)}
                    sx={{mt: 1}}
                >
                    {isAdding ? (
                        <CircularProgress size={22} color="inherit"/>
                    ) : (
                        "Add to Basket"
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
