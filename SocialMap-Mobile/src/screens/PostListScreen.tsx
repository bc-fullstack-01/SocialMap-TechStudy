import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from "@rneui/base";

import { Context as PostContext } from "../context/PostContext";

import CardPost from "../components/CardPost";
import FaviriteIconButton from "../components/FavoriteIconButton";

import CustomAvatar from "../components/CustomAvatar";

export default function PostListScreen() {
    const { posts, errorMessage, getPosts } = useContext(PostContext);

    useEffect(() => {
        getPosts ? getPosts() : ''
    }, [])

    return (
        <>
            {errorMessage ?
                (<View style={style.errorContainerStyle}>
                    <Text style={style.errorMessageStyle}>{errorMessage}</Text>
                </View>)
                :
                (<FlatList
                    data={posts}
                    keyExtractor={({ _id }) => _id}
                    renderItem={({ item }) => (
                        <CardPost post={item} />
                    )}
                />)
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