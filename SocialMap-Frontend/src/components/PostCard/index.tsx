import React, {memo} from "react";
import { CardHeader, CardContent, CardActions } from '@mui/material';

import CustomActionIcon from "../CustomActionIcon";
import CustomAvatar from "../CustomAvatar";
import { Post } from "../../Models/Post";
import Utils from "../../Utils"

import "./index.css";


interface Props {
    post: Post;
    handlePostClick: any
}

const style = {
    paper: {
        height: 250,
        width: 200,
        margin: 20,
    },
    card: {
        padding: 5,
    }
}

const PostCard = ({ post, handlePostClick }: Props) => {

    return (
        <div className="main">
            <div onClick={() => handlePostClick(post._id)}>
                <CardHeader
                    avatar={<CustomAvatar name={post.profile.name} profile_id={post.profile._id} midia={post.profile.midia} />}
                    title={<h2>{Utils.fistToUpperCase(post.profile.name)}</h2>}
                    style={style.card}
                />
                <CardContent style={{ padding: 0 }}>
                    <h4 className="postTitle">{Utils.capitalizeFirstLetter(post.title)}</h4>
                    <p className="postText">
                        {post.content}
                    </p>
                </CardContent>

                {post.midia ?
                    (<img src={post.midia} className="imagePost" alt={post.title} />) : <></>
                }
            </div>

            <CardActions>
                <div className="CardAction">
                    <CustomActionIcon
                        commentsCount={post.comments.length}
                        likeCount={post.likes.length}
                        likes={post.likes}
                        postId={post._id}
                    />
                </div>
            </CardActions>
        </div>
    )
}

export default memo(PostCard);