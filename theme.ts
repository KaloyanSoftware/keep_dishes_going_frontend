import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#0288d1",
        },
        background: {
            default: "#fafbff",
        },
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', sans-serif",
        h6: {fontWeight: 600},
    },
    shape: {borderRadius: 10},
});
