import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import InfiniteScroll from 'react-native-infinite-scrolling'

import ProfileSummary from "../components/ProfileSummary"
import { Profile } from '../models/Profile'
import server from "../api/server";
import { Context as AuthContext } from "../context/AuthContext"


export default function ProfilesScreen() {
    const { createAlert } = useContext(AuthContext)
    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        const getProfiles = async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken")
                const response = await server.auth(token).get("/profiles")
                setProfiles(response.data)
            } catch (err) {
                createAlert({ msg: 'Erro ao obter os perfis', type: 'error' })
            }
        }
        getProfiles();
    }, [])

    function renderList({ item }) {
        return <ProfileSummary item={item} />
    }

    return (
        <InfiniteScroll
            data={profiles}
            renderData={renderList}
        />
    )
}


