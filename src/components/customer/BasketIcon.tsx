import {Badge, IconButton} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "./BasketIcon.scss";
import {useBasketDrawer} from "../context/BasketDrawerContext";

export function BasketIcon() {
    const {basketCount, openDrawer} = useBasketDrawer();

    return (
        <div className="basket-icon-container">
            <IconButton color="inherit" className="basket-button" onClick={openDrawer}>
                <Badge
                    badgeContent={basketCount}
                    color="primary"
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                >
                    <ShoppingBasketIcon className="basket-icon"/>
                </Badge>
            </IconButton>
        </div>
    );
}
