import {Box, CircularProgress, Typography} from "@mui/material";
import {useParams} from "react-router";
import {OwnerHeader} from "../../components/owner/header/OwnerHeader.tsx";
import "./Orders.scss";
import {useChangeOrderStatus, useOrderProjections} from "../../hooks/useOrderProjection.ts";
import {OrderView} from "../../components/owner/restaurant/OrderView.tsx";

export function Orders() {
    const {id: restaurantId} = useParams<{ id: string }>();
    const {isLoading, isError, activeOrders} = useOrderProjections(restaurantId!);
    const {mutate: changeStatus, isPending} = useChangeOrderStatus(restaurantId!);

    const handleAccept = (orderId: string) =>
        changeStatus({orderId, status: "ACCEPTED"});

    const handleReject = (orderId: string) =>
        changeStatus({orderId, status: "REJECTED"});

    const handleReady = (orderId: string) =>
        changeStatus({orderId, status: "READY"});

    return (
        <Box className="orders-root">
            <OwnerHeader restaurantId={restaurantId}/>

            <Box className="orders-content">
                {isLoading && (
                    <Box className="center">
                        <CircularProgress size={60} thickness={4}/>
                        <Typography variant="h6">Loading orders...</Typography>
                    </Box>
                )}

                {isError && (
                    <Box className="center">
                        <Typography variant="h6" color="error">
                            ⚠️ Failed to load active orders.
                        </Typography>
                    </Box>
                )}

                {!isLoading && !isError && (
                    <>
                        <Typography variant="h4" className="orders-title">
                            Active Orders
                        </Typography>

                        {activeOrders && activeOrders.length > 0 ? (
                            <Box className="orders-grid">
                                {activeOrders.map((order) => (
                                    <OrderView
                                        key={order.orderId}
                                        order={order}
                                        onAccept={handleAccept}
                                        onReject={handleReject}
                                        onReady={handleReady}
                                        isMutating={isPending}
                                    />
                                ))}
                            </Box>
                        ) : (
                            <Typography className="no-orders">
                                There are no active orders for your restaurant.
                            </Typography>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}
