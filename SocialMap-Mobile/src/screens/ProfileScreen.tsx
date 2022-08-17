import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import InfiniteScroll from 'react-native-infinite-scrolling'
import AsyncStorage from "@react-native-async-storage/async-storage"

import { ButtonsProfileFollow } from '../components/ButtonsProfile'
import ProfileCard from "../components/ProfileCard";
import CardPost from "../components/CardPost";

import { navigate } from '../../RootNavigation';
import server from "../api/server";

import { Post } from '../models/Post'
import { Profile } from '../models/Profile'

const profileClean = {
    _id: '',
    name: '',
    followers: [''],
    following: [''],
    posts: [''],
    user: ''
}


export default function ProfileScreen({ route }: { route: any }) {
    const { id, followers } = route.params;
    const [profile, setProfile] = useState<Profile>(profileClean);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const checkSelfProfile = async () => {
            const token = await AsyncStorage.getItem("profile_id")
            if (token === id) navigate('Meu Perfil')
        }
        checkSelfProfile()
    }, [])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken")
                const response = await server.auth(token as string).get(`/feed/profile/${id}`)
                setPosts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [])

    useEffect(() => {
        const getProfile = async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken")
                const response = await server.auth(token).get(`/profiles/${id}`)
                setProfile(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProfile()
    }, [])

    function renderList({ item }: { item: Post }) {
        if (Object.prototype.hasOwnProperty.call(item, "followers")) {
            return (
                <ProfileCard profile={profile} resume={false}>
                    <ButtonsProfileFollow id={id} followers={followers} />
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