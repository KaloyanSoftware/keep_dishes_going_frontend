import {Alert, Box, Button, Card, CardContent, CardMedia, CircularProgress, Snackbar, Typography,} from "@mui/material";
import type {Dish} from "../../../model/owner/Dish.ts";
import "./DishCard.scss";
import {useState} from "react";

interface DishCardProps {
    dish: Dish;
    onPublish?: (dishId: string) => Promise<void> | void;
    onUnpublish?: (dishId: string) => Promise<void> | void;
    onMarkOutOfStock?: (dishId: string) => Promise<void> | void;
    onMarkBackInStock?: (dishId: string) => Promise<void> | void;
    isProcessing?: boolean;
}

export function DishCard({
                             dish,
                             onPublish,
                             onUnpublish,
                             onMarkOutOfStock,
                             onMarkBackInStock,
                             isProcessing = false,
                         }: DishCardProps) {
    const [isPublished, setIsPublished] = useState(dish.state === "PUBLISHED");
    const [isInStock, setIsInStock] = useState(dish.stockStatus === "IN_STOCK");
    const [isLocalLoading, setIsLocalLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handlePublishToggle = async () => {
        try {
            setIsLocalLoading(true);

            if (isPublished) {
                await onUnpublish?.(dish.id);
                setIsPublished(false);
            } else {
                await onPublish?.(dish.id);
                setIsPublished(true);
            }
        } catch (error) {
            console.error("Failed to toggle publish state:", error);
            setErrorMessage("Failed to update publish status. Please try again.");
        } finally {
            setIsLocalLoading(false);
        }
    };

    const handleStockToggle = async () => {
        try {
            setIsLocalLoading(true);

            if (isInStock) {
                await onMarkOutOfStock?.(dish.id);
                setIsInStock(false);
            } else {
                await onMarkBackInStock?.(dish.id);
                setIsInStock(true);
            }
        } catch (error) {
            console.error("Failed to toggle stock state:", error);
            setErrorMessage("Failed to update stock status. Please try again.");
        } finally {
            setIsLocalLoading(false);
        }
    };

    const disabled = isProcessing || isLocalLoading;

    return (
        <>
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

                    <Box mt={2} className="dish-status">
                        <Typography
                            variant="caption"
                            className={`dish-state ${
                                isPublished ? "published" : "unpublished"
                            }`}
                        >
                            {isPublished ? "Published" : "Unpublished"}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={`dish-stock ${
                                isInStock ? "in-stock" : "out-stock"
                            }`}
                        >
                            {isInStock ? "In Stock" : "Out of Stock"}
                        </Typography>
                    </Box>

                    <Box mt={2} className="dish-actions">
                        <Button
                            variant="contained"
                            color={isPublished ? "warning" : "success"}
                            size="small"
                            onClick={handlePublishToggle}
                            disabled={disabled}
                        >
                            {disabled ? (
                                <CircularProgress size={18} color="inherit"/>
                            ) : isPublished ? (
                                "Unpublish"
                            ) : (
                                "Publish"
                            )}
                        </Button>

                        <Button
                            variant="contained"
                            color={isInStock ? "error" : "success"}
                            size="small"
                            onClick={handleStockToggle}
                            disabled={disabled}
                        >
                            {disabled ? (
                                <CircularProgress size={18} color="inherit"/>
                            ) : isInStock ? (
                                "Mark Out of Stock"
                            ) : (
                                "Mark In Stock"
                            )}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={!!errorMessage}
                autoHideDuration={4000}
                onClose={() => setErrorMessage(null)}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={() => setErrorMessage(null)}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
