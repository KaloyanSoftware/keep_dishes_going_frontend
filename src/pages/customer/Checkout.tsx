import {Box, Container, Paper, Typography} from "@mui/material";
import {CheckoutForm} from "../../components/customer/checkout/CheckoutForm";
import {useCreateOrder} from "../../hooks/useOrder";
import {useParams} from "react-router";
import "./Checkout.scss"

export function Checkout() {
    const {id} = useParams();
    const {createOrder, isPending, isSuccess, isError, order} = useCreateOrder(id!);

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" fontWeight={700} mb={3}>
                    Checkout
                </Typography>

                {isSuccess && order ? (
                    <Box>
                        <Typography variant="h6" color="success.main" gutterBottom>
                            🎉 Order placed successfully!
                        </Typography>
                    </Box>
                ) : (
                    <CheckoutForm
                        onSubmit={createOrder}
                        disabled={isPending}
                        isError={isError}
                    />
                )}
            </Paper>
        </Container>
    );
}
