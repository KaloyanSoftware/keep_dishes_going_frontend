import {useState} from "react";
import {Box, Button, CircularProgress, Collapse, Divider, Paper, Stack, Typography,} from "@mui/material";
import "./OrderView.scss";
import type {OrderProjection} from "../../../model/owner/OrderProjection.ts";

interface Props {
    order: OrderProjection;
    onAccept: (orderId: string) => void;
    onReject: (orderId: string) => void;
    onReady: (orderId: string) => void;
    isMutating: boolean;
}

export function OrderView({order, onAccept, onReject, onReady, isMutating}: Props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Paper className={`order-card ${order.status.toLowerCase()}`} elevation={3}>
            <Box className="order-header" onClick={() => setExpanded(!expanded)}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" className="order-id">
                        #{order.orderId}
                    </Typography>
                    <Typography className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                    </Typography>
                </Stack>
            </Box>

            <Collapse in={expanded}>
                <Divider sx={{my: 1}}/>
                <Box className="order-details">
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className="address"
                    >
                        {order.deliveryInfo.street} {order.deliveryInfo.number},{" "}
                        {order.deliveryInfo.postalCode} {order.deliveryInfo.city}
                    </Typography>

                    <Box className="order-lines">
                        {Object.entries(order.orderLines).map(([dish, qty]) => (
                            <Typography key={dish} className="order-line">
                                {dish} × {qty}
                            </Typography>
                        ))}
                    </Box>
                </Box>

                <Box className="order-actions">
                    {isMutating ? (
                        <CircularProgress size={24} thickness={4}/>
                    ) : (
                        <>
                            {order.status === "PENDING" && (
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => onAccept(order.orderId)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => onReject(order.orderId)}
                                    >
                                        Reject
                                    </Button>
                                </Stack>
                            )}

                            {order.status === "ACCEPTED" && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onReady(order.orderId)}
                                >
                                    Ready
                                </Button>
                            )}
                        </>
                    )}
                </Box>
            </Collapse>
        </Paper>
    );
}
