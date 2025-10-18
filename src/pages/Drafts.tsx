import {useState} from "react";
import {Box, Button, CircularProgress, Container, Fab, Typography,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Drafts.scss";
import {AppHeader} from "../components/AppHeader";
import {DraftCard} from "../components/DishDraftCard";
import {DishDraftDialog} from "../components/DishDraftDialog";
import {useDishDrafts} from "../hooks/useDishDrafts";
import {useParams} from "react-router";

export function Drafts() {
    const {id: restaurantId} = useParams<{ id: string }>();

    if (!restaurantId) {
        throw new Error("Missing restaurant ID in URL. Expected /owner/restaurant/:id/drafts");
    }

    const {drafts, isLoading, isError} = useDishDrafts(restaurantId);
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

    // Example placeholder handler — replace with your real publish function later
    const handlePublishDraft = (draftId: string) => {
        console.log("Publish draft:", draftId);
        // e.g. await publishDraft(restaurantId, draftId);
    };

    return (
        <Box className="drafts-root">
            <AppHeader restaurantId={restaurantId}/>

            <Container maxWidth="lg" className="drafts-page">
                {/* Header row */}
                <Box className="drafts-header">
                    <Typography variant="h4" fontWeight={700}>
                        Dish Drafts
                    </Typography>
                </Box>

                {/* Drafts grid or empty message */}
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
                                onPublish={handlePublishDraft}
                            />
                        ))}
                    </Box>
                )}
            </Container>

            {/* Floating Create Draft button (always visible) */}
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => setIsDialogOpen(true)}
                className="floating-create-btn"
            >
                <AddIcon/>
            </Fab>

            {/* Draft creation dialog */}
            <DishDraftDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                restaurantId={restaurantId}
            />
        </Box>
    );
}
