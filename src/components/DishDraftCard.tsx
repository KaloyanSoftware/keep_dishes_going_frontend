import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import type {DishDraft} from "../model/DishDraft";
import "./DishDraftCard.scss";

interface DraftCardProps {
    draft: DishDraft;
    onPublish?: (draftId: string) => void;
}

export function DraftCard({draft, onPublish}: DraftCardProps) {
    const handlePublish = () => {
        if (onPublish) onPublish(draft.id);
    };

    return (
        <Card className="draft-card" elevation={3}>
            <CardMedia
                component="img"
                height="180"
                image={draft.pictureURL || "/placeholder.jpg"}
                alt={draft.name}
            />
            <CardContent className="draft-card-content">
                <Typography variant="h6" fontWeight="600" gutterBottom>
                    {draft.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {draft.type.replace("_", " ")} · €{draft.price}
                </Typography>
                <Box mt={1}>
                    <Typography variant="caption" color="text.secondary">
                        {draft.foodTags?.join(", ") || "No tags"}
                    </Typography>
                </Box>

                {/* Publish button */}
                <Box mt={2} textAlign="right">
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={handlePublish}
                        className="publish-btn"
                    >
                        Publish
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
