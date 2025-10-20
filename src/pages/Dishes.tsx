import {useNavigate, useParams} from "react-router";
import {Box, Button, CircularProgress, Container, Typography} from "@mui/material";
import {AppHeader} from "../components/AppHeader.tsx";
import {DishCard} from "../components/DishCard.tsx";
import {useDish, useUnpublishDish} from "../hooks/useDish.ts"; // <-- import your hook
import "./Dishes.scss";

export function Dishes() {
    const {id: restaurantId} = useParams<{ id: string }>();
    const navigate = useNavigate();

    if (!restaurantId) {
        throw new Error(
            "Missing restaurant ID in URL. Expected /owner/restaurant/:id/menu/dishes"
        );
    }

    const {dishes, isLoading, isError} = useDish(restaurantId);
    const {unpublishDish, isPending, isError: isUnpublishError} = useUnpublishDish(restaurantId);

    if (isLoading)
        return (
            <Box className="dishes-loading">
                <CircularProgress/>
            </Box>
        );

    if (isError)
        return (
            <Typography color="error" textAlign="center" mt={10}>
                Failed to load dishes.
            </Typography>
        );

    const hasDishes = dishes && dishes.length > 0;

    const handleUnpublishDish = async (dishId: string) => {
        try {
            unpublishDish(dishId);
            console.log("Dish unpublished successfully:", dishId);
        } catch (error) {
            console.error("Failed to unpublish dish:", error);
        }
    };

    return (
        <Box className="dishes-root">
            <AppHeader restaurantId={restaurantId}/>

            <Container maxWidth="lg" className="dishes-page">
                {/* Header row */}
                <Box className="dishes-header">
                    <Typography variant="h4" fontWeight={700}>
                        Dishes
                    </Typography>
                </Box>

                {/* Show global error or loading from mutation */}
                {isPending && (
                    <Typography color="text.secondary" mb={2}>
                        Processing unpublish request...
                    </Typography>
                )}
                {isUnpublishError && (
                    <Typography color="error" mb={2}>
                        Failed to unpublish dish.
                    </Typography>
                )}

                {/* Dishes grid or empty message */}
                {!hasDishes ? (
                    <Box className="no-dishes">
                        <Typography variant="h5" fontWeight="600" gutterBottom>
                            You have no dishes right now.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Start by creating your first dish draft below.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate(`/owner/restaurant/${restaurantId}/drafts`)}
                        >
                            Create a Draft
                        </Button>
                    </Box>
                ) : (
                    <Box className="dishes-grid">
                        {dishes.map((dish) => (
                            <DishCard
                                key={dish.id}
                                dish={dish}
                                onUnpublish={() => handleUnpublishDish(dish.id)}
                            />
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
}
