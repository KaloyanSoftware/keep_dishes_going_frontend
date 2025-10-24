import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import type {Basket} from "../../model/customer/Basket";
import "./BasketDrawer.scss";

interface BasketDrawerProps {
    open: boolean;
    onClose: () => void;
    basket?: Basket;
}

export function BasketDrawer({open, onClose, basket}: BasketDrawerProps) {
    const basketLines = basket?.basketLines ?? [];
    const subtotal =
        basketLines.reduce((sum, line) => sum + line.price * line.quantity, 0) || 0;

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
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
                    <List>
                        {basketLines.map((line) => (
                            <ListItem key={line.id} className="basket-line">
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
                )}

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
                    >
                        Checkout
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
}
