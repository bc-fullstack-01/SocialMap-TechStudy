import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import InfiniteScroll from 'react-native-infinite-scrolling'

import ProfileSummary from "../components/ProfileSummary"
import { Profile } from '../models/Profile'
import server from "../api/server";


export default function ProfilesScreen() {
    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        const getProfiles = async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken")
                const response = await server.auth(token).get("/profiles")
                setProfiles(response.data)
            } catch (err) {
                console.log(err)
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


