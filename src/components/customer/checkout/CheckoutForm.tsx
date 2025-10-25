import {Box, Button, CircularProgress, Stack, TextField, Typography,} from "@mui/material";
import {useForm} from "react-hook-form";
import type {CustomerInfoFormData} from "../../../model/customer/CustomerInfoFormData";
import "./CheckoutForm.scss"

interface CheckoutFormProps {
    onSubmit: (data: CustomerInfoFormData) => void;
    disabled?: boolean;
    isError?: boolean;
}

export function CheckoutForm({onSubmit, disabled, isError}: CheckoutFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CustomerInfoFormData>({
        defaultValues: {
            name: "",
            email: "",
            deliveryAddress: {
                street: "",
                number: 0,
                postalCode: 0,
                city: "",
                country: "",
            },
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <TextField
                    label="Full Name"
                    required
                    disabled={disabled}
                    {...register("name", {required: "Name is required"})}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    fullWidth
                />

                <TextField
                    label="Email"
                    type="email"
                    required
                    disabled={disabled}
                    {...register("email", {required: "Email is required"})}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                />

                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    textAlign="left"
                    sx={{mt: 2}}
                >
                    Delivery Address
                </Typography>

                <TextField
                    label="Street"
                    required
                    disabled={disabled}
                    {...register("deliveryAddress.street", {
                        required: "Street is required",
                    })}
                    error={!!errors.deliveryAddress?.street}
                    helperText={errors.deliveryAddress?.street?.message}
                    fullWidth
                />

                <TextField
                    label="Number"
                    type="number"
                    required
                    disabled={disabled}
                    {...register("deliveryAddress.number", {
                        required: "Number is required",
                        valueAsNumber: true,
                    })}
                    error={!!errors.deliveryAddress?.number}
                    helperText={errors.deliveryAddress?.number?.message}
                    fullWidth
                />

                <TextField
                    label="Postal Code"
                    required
                    disabled={disabled}
                    {...register("deliveryAddress.postalCode", {
                        required: "Postal code is required",
                    })}
                    error={!!errors.deliveryAddress?.postalCode}
                    helperText={errors.deliveryAddress?.postalCode?.message}
                    fullWidth
                />

                <TextField
                    label="City"
                    required
                    disabled={disabled}
                    {...register("deliveryAddress.city", {
                        required: "City is required",
                    })}
                    error={!!errors.deliveryAddress?.city}
                    helperText={errors.deliveryAddress?.city?.message}
                    fullWidth
                />

                <TextField
                    label="Country"
                    required
                    disabled={disabled}
                    {...register("deliveryAddress.country", {
                        required: "Country is required",
                    })}
                    error={!!errors.deliveryAddress?.country}
                    helperText={errors.deliveryAddress?.country?.message}
                    fullWidth
                />

                {isError && (
                    <Typography color="error">
                        Something went wrong while placing your order.
                    </Typography>
                )}

                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={disabled}
                        startIcon={
                            disabled ? <CircularProgress size={20}/> : undefined
                        }
                    >
                        {disabled ? "Placing Order..." : "Place Order"}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
}
