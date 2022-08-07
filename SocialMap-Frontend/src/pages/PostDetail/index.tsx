/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { Divider, TextField, Button, CardHeader, CardContent } from "@mui/material";

import PostCard from "../../components/PostCard";
import CustomAppBar from '../../components/CustomAppBar';
import CustomAvatar from "../../components/CustomAvatar";

import { Post } from "../../Models/Post";
import server from '../../api/server';
import Utils from "../../Utils"

import logo from '../../assets/logoAlert.png';
import "./index.css";

interface Comment {
    value: string,
    error: string
}

const PostDetail = () => {
    const token = localStorage.getItem('accessToken');
    const profileId = localStorage.getItem('profile');
    const profileName = localStorage.getItem('name');
    const userMidia = localStorage.getItem('userMidia');

    const { postId } = useParams();
    const [post, setPost] = useState<Post>();
    const [comment, setComment] = useState<Comment>({value:'', error:''});

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await server.get(`/posts/${postId}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setPost(response.data);
            } catch (err) {
                toast.warning('Não foi possível carregar o post!', {
                    icon: () => <img src={logo} alt="logo SocialMap" />,
                });
            }
        }
        getPost();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comment.value.length === 0) {
            toast.warning('O comentário não deve ser vazio!', {
                icon: () => <img src={logo} alt="logo SocialMap" />,
            });
        } else {
            try {
                const response = await server.post(`/posts/${postId}/comment`,
                    { description: comment.value },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        }
                    });

                setComment({ ...comment, value: "" });
                const newComment = {
                    ...response.data,
                    description: comment.value,
                    profile: {
                        _id: profileId,
                        name: profileName,
                        midia: userMidia,
                    }
                }
                post?.comments.unshift(newComment);
                setPost(post)
            } catch (err) {
                toast.error('Ocorreu um erro ao adicionar um comentário', {
                    icon: () => <img src={logo} alt="logo SocialMap" />,
                });
            }
        }
    };

    return (
        <div className='midDivPost'>
            <CustomAppBar />

            {post && <PostCard post={post} handlePostClick={() => { }} />}
            <br />
            <Divider style={{ marginRight: "10%", marginLeft: "10%" }} />
            <br />

            <div className="containerComments">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        id="comment"
                        label="Novo comentário"
                        variant="standard"
                        multiline
                        minRows={3}
                        fullWidth
                        value={comment.value}
                        onChange={(e) => setComment({ value: e.target.value, error: "" })}
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end"
                    }}>
                        <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
                            Publicar
                        </Button>
                    </div>
                </form>
            </div >

            {post?.comments && post?.comments.map((item) => {
                return (item.profile ?
                    (<div className="divComment" key={item._id}>
                        <CardHeader
                            avatar={<CustomAvatar name={item.profile.name} profile_id={item.profile._id} midia={item.profile.midia} />}
                            title={<h3>{Utils.fistToUpperCase(item.profile.name)}</h3>}
                            style={{ padding: 0 }}
                        />
                        <CardContent style={{ padding: 0 }}>
                            <p className="postTextComment">{item.description} </p>
                        </CardContent>
                    </div>)
                    :
                    (<></>)
                )
            })}

        </div>
    );
}

export default PostDetail;