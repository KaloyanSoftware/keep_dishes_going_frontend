import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import type {DishDraft} from "../../../model/owner/DishDraft.ts";
import "./DishDraftCard.scss";
import {useState} from "react";

interface DraftCardProps {
    draft: DishDraft;
    onPublish?: (draftId: string) => Promise<void> | void;
    onDeleteDraft?: (draftId: string) => Promise<void> | void;
    isProcessing?: boolean;
}

export function DraftCard({
    draft,
    onPublish,
    onDeleteDraft,
    isProcessing = false,
}: DraftCardProps) {
    const [isLocalLoading, setIsLocalLoading] = useState(false);
    const [activeAction, setActiveAction] = useState<"publish" | "delete" | null>(null);

    const handlePublish = async () => {
        try {
            setActiveAction("publish");
            setIsLocalLoading(true);
            await onPublish?.(draft.id);
        } finally {
            setIsLocalLoading(false);
            setActiveAction(null);
        }
    };

    const handleDelete = async () => {
        try {
            setActiveAction("delete");
            setIsLocalLoading(true);
            await onDeleteDraft?.(draft.id);
        } finally {
            setIsLocalLoading(false);
            setActiveAction(null);
        }
    };

    const disabled = isProcessing || isLocalLoading;

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

                <Box mt={2} className="draft-actions">
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={handlePublish}
                        disabled={disabled}
                    >
                        {activeAction === "publish" && disabled ? (
                            <CircularProgress size={18} color="inherit"/>
                        ) : (
                            "Publish"
                        )}
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={handleDelete}
                        disabled={disabled}
                    >
                        {activeAction === "delete" && disabled ? (
                            <CircularProgress size={18} color="inherit"/>
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
