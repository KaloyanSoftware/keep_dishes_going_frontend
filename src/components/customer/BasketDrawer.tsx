import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDeleteItemFromBasket} from "../../hooks/useBasket.ts";
import "./BasketDrawer.scss";
import {useNavigate} from "react-router";
import type {Basket} from "../../model/customer/Basket.ts";
import {useQueryClient} from "@tanstack/react-query";

interface BasketDrawerProps {
    open: boolean;
    onClose: () => void;
}

export function BasketDrawer({open, onClose}: BasketDrawerProps) {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const basket = queryClient.getQueryData<Basket>(["basket"]);

    const basketLines = basket?.basketLines ?? [];


    const subtotal =
        basketLines.reduce((sum, line) => sum + line.price * line.quantity, 0) || 0;

    const {deleteDishFromBasket, isPending} = useDeleteItemFromBasket(
        basket?.basketId ?? ""
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDrawer-paper": {
                    width: 360,
                    padding: 3,
                    pt: 10,
                    top: "64px",
                    height: "calc(100% - 64px)",
                    zIndex: (theme) => theme.zIndex.appBar - 1,
                },
            }}
        >
            <Box className="basket-drawer">
                <Typography variant="h5" fontWeight={700} mb={2}>
                    Your Basket
                </Typography>

                <Divider/>

                {basketLines.length === 0 ? (
                    <Typography variant="body1" color="text.secondary" mt={3}>
                        Your basket is empty.
                    </Typography>
                ) : (
                    <>
                        <List>
                            {basketLines.map((line) => (
                                <ListItem
                                    key={line.dishId}
                                    className="basket-line"
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() => deleteDishFromBasket(line.dishId)}
                                            disabled={isPending}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            src={line.pictureURL}
                                            alt={line.name}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={line.name}
                                        secondary={`€${line.price.toFixed(2)} × ${line.quantity}`}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Divider sx={{my: 2}}/>

                        <Box className="basket-footer">
                            <Typography variant="h6" fontWeight="600">
                                Total: €{subtotal.toFixed(2)}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                sx={{mt: 2}}
                                onClick={() => {
                                    onClose();
                                    navigate(`/customer/explore/baskets/${basket?.basketId}/checkout`);
                                }}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
}
