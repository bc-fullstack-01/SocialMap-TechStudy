import React from "react";
import { Typography, IconButton } from '@mui/material';
import { ChatBubbleOutline } from "@mui/icons-material";

interface Props {
    commentsCount: number;
}

const CustomChatBubbleIcon = ({ commentsCount }: Props) => {
    return (
        <>
            <IconButton>
                <ChatBubbleOutline fontSize="small" />
            </IconButton>

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {commentsCount}
            </Typography>
        </>
    )
}

export default CustomChatBubbleIcon;