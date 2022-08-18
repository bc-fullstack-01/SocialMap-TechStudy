import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import InfiniteScroll from 'react-native-infinite-scrolling'

import { Context as AuthContext } from "../context/AuthContext";

import ProfileCard from "../components/ProfileCard";
import CardPost from "../components/CardPost";
import server from "../api/server";

import { Post } from '../models/Post'


export default function PostListScreen() {
    const { token, profile_id, profile, getProfile, createAlert, background } = useContext(AuthContext);
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(false)

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await server.auth(token).get(`/feed?page=${page}`)
                const response_posts = response.data.map((post: Post) => {
                    return { ...post, liked: post.likes.includes(profile_id) }
                })
                setHasMore(response.data.length > 0);
                setPosts(posts.concat(response_posts))
            } catch (error) {
                createAlert({ msg: "Houve um erro ao carregar o feed!", type: "error" });
            }
        }
        getPosts()
    }, [page])


    const loadMore = () => {
        if (hasMore) setPage(page + 1)
    }

    function renderList({ item }: { item: Post }) {
        if (Object.prototype.hasOwnProperty.call(item, "followers")) {
            return (
                <ProfileCard profile={profile} background={background} />
            )
        } if (Object.prototype.hasOwnProperty.call(item, "title")) {
            return <CardPost post={item} />
        }

    }

    return (
        <InfiniteScroll
            data={[profile].concat(posts)}
            renderData={renderList}
            loadMore={loadMore}
        />
    )
}

const style = StyleSheet.create({
    CardHeaderStyle: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    CardTitleStyle: {
        marginLeft: 15,
        fontWeight: "bold",
    },
    CardImageStyle: {
        resizeMode: "contain",
        maxHeight: 600,
        marginBottom: 15,
    },
    DescriptionStyle: {
        fontSize: 12,

    },
    ActionContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "space-between",
    },
    ActionItemStyle: {
        marginLeft: 5,

    },
    errorMessageStyle: {
        color: "red",
    },
    errorContainerStyle: {
        marginTop: 20,
        alignItems: "center",
    }
})