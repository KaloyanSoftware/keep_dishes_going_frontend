import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import {Cancel, CheckCircle, Home, HourglassEmpty, LocalDining, RestaurantMenu, TwoWheeler,} from "@mui/icons-material";
import {useNavigate} from "react-router";
import type {Order} from "../../../model/customer/Order";
import {useOrderStatus} from "../../../hooks/useOrder";
import "./OrderConfirmation.scss";

interface OrderConfirmationProps {
    order: Order;
}

const STATUS_STEPS = [
    {key: "PENDING", label: "Pending", icon: <HourglassEmpty/>},
    {key: "ACCEPTED", label: "Accepted", icon: <RestaurantMenu/>},
    {key: "READY", label: "Ready for Pickup", icon: <LocalDining/>},
    {key: "PICKED_UP", label: "On the Way", icon: <TwoWheeler/>},
    {key: "DELIVERED", label: "Delivered", icon: <Home/>},
];

export function OrderConfirmation({order}: OrderConfirmationProps) {
    const navigate = useNavigate();
    const {isLoading, isError, order: liveOrder} = useOrderStatus(order.id);
    const currentOrder = liveOrder || order;
    const totalPrice = currentOrder.total;
    const currentStatus = currentOrder.status?.trim().toUpperCase() || "PENDING";
    const activeStep = STATUS_STEPS.findIndex((s) => s.key === currentStatus);

    const isRejected = currentStatus === "REJECTED";

    return (
        <Container className="order-confirmation" maxWidth="sm">
            <Paper className="order-card" elevation={5}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    ✅ Order Placed!
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Order #: <strong>{currentOrder.id}</strong>
                </Typography>

                <Divider sx={{my: 2}}/>

                {isLoading ? (
                    <Box className="center">
                        <CircularProgress/>
                        <Typography>Checking your order status...</Typography>
                    </Box>
                ) : isError ? (
                    <Typography color="error" sx={{mb: 2}}>
                        ⚠️ Failed to load order status.
                    </Typography>
                ) : isRejected ? (
                    <Box textAlign="center" sx={{py: 4}}>
                        <Cancel sx={{fontSize: 60, color: "#d32f2f", mb: 1}}/>
                        <Typography variant="h5" fontWeight={700} color="error">
                            Your order was rejected.
                        </Typography>
                        <Typography color="text.secondary" sx={{mt: 1}}>
                            The restaurant has declined this order.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h6" mb={2}>
                            Current Status:{" "}
                            <strong className={`status-text ${currentStatus.toLowerCase()}`}>
                                {STATUS_STEPS.find((s) => s.key === currentStatus)?.label ||
                                    currentStatus}
                            </strong>
                        </Typography>

                        <Stepper activeStep={activeStep} alternativeLabel>
                            {STATUS_STEPS.map((step, index) => (
                                <Step key={step.key} completed={index < activeStep}>
                                    <StepLabel
                                        StepIconComponent={() =>
                                            index < activeStep ? (
                                                <CheckCircle className="step-icon completed"/>
                                            ) : (
                                                <span
                                                    className={`step-icon ${
                                                        index === activeStep ? "active" : "inactive"
                                                    }`}
                                                >
                          {step.icon}
                        </span>
                                            )
                                        }
                                    >
                                        {step.label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </>
                )}

                <Divider sx={{my: 3}}/>

                <List>
                    {currentOrder.orderLines.map((line, index) => (
                        <ListItem key={index} className="order-line">
                            <ListItemText
                                primary={<Typography fontWeight={600}>{line.name}</Typography>}
                                secondary={`€${line.pricePerUnit.toFixed(2)} × ${line.quantity}`}
                            />
                            <Typography fontWeight={600}>€{line.total.toFixed(2)}</Typography>
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
                    <Typography>{currentOrder.customerInfo.name}</Typography>
                    <Typography>{currentOrder.customerInfo.email}</Typography>
                    <Typography>
                        {currentOrder.customerInfo.deliveryAddress.street}{" "}
                        {currentOrder.customerInfo.deliveryAddress.number},{" "}
                        {currentOrder.customerInfo.deliveryAddress.postalCode}{" "}
                        {currentOrder.customerInfo.deliveryAddress.city},{" "}
                        {currentOrder.customerInfo.deliveryAddress.country}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt: 3}}
                    onClick={() => navigate("/customer/explore/restaurants")}
                >
                    Back to Home
                </Button>
            </Paper>
        </Container>
    );
}
