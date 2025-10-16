import {useContext} from "react";
import {Button} from "@mui/material";
import {SecurityContext} from "../components/SecurityContext";

export function OwnerPage() {
    const security = useContext(SecurityContext);

    return (
        <div style={{padding: "2rem"}}>
            <h2>Welcome!</h2>
            <Button
                variant="contained"
                color="error"
                onClick={() => security?.logout()}
            >
                Logout
            </Button>
        </div>
    );
}
