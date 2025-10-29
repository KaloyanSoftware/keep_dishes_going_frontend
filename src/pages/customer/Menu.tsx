import {Box, CircularProgress, Container, Typography} from "@mui/material";
import "./Menu.scss";
import {DishProjectionCard} from "../../components/customer/DishProjectionCard.tsx";
import {useDishProjections} from "../../hooks/useDishProjection.ts";
import {useParams} from "react-router";
import {CustomerHeader} from "../../components/customer/CustomerHeader.tsx";
import {useAddItemToBasket} from "../../hooks/useBasket.ts";

export function Menu() {
    const {id: restaurantId} = useParams<{ id: string }>();

    if (!restaurantId) {
        throw new Error("Missing restaurant ID in URL. Expected /restaurants/:id/menu");
    }

    const {dishes, isLoading, isError} = useDishProjections(restaurantId);

    const {addDishToBasket, isPending} = useAddItemToBasket(restaurantId);

    if (!restaurantId) {
        throw new Error("Missing restaurant ID in URL. Expected /restaurants/:id/menu");
    }

    if (isLoading)
        return (
            <Box className="menu-loading">
                <CircularProgress/>
            </Box>
        );

    if (isError)
        return (
            <Typography color="error" textAlign="center" mt={10}>
                Failed to load menu.
            </Typography>
        );

    const hasDishes = dishes && dishes.length > 0;

    const handleAddItem = (dishId: string) => addDishToBasket(dishId);

    return (
        <Box className="menu-root">
            <CustomerHeader/>

            <Container maxWidth="lg" className="menu-page">
                <Box className="menu-header">
                    <Typography variant="h4" fontWeight={700}>
                        Restaurant Menu
                    </Typography>
                </Box>

                {!hasDishes ? (
                    <Box className="no-dishes">
                        <Typography variant="h5" fontWeight="600" gutterBottom>
                            This restaurant has no dishes yet.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Please check back later!
                        </Typography>
                    </Box>
                ) : (
                    <Box className="menu-grid">
                        {dishes.map((dish) => (
                            <DishProjectionCard
                                key={dish.dishId}
                                dish={dish}
                                onAddToBasket={handleAddItem}
                                isAdding={isPending}
                            />
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
}
