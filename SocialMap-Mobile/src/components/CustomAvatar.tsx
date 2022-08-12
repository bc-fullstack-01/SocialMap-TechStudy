import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "@rneui/base";

import Utils from '../Utils'

interface Props {
    name: string
    midia?: string
    link?: any
}

export default function CustomAvatar({ name, midia, link }: Props) {
    if (midia) {
        return (
            <Avatar
                size="small"
                source={{ uri: midia }}
                rounded
                onPress={() => console.log("Works!")}
                containerStyle={style.AvatarStyle}

            />
        )
    } else {
        const initials = Utils.getFistsNames(name, 2).toUpperCase()

        return (
            <Avatar
                size="small"
                rounded
                title={initials}
                containerStyle={style.AvatarStyle}
            />
        )
    }
}

const style = StyleSheet.create({
    AvatarStyle: {
        backgroundColor: "red",
        marginRight: 0,
    }
})