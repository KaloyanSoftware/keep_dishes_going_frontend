import {Badge, IconButton} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "./BasketIcon.scss";

interface BasketIconProps {
    count: number;
    onClick?: () => void;
}

export function BasketIcon({count, onClick}: BasketIconProps) {
    return (
        <div className="basket-icon-container">
            <IconButton color="inherit" className="basket-button" onClick={onClick}>
                <Badge
                    badgeContent={count}
                    color="primary"
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                >
                    <ShoppingBasketIcon className="basket-icon"/>
                </Badge>
            </IconButton>
        </div>
    );
}
