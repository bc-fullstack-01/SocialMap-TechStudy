import React, { useEffect, useState, useContext } from "react";
import { StyleSheet } from "react-native";
import InfiniteScroll from 'react-native-infinite-scrolling'
import { Context as AuthContext } from "../context/AuthContext";

import { ButtonsProfileFollow } from '../components/ButtonsProfile'
import ProfileCard from "../components/ProfileCard";
import CardPost from "../components/CardPost";

import { navigate } from '../../RootNavigation';
import { Profile } from '../models/Profile'
import { Post } from '../models/Post'
import server from "../api/server";


const profileClean = {
    _id: '',
    name: '',
    followers: [''],
    following: [''],
    posts: [''],
    user: ''
}


export default function ProfileScreen({ route }: { route: any }) {
    const { token, createAlert } = useContext(AuthContext);
    const { id } = route.params;
    const [profileUser, setProfileUser] = useState<Profile>(profileClean);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const checkSelfProfile = async () => {
            if (token === id) navigate('Meu Perfil')
        }
        checkSelfProfile()
    }, [id])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await server.auth(token as string).get(`/feed/profile/${id}`)
                setPosts(response.data.slice(0).reverse())
            } catch (error) {
                createAlert({ msg: "Houve um erro ao carregar os posts!", type: "error" });
            }
        }
        getPosts()
    }, [id])

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await server.auth(token).get(`/profiles/${id}`)
                setProfileUser(response.data)
            } catch (error) {
                createAlert({ msg: "Houve um erro ao carregar o perfil. Por favor, tente mais tarde!", type: "error" });
            }
        }
        getProfile()
    }, [id])

    function renderList({ item }: { item: Post }) {
        if (Object.prototype.hasOwnProperty.call(item, "followers")) {
            return (
                <ProfileCard profile={profileUser} resume={false}>
                    <ButtonsProfileFollow id={profileUser._id} followers={profileUser.followers} />
                </ProfileCard >
            )
        } else return <CardPost post={item} />
    }

    return (
        <>
            <InfiniteScroll
                data={[profileUser].concat(posts)}
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