import type {DishDraftFormData} from "../../../model/owner/DishDraftFormData.ts";
import {useForm} from "react-hook-form";
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {useState} from "react";
import {useDishTypes} from "../../../hooks/useDishType.ts";
import {useFoodTags} from "../../../hooks/useFoodTag.ts";

interface DishDraftFormProps {
    onSubmit: (data: DishDraftFormData) => void;
    disabled?: boolean;
}

export function DishDraftForm({onSubmit, disabled}: DishDraftFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<DishDraftFormData>({
        defaultValues: {
            name: "",
            type: "",
            price: 0,
            description: "",
            pictureURL: "",
            foodTags: [],
        },
    });

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Load enums with custom hooks
    const {dishTypes, isLoading: isLoadingTypes, isError: isErrorTypes} = useDishTypes();
    const {foodTags, isLoading: isLoadingTags, isError: isErrorTags} = useFoodTags();

    // Handle checkbox change
    const handleTagToggle = (tag: string) => {
        let updatedTags: string[];
        if (selectedTags.includes(tag)) {
            updatedTags = selectedTags.filter((t) => t !== tag);
        } else {
            updatedTags = [...selectedTags, tag];
        }
        setSelectedTags(updatedTags);
        setValue("foodTags", updatedTags);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{p: 3, minWidth: 450}}>
                <Typography variant="h6" fontWeight={600}>
                    Create a New Dish Draft
                </Typography>
                <TextField
                    label="Name"
                    required
                    disabled={disabled}
                    {...register("name", {required: "Dish name is required"})}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    fullWidth
                />

                <TextField
                    label="Description"
                    multiline
                    minRows={3}
                    {...register("description")}
                    disabled={disabled}
                    fullWidth
                />

                {isLoadingTypes ? (
                    <CircularProgress size={24}/>
                ) : isErrorTypes ? (
                    <Typography color="error">Failed to load dish types</Typography>
                ) : (
                    <TextField
                        select
                        label="Dish Type"
                        required
                        disabled={disabled}
                        {...register("type", {required: "Dish type is required"})}
                        error={!!errors.type}
                        helperText={errors.type?.message}
                        fullWidth
                    >
                        {dishTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type.replace("_", " ")}
                            </MenuItem>
                        ))}
                    </TextField>
                )}

                <TextField
                    label="Price (€)"
                    type="number"
                    required
                    disabled={disabled}
                    {...register("price", {
                        required: "Price is required",
                        valueAsNumber: true,
                        validate: (v) => (v > 0 ? true : "Must be positive"),
                    })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    fullWidth
                />

                <TextField
                    label="Picture URL"
                    {...register("pictureURL")}
                    disabled={disabled}
                    fullWidth
                />
                {isLoadingTags ? (
                    <CircularProgress size={24}/>
                ) : isErrorTags ? (
                    <Typography color="error">Failed to load food tags</Typography>
                ) : (
                    <FormControl component="fieldset" sx={{mt: 2}}>
                        <Typography variant="subtitle1" gutterBottom>
                            Food Tags
                        </Typography>
                        <FormGroup>
                            {foodTags.map((tag) => (
                                <FormControlLabel
                                    key={tag}
                                    control={
                                        <Checkbox
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => handleTagToggle(tag)}
                                            disabled={disabled}
                                        />
                                    }
                                    label={tag.replace("_", " ")}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                )}
                <Stack direction="row" justifyContent="flex-end" sx={{mt: 2}}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={disabled}
                    >
                        Create Draft
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}
