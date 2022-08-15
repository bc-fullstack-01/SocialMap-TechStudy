import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

import CustomAvatar from "../components/CustomAvatar";
import Cover from "../assets/backgroundPerfil";
import { Profile } from '../models/Profile'
import Utils from '../Utils'


interface IProps {
    profile: Profile,
    background?: any,
    children?: JSX.Element,
    resume?: boolean,
    
}


export default function ProfileCard({ profile, children, background, resume = true }: IProps) {

    return (
        <View style={styles.container}>
            <Image source={background ? background: Cover[Utils.randomNumber(0, Cover.length)]} style={styles.background} />
            <CustomAvatar id={profile._id} name={profile.name} midia={profile.midia} size={80} style={styles.avatar} />

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
        marginTop: 10,
        marginHorizontal: 20,
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
        alignItems: 'center',
        width: '33%'
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