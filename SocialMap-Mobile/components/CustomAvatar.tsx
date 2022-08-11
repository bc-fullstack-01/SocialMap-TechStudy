import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "@rneui/base";

interface Props {
    name: string
}

export default function CustomAvatar({ name }: Props) {
    const initials = name.split(" ").slice(0, 2).map((name) => name[0]).join().replace(",", "");

    return (
        <Avatar
            size="small"
            rounded
            title={initials}
            containerStyle={style.AvatarStyle}
        />
    )
}

const style = StyleSheet.create({
    AvatarStyle: {
        backgroundColor: "red",
    }
})