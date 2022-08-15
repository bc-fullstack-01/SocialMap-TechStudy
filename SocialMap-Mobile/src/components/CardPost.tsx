import React, { useContext } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from "@rneui/base";
import { navigate } from '../../RootNavigation';

import Spacer from "./Spacer";
import { Post } from '../models/Post'

import FaviriteIconButton from "../components/FavoriteIconButton";
import { Context as PostContext } from "../context/PostContext";
import CustomAvatar from "../components/CustomAvatar";
import Utils from '../Utils'



interface IProps {
    post: Post;
}

export default function CardPost({ post }: IProps) {
    const { likePost, unlikePost } = useContext(PostContext);

    return (
        <TouchableOpacity onPress={() => navigate('PostDetail', { id: post._id })}>
            <Card>
                <View style={style.header}>
                    <CustomAvatar id={post.profile._id} name={post.profile.name} midia={post.profile.midia} />
                    <Text style={style.name}>{Utils.capitalizeFirstLetter(post.profile.name)}</Text>
                </View>

                <Text style={style.title}>{post.title}</Text>

                {post.content ? (
                    <Text style={style.text}>{post.content}</Text>
                ) : (<Spacer />)}

                {post.midia ? (
                    <>
                        <Image  source={{ uri: post.midia }} style={style.image} />
                        <Spacer />
                    </>
                ) : (<Spacer />)}

                <Card.Divider />

                <View style={style.ActionContainer}>
                    <FaviriteIconButton
                        liked={post.liked as boolean}
                        handleLike={() => {
                            post.liked
                                ? unlikePost && unlikePost(post._id)
                                : likePost && likePost(post._id)
                        }} />
                    <Text style={style.ActionItemStyle}>{post.likes.length}</Text>

                    <MaterialIcons
                        name="chat-bubble-outline"
                        size={24}
                        color="black"
                        style={style.ActionItemStyle} />
                    <Text style={style.ActionItemStyle}>{post.comments.length}</Text>
                </View>

            </Card>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    name: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 20,
    },
    title: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 16,
    },
    text: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
    },
    image: {
        resizeMode: "contain",
        width: '100%',
        minHeight: 300,
        maxHeight: 600,
        marginTop: 15,

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