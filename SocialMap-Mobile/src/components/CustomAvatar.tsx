import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "@rneui/base";

import Utils from '../Utils'

interface Props {
    name: string
    midia?: string
    link?: any
    size?: string | number
    style?: any
}

export default function CustomAvatar({ name, midia, link, style={}, size='small' }: Props) {
    if (midia) {
        return (
            <Avatar
                size={size}
                source={{ uri: midia }}
                rounded
                onPress={() => console.log("Works!")}
                containerStyle={{...style.AvatarStyle, ...style}}

            />
        )
    } else {
        const initials = Utils.getFistsNames(name, 2).toUpperCase()

        return (
            <Avatar
                size={size}
                rounded
                title={initials}
                containerStyle={{...style.AvatarStyle, ...style}}
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