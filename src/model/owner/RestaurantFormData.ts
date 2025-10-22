export type RestaurantFormData = {
    email: string;
    pictureURL: string;
    cuisineType: string;
    defaultPrepTime: number;
    street: string;
    number: string;
    city: string;
    postalCode: string;
    country: string;
    openingHours: {
        [day: string]: { start: string; end: string };
    };
};
