import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from '@rneui/base';

import CustomAvatar from "./CustomAvatar";
import { Card } from "@rneui/base";

import { navigate } from '../../RootNavigation';
import { Profile } from '../models/Profile'
import Utils from "../Utils"

export default function ProfileSummary({ item }: { item: Profile }) {
    return (
        <Card key={item._id}>

            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <CustomAvatar id={item._id} name={item.name} midia={item.midia} size={50} />
                    <Text style={styles.name}>{Utils.capitalizeFirstLetter(Utils.splitAbout(item.name, 2))}</Text>
                </View>
                <Button buttonStyle={styles.button} title='Espiar' onPress={() => navigate('Profile', { id: item._id })} />
            </View>

            {item.about && <Text style={styles.text}>{Utils.splitAbout(item.about, 30)}</Text>}


            <View style={styles.infosContainer}>
                <View style={styles.infosDiv}>
                    <Text style={styles.infoNumber}>{item.following.length}</Text>
                    <Text style={styles.infoLabel}>Following</Text>
                </View>
                <View style={{ ...styles.infosDiv, ...styles.infosMid }} >
                    <Text style={styles.infoNumber}>{item.followers.length}</Text>
                    <Text style={styles.infoLabel}>Followers</Text>
                </View>
                <View style={styles.infosDiv}>
                    <Text style={styles.infoNumber}>{item.posts.length}</Text>
                    <Text style={styles.infoLabel}>Posts</Text>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0,
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0,
    },
    name: {
        marginLeft: 8,
        fontWeight: "bold",
        fontSize: 20,
    },
    text: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
    },
    button: {
        marginRight: 20,
        width: 110,
        height: 35,
        padding: 5
    },
    infosContainer: {
        width: '85%',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 5,
        marginTop: 15,

        justifyContent: 'space-around',
        alignContent: 'center',
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


