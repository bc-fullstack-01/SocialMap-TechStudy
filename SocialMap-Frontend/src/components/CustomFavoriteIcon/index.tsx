import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    handleLike: any;
    liked: boolean;
    likeCount: number;
}

const CustomFavoritIcon = ({ handleLike, liked, likeCount }: Props) => {
    return(
        <>
            <IconButton onClick={handleLike}>
                {liked ? 
                    (<FavoriteIcon fontSize="small" sx={{ color: "red" }}/>)
                    :
                    (<FavoriteBorderIcon fontSize="small"/>)
                }
            </IconButton>
            
            <Typography 
                variant="caption" 
                color="text.secondary"
            >
                {likeCount}
            </Typography>
        </>
    )
}

export default CustomFavoritIcon;
