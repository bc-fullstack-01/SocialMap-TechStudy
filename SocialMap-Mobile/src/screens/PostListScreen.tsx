import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InfiniteScroll from 'react-native-infinite-scrolling'
import ToastPer from '../components/Toast'

import { Context as PostContext } from "../context/PostContext";
import ProfileCard from "../components/ProfileCard";
import CardPost from "../components/CardPost";
import { Post } from '../models/Post'
import { ButtonsProfileSelf } from '../components/ButtonsProfile'


export default function PostListScreen() {
    const { posts, errorMessage, errorMessageScreen, getPosts } = useContext(PostContext);
    const [actualPage, setActualPage] = useState<number>(0)
    // time 56:00

    useEffect(() => {
        getPosts ? getPosts(actualPage) : ''
    }, [actualPage])

    const loadMore = () => {
        setActualPage((page) => page + 1)
    }

    return (
        <>
            <ToastPer msg={errorMessage as string} type={'error'} />
            <ProfileCard >
                <ButtonsProfileSelf />
            </ProfileCard >


            {!errorMessageScreen ?
                (<InfiniteScroll
                    data={posts}
                    renderData={({ item }: { item: Post }) => (
                        <CardPost post={item} />
                    )}
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