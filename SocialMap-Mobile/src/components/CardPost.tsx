import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "@rneui/base";
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from "@rneui/base";

import Spacer from "./Spacer";
import ToastPer from './Toast'
import { Post } from '../models/Post'

import CustomAvatar from "../components/CustomAvatar";
import FaviriteIconButton from "../components/FavoriteIconButton";
import Utils from '../Utils'



interface IProps {
    post: Post;
}

export default function CardPost({ post }: IProps) {
    return (
        <TouchableOpacity>

            <Card>
                <View style={style.header}>
                    <CustomAvatar name={post.profile.name} midia={post.profile.midia} />
                    <Text style={style.name}>{Utils.capitalizeFirstLetter(post.profile.name)}</Text>
                </View>

                <Text style={style.title}>{post.title}</Text>

                {post.content ? (
                        <Text style={style.text}>{post.content}</Text>
                ) : (<Spacer />)}

                {post.midia ? (
                    <>
                        <Card.Image source={{ uri: post.midia }} style={style.image} />
                        <Spacer />
                    </>
                ) : (<Spacer />)}

                <Card.Divider />

                <View style={style.ActionContainer}>
                    <FaviriteIconButton liked={false} handleLike={() => { }} />
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
        fontSize: 17,
    },
    text: {
        fontSize: 13,
        marginLeft: 10,
        marginTop: 10,
    },
    image: {
        resizeMode: "contain",
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