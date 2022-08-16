import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InfiniteScroll from 'react-native-infinite-scrolling'

import { Context as PostContext } from "../context/PostContext";
import { Context as AuthContext } from "../context/AuthContext";

import ProfileCard from "../components/ProfileCard";
import CardPost from "../components/CardPost";

import { Post } from '../models/Post'


export default function PostListScreen() {
    const { profile, getProfile, background } = useContext(AuthContext);
    const { posts, errorMessage, errorMessageScreen, getPosts } = useContext(PostContext);
    const [actualPage, setActualPage] = useState<number>(0)

    useEffect(() => {
        getPosts ? getPosts(actualPage) : ''
    }, [actualPage])

    useEffect(() => {
        getProfile()
    }, [])

    const loadMore = () => {
        setActualPage((page) => page + 1)
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
        <>
            {!errorMessageScreen ?
                (<InfiniteScroll
                    data={[profile].concat(posts)}
                    renderData={renderList}
                    loadMore={loadMore}
                />)
                :
                (<View style={style.errorContainerStyle}>
                    <Text style={style.errorMessageStyle}>{errorMessageScreen}</Text>
                </View>)
            }
        </>
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