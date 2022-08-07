import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CustomChatBubbleIcon from "../CustomChatBubbleIcon";
import CustomFavoritIcon from "../CustomFavoriteIcon";
import server from "../../api/server";

import logo from '../../assets/logoAlert.png';


interface Props {
    commentsCount: number;
    likeCount: number;
    likes: string[];
    postId: string;
}

const CustomActionIcon = ({ commentsCount, likeCount, likes, postId }: Props) => {
    const token = localStorage.getItem("accessToken");
    const profile = localStorage.getItem("profile") as string;

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(likeCount)

    useEffect(() => {
        if (likes.includes(profile)) {
            setLiked(true);
        }
    }, [profile, likes])

    const handleLike = async () => {
        try {

            if (!liked) {
                await server.post(`/posts/${postId}/like`, null, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setLiked(true);
                setLikesCount(likesCount + 1);
            } else {
                await server.post(`/posts/${postId}/unlike`, null, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setLiked(false);
                setLikesCount(likesCount - 1);
            }
        } catch (error) {
            toast.warning('Não foi possível realizar a curtida!', {
                icon: () => <img src={logo} alt="logo SocialMap" />,
              })
        }
    }

    return (
        <div>
            <CustomChatBubbleIcon
                commentsCount={commentsCount}
            />
            <CustomFavoritIcon
                handleLike={handleLike}
                likeCount={likesCount}
                liked={liked}
            />

        </div>
    )
}

export default CustomActionIcon;