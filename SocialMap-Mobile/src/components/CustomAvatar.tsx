import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "@rneui/base";

import { navigate } from '../../RootNavigation';
import Utils from '../Utils'

interface Props {
    name: string
    id?: string
    midia?: string
    size?: string | number
    style?: any
}

export default function CustomAvatar({ id, name, midia, style = {}, size = 'small' }: Props) {
    if (midia) {
        return (
            <Avatar
                size={size}
                source={{ uri: midia }}
                rounded
                onPress={() => navigate('Profile', { id: id })}
                containerStyle={{ ...style.AvatarStyle, ...style }}
            />
        )
    } else {
        const initials = Utils.getFistsNames(name, 2).toUpperCase()

        return (
            <Avatar
                size={size}
                rounded
                title={initials}
                onPress={() => navigate('Profile', { id: id })}
                containerStyle={{ ...style.AvatarStyle, ...style }}
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