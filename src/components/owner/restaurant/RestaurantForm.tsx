import {useForm} from "react-hook-form";
import {Box, Button, Divider, MenuItem, Stack, TextField, Typography} from "@mui/material";
import type {RestaurantFormData} from "../../../model/owner/RestaurantFormData.ts";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

interface RestaurantFormProps {
    onSubmit: (data: RestaurantFormData) => void;
    disabled?: boolean;
}

export function RestaurantForm({onSubmit, disabled}: RestaurantFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RestaurantFormData>({
        defaultValues: {
            email: "",
            pictureURL: "",
            cuisineType: "ITALIAN",
            defaultPrepTime: 15,
            street: "",
            number: "",
            city: "",
            postalCode: "",
            country: "",
            openingHours: DAYS.reduce(
                (acc, day) => ({...acc, [day]: {start: "09:00", end: "22:00"}}),
                {}
            ),
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{p: 3, minWidth: 450}}>
                <Typography variant="h6" fontWeight="600">
                    Create a New Restaurant
                </Typography>

                {/* General Info */}
                <TextField
                    label="Email"
                    required
                    disabled={disabled}
                    {...register("email", {required: "Email is required"})}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField label="Picture URL" {...register("pictureURL")} />

                <TextField select label="Cuisine Type" {...register("cuisineType")}>
                    {["ITALIAN", "CHINESE", "JAPANESE", "MEXICAN", "INDIAN", "GREEK"].map(
                        (cuisineType) => (
                            <MenuItem key={cuisineType} value={cuisineType}>
                                {cuisineType}
                            </MenuItem>
                        )
                    )}
                </TextField>

                <TextField
                    label="Default Preparation Time (min)"
                    type="number"
                    {...register("defaultPrepTime", {valueAsNumber: true})}
                />

                <Divider/>

                {/* Address */}
                <Typography variant="subtitle1" sx={{mt: 1}}>
                    Address
                </Typography>
                <TextField label="Street" {...register("street")} />
                <TextField label="Number" {...register("number")} />
                <TextField label="City" {...register("city")} />
                <TextField label="Postal Code" {...register("postalCode")} />
                <TextField label="Country" {...register("country")} />

                <Divider/>

                {/* Opening Hours */}
                <Typography variant="subtitle1" sx={{mt: 1}}>
                    Opening Hours (per day)
                </Typography>
                <Box sx={{display: "grid", gap: 1}}>
                    {DAYS.map((day) => (
                        <Stack key={day} direction="row" alignItems="center" spacing={2}>
                            <Typography sx={{minWidth: 100}}>{day}</Typography>
                            <TextField
                                type="time"
                                {...register(`openingHours.${day}.start` as const)}
                                fullWidth
                            />
                            <Typography>to</Typography>
                            <TextField
                                type="time"
                                {...register(`openingHours.${day}.end` as const)}
                                fullWidth
                            />
                        </Stack>
                    ))}
                </Box>

                <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{mt: 2}}>
                    <Button type="submit" variant="contained" disabled={disabled}>
                        Create Restaurant
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}
