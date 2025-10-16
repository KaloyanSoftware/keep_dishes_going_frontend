import {useState} from "react";
import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {AppHeader} from "../components/AppHeader";
import {CreateRestaurantForm} from "../components/CreateRestaurantForm";
import "./RestaurantsPage.scss";

interface Restaurant {
    id: string;
    name: string;
    description?: string;
}

export function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [showForm, setShowForm] = useState(false);

    return (
        <Box className="restaurants-page">
            <AppHeader/>

            <Box className="content">
                {restaurants.length === 0 ? (
                    <Box className="empty">
                        <Typography variant="h5" gutterBottom>
                            You have no restaurants right now.
                        </Typography>
                        {!showForm ? (
                            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                                Create a Restaurant
                            </Button>
                        ) : (
                            <CreateRestaurantForm onSuccess={() => setShowForm(false)}/>
                        )}
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {restaurants.map((r) => (
                            <Grid item xs={12} sm={6} md={4} key={r.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{r.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {r.description || "No description available"}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            View
                                        </Button>
                                        <Button size="small" color="error">
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
}
