import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "@rneui/base";

import { navigate } from '../../RootNavigation';
import Utils from '../Utils'

interface IProps {
    name: string
    id?: string
    midia?: string
    style?: any
    size?: string | number
    onPress?: any | boolean
}

export default function CustomAvatar({ id, name, midia, style = {}, size = 'small', onPress = false }: IProps) {

    function goToProfile() {
        navigate('Profile', { id: id })
    }

    if (midia) {
        return (
            <Avatar
                size={size}
                source={{ uri: midia }}
                rounded
                onPress={onPress ? onPress : goToProfile}
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
                onPress={onPress ? onPress : goToProfile}
                containerStyle={{ ...styles.AvatarStyle, ...style }}
            />

        )
    }
}

const styles = StyleSheet.create({
    AvatarStyle: {
        backgroundColor: "red",
        marginRight: 0,
    }
})