import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import InfiniteScroll from 'react-native-infinite-scrolling'
import {  StyleSheet } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";

import { ButtonsProfileSelf } from '../components/ButtonsProfile'
import ProfileCard from "../components/ProfileCard";
import CardPost from "../components/CardPost";

import server from "../api/server";
import { Post } from '../models/Post'


export default function ProfileSelfScreen() {
    const { profile, getProfile, background } = useContext(AuthContext);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken")
                const profile_id = await AsyncStorage.getItem("profile_id")
                const response = await server.auth(token as string).get(`/feed/profile/${profile_id}`)
                setPosts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [])

    useEffect(() => {
        getProfile()
    }, [])

    function renderList({ item }: { item: Post }) {
        if (Object.prototype.hasOwnProperty.call(item, "followers")) {
            return (
                <ProfileCard profile={profile} background={background} resume={false}>
                    <ButtonsProfileSelf />
                </ProfileCard >
            )
        } else return <CardPost post={item} />
    }

    return (
        <>
            <InfiniteScroll
                data={[profile].concat(posts)}
                renderData={renderList}
                loadMore={() => { }}
            />
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