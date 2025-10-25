import {Box, Button, Container, Divider, List, ListItem, ListItemText, Paper, Typography,} from "@mui/material";
import {useNavigate} from "react-router";
import type {Order} from "../../../model/customer/Order";
import "./OrderConfirmation.scss";

interface OrderConfirmationProps {
    order: Order;
}

export function OrderConfirmation({order}: OrderConfirmationProps) {
    const navigate = useNavigate();

    const totalPrice = order.orderLines.reduce((sum, line) => sum + line.total, 0);

    return (
        <Container className="order-confirmation" maxWidth="sm">
            <Paper className="order-card" elevation={5}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    ✅ Order Placed!
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Order #: <strong>{order.id}</strong>
                </Typography>

                <Divider sx={{my: 2}}/>

                <List>
                    {order.orderLines.map((line, index) => (
                        <ListItem key={index} className="order-line">
                            <ListItemText
                                primary={
                                    <Typography fontWeight={600}>
                                        {line.name}
                                    </Typography>
                                }
                                secondary={`€${line.pricePerUnit.toFixed(2)} × ${line.quantity}`}
                            />
                            <Typography fontWeight={600}>
                                €{line.total.toFixed(2)}
                            </Typography>
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{my: 2}}/>

                <Box className="total-section">
                    <Typography variant="h6" fontWeight={700}>
                        Total: €{totalPrice.toFixed(2)}
                    </Typography>
                </Box>

                <Divider sx={{my: 2}}/>

                <Box className="customer-info">
                    <Typography variant="subtitle1" fontWeight={600}>
                        Delivery Details
                    </Typography>
                    <Typography>{order.customerInfo.name}</Typography>
                    <Typography>{order.customerInfo.email}</Typography>
                    <Typography>
                        {order.customerInfo.deliveryAddress.street}{" "}
                        {order.customerInfo.deliveryAddress.number},{" "}
                        {order.customerInfo.deliveryAddress.postalCode}{" "}
                        {order.customerInfo.deliveryAddress.city},{" "}
                        {order.customerInfo.deliveryAddress.country}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt: 3}}
                    onClick={() => navigate("/customer/explore")}
                >
                    Back to Home
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt: 3}}
                >
                    Track Order
                </Button>
            </Paper>
        </Container>
    );
}
