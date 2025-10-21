import {useNavigate, useParams} from "react-router";
import {Box, Button, CircularProgress, Container, Typography,} from "@mui/material";
import {AppHeader} from "../components/AppHeader.tsx";
import {DishCard} from "../components/DishCard.tsx";
import {useDishes, usePublishDish, useUnpublishDish} from "../hooks/useDishes.ts";
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

    const isProcessing = isPublishing || isUnpublishing;

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

    return (
        <Box className="dishes-root">
            <AppHeader restaurantId={restaurantId}/>
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
                                isProcessing={isProcessing}
                            />
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
}
