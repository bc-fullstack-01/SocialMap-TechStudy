import React, { memo, useEffect, useState, useContext } from 'react'
import io from "socket.io-client"

import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCommentIcon from '@mui/icons-material/AddComment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Badge } from '@mui/material';

import { Alerts } from '../../contexts/AlertsContext'
import CustomIconButton from "../CustomIconButton";
import CONSTANTS from '../../constants'

import './index.css'

const ReceiveAlert = () => {
    const token = localStorage.getItem("accessToken");

    const { countPersistent } = useContext(Alerts)
    const [postNew, setPostNew] = useState(countPersistent.current["post-new"]);
    const [postLike, setPostLike] = useState(countPersistent.current["post-like"]);
    const [comment, setComment] = useState(countPersistent.current["comment-new"]);
    const [follow, setFollow] = useState(countPersistent.current["follow-new"]);

    const socket = io(CONSTANTS.SOCKET_HOST, {
        auth: { token },
        secure: true,
    })

    useEffect(() => {
        // socket.on("connect_profile", (id) => {
        //     console.log('connect_profile', id);
        // });

        // socket.on("disconnect", () => {
        //     console.log(`disconnect socket`);
        // });

        socket.on("post-new", (data) => {
            countPersistent.current["post-new"] += 1
            setPostNew(countPersistent.current["post-new"])
            // console.log(`post socket- ${data}`);

        });

        socket.on("post-like", (data) => {
            countPersistent.current["post-like"] += 1
            setPostLike(countPersistent.current["post-like"])
            // console.log(`post-like socket- ${data}`);

        });

        socket.on("comment-new", (data) => {
            countPersistent.current["comment-new"] += 1
            setComment(countPersistent.current["comment-new"])
            // console.log(`comment-new- ${data}`);

        });

        socket.on("follow-new", (data) => {
            countPersistent.current["follow-new"] += 1
            setFollow(countPersistent.current["follow-new"])
            // console.log(data);
        });

        socket.on("connect_error", (err) => {
            console.log(err);
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, socket]);

    const handleCleanAlert = (value: string) => {
        countPersistent.current[value] = 0
    };

    return (
        <>
            <li className="dropdownAlert">
                <div className="dropbtnAlert">{
                    <Badge
                        badgeContent={
                            Object.keys(countPersistent.current).reduce((sum, key) => sum + parseFloat(countPersistent.current[key] || 0), 0)
                        }
                        color="error">
                        <NotificationsIcon />
                    </Badge>
                }</div>

                <div className="dropdownAlert-content">
                    <CustomIconButton
                        label="post-like"
                        onCLickCallback={() => {
                            handleCleanAlert("post-like")
                            setPostLike(0)
                        }}
                    >
                        <Badge badgeContent={postLike} color="error">

                            <ThumbUpIcon />
                        </Badge>
                    </CustomIconButton>

                    <CustomIconButton
                        label="comment-new"
                        onCLickCallback={() => {
                            handleCleanAlert("comment-new")
                            setComment(0)
                        }}
                    >
                        <Badge badgeContent={comment} color="error">

                            <AddCommentIcon />
                        </Badge>
                    </CustomIconButton>

                    <CustomIconButton
                        label="follow-new"
                        onCLickCallback={() => {
                            handleCleanAlert("follow-new")
                            setFollow(0)
                        }}
                    >
                        <Badge badgeContent={follow} color="error">
                            <PersonAddIcon />
                        </Badge>
                    </CustomIconButton>

                    <CustomIconButton
                        label="post-new"
                        onCLickCallback={() => {
                            handleCleanAlert("post-new")
                            setPostNew(0)
                        }}
                    >
                        <Badge badgeContent={postNew} color="error">
                            <PostAddIcon />
                        </Badge>
                    </CustomIconButton>
                </div>
            </li>
        </>



    )
}

export default memo(ReceiveAlert);