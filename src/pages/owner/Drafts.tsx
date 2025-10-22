import {useState} from "react";
import {Box, Button, CircularProgress, Container, Fab, Typography,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Drafts.scss";
import {OwnerHeader} from "../../components/owner/header/OwnerHeader.tsx";
import {DraftCard} from "../../components/owner/draft/DishDraftCard.tsx";
import {DishDraftDialog} from "../../components/owner/draft/DishDraftDialog.tsx";
import {useDishDrafts, usePublishDishDraft} from "../../hooks/useDishDrafts.ts";
import {useParams} from "react-router";

export function Drafts() {
    const {id: restaurantId} = useParams<{ id: string }>();

    if (!restaurantId) {
        throw new Error(
            "Missing restaurant ID in URL. Expected /owner/restaurant/:id/drafts"
        );
    }

    const {drafts, isLoading, isError} = useDishDrafts(restaurantId);
    const {publishDraft} = usePublishDishDraft(restaurantId);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (isLoading)
        return (
            <Box className="drafts-loading">
                <CircularProgress/>
            </Box>
        );

    if (isError)
        return (
            <Typography color="error" textAlign="center" mt={10}>
                Failed to load dish drafts.
            </Typography>
        );

    const hasDrafts = drafts && drafts.length > 0;

    const handlePublishDraft = async (draftId: string) => {
        try {
            publishDraft(draftId);
            console.log("Draft published successfully:", draftId);
        } catch (error) {
            console.error("Failed to publish draft:", error);
        }
    };

    return (
        <Box className="drafts-root">
            <OwnerHeader restaurantId={restaurantId}/>

            <Container maxWidth="lg" className="drafts-page">
                <Box className="drafts-header">
                    <Typography variant="h4" fontWeight={700}>
                        Dish Drafts
                    </Typography>
                </Box>

                {!hasDrafts ? (
                    <Box className="no-drafts">
                        <Typography variant="h5" fontWeight="600" gutterBottom>
                            You have no dish drafts right now.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Start by creating your first dish draft below.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Create a Draft
                        </Button>
                    </Box>
                ) : (
                    <Box className="drafts-grid">
                        {drafts.map((draft) => (
                            <DraftCard
                                key={draft.id}
                                draft={draft}
                                onPublish={() => handlePublishDraft(draft.id)}
                            />
                        ))}
                    </Box>
                )}
            </Container>

            <Fab
                color="primary"
                aria-label="add"
                onClick={() => setIsDialogOpen(true)}
                className="floating-create-btn"
            >
                <AddIcon/>
            </Fab>

            <DishDraftDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                restaurantId={restaurantId}
            />
        </Box>
    );
}
