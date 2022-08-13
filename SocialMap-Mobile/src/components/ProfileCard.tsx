import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Profile } from '../models/Profile'

import CustomAvatar from "../components/CustomAvatar";
import Utils from '../Utils'
import server from "../api/server";
import Cover from "../assets/backgroundPerfil";

const profileClean = {
    _id: '',
    name: '',
    followers: [''],
    following: [''],
    posts: [''],
    user: ''
}

interface IProps {
    // profile: Profile,
    children?: JSX.Element,
    resume?: boolean,
}

export default function ProfileCard({ children, resume = true }: IProps) {
    const [profile, setProfile] = useState<Profile>(profileClean)

    useEffect(() => {
        const getProfile = async () => {
            const token = await AsyncStorage.getItem("accessToken")
            const profile_id = await AsyncStorage.getItem("profile_id")
            try {
                const response = await server.auth(token).get(`/profiles/${profile_id}`)
                setProfile(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProfile()
    }, [])

    return (
        <View style={styles.container}>
            <Image source={Cover[Utils.randomNumber(0, Cover.length)]} style={styles.background} />
            <CustomAvatar name={profile.name} midia={profile.midia} size={80} style={styles.avatar} />

            {children}

            <Text style={styles.name} >{Utils.capitalizeFirstLetter(profile.name)}</Text>
            {profile.about ? (resume
                ? <Text style={styles.about} >{Utils.splitAbout(profile.about, 12)}</Text>
                : <Text style={styles.about} >{profile.about}</Text>
            ) : <></>}

            <View style={styles.infosContainer}>
                <View style={styles.infosDiv}>
                    <Text style={styles.infoNumber}>{profile.following.length}</Text>
                    <Text style={styles.infoLabel}>Following</Text>
                </View>
                <View style={{ ...styles.infosDiv, ...styles.infosMid }} >
                    <Text style={styles.infoNumber}>{profile.followers.length}</Text>
                    <Text style={styles.infoLabel}>Followers</Text>
                </View>
                <View style={styles.infosDiv}>
                    <Text style={styles.infoNumber}>{profile.posts.length}</Text>
                    <Text style={styles.infoLabel}>Posts</Text>
                </View>
            </View>

        </View>


    )
}
const { height, width } = Dimensions.get('screen')
const topSub = -60

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: 'auto',
        backgroundColor: 'white',

        borderStyle: "solid",
        borderColor: '#a5a5a5',
        borderBottomWidth: 1,
    },
    name: {
        top: topSub,
        marginTop: 0,
        fontWeight: "bold",
        fontSize: 18,
    },
    about: {
        top: topSub,
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
    },
    background: {
        width: width,
        height: height / 7.3,
        margin: 0,
    },
    avatar: {
        top: -40,
        margin: 0,
    },
    infosContainer: {
        top: topSub +16,
        width: '90%',
        flexDirection: 'row',
        padding: 15,

        justifyContent: 'space-around',
        alignContent: 'center',

        borderStyle: "solid",
        borderColor: '#9ea3a8',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    infosDiv: {
        alignItems: 'center'

    },
    infosMid: {
        borderStyle: "solid",
        borderColor: '#9ea3a8',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        paddingHorizontal: 15,
    },
    infoNumber: {
        fontWeight: "bold",
        fontSize: 14,
    },
    infoLabel: {
        fontWeight: "300",
        fontSize: 13,
    },

})