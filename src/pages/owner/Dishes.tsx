import {useNavigate, useParams} from "react-router";
import {Box, Button, CircularProgress, Container, Typography} from "@mui/material";
import {OwnerHeader} from "../../components/owner/header/OwnerHeader.tsx";
import {DishCard} from "../../components/owner/dish/DishCard.tsx";
import {
    useDishes,
    useMarkDishBackInStock,
    useMarkDishOutOfStock,
    usePublishDish,
    useUnpublishDish
} from "../../hooks/useDish.ts";
import "./Dishes.scss";

export function Dishes() {
    const {id: restaurantId} = useParams<{ id: string }>();
    const navigate = useNavigate();

    if (!restaurantId) {
        throw new Error("Missing restaurant ID in URL. Expected /owner/restaurant/:id/menu/dishes");
    }

    const {dishes, isLoading, isError} = useDishes(restaurantId);
    const {publishDish, isPending: isPublishing} = usePublishDish(restaurantId);
    const {unpublishDish, isPending: isUnpublishing} = useUnpublishDish(restaurantId);
    const {markOutOfStock, isPending: isMarkingOut} = useMarkDishOutOfStock(restaurantId);
    const {markBackInStock, isPending: isMarkingIn} = useMarkDishBackInStock(restaurantId);

    const isProcessing = isPublishing || isUnpublishing || isMarkingOut || isMarkingIn;

    if (isLoading) {
        return (
            <Box className="dishes-loading">
                <CircularProgress/>
            </Box>
        );
    }

    if (isError) {
        return (
            <Typography color="error" textAlign="center" mt={10}>
                Failed to load dishes.
            </Typography>
        );
    }

    const hasDishes = dishes && dishes.length > 0;

    const handlePublishDish = (dishId: string) => publishDish(dishId);
    const handleUnpublishDish = (dishId: string) => unpublishDish(dishId);
    const handleMarkOutOfStock = (dishId: string) => markOutOfStock(dishId);
    const handleMarkBackInStock = (dishId: string) => markBackInStock(dishId);

    return (
        <Box className="dishes-root">
            <OwnerHeader restaurantId={restaurantId}/>
            <Container maxWidth="lg" className="dishes-page">
                <Box className="dishes-header">
                    <Typography variant="h4" fontWeight={700}>
                        Dishes
                    </Typography>
                </Box>

                {!hasDishes ? (
                    <Box className="no-dishes">
                        <Typography variant="h5" fontWeight="600" gutterBottom>
                            You have no dishes right now.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Start by creating your first dish
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() =>
                                navigate(`/owner/restaurant/${restaurantId}/drafts`)
                            }
                        >
                            Go to Drafts
                        </Button>
                    </Box>
                ) : (
                    <Box className="dishes-grid">
                        {dishes.map((dish) => (
                            <DishCard
                                key={dish.id}
                                dish={dish}
                                onPublish={handlePublishDish}
                                onUnpublish={handleUnpublishDish}
                                onMarkOutOfStock={handleMarkOutOfStock}
                                onMarkBackInStock={handleMarkBackInStock}
                                isProcessing={isProcessing}
                            />
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
}
