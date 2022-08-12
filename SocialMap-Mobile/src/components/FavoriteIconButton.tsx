import React from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import CustomIconButton from './CustomIconButton';

interface Props {
    handleLike: () => void;
    liked: boolean;
}

export default function FaviriteIconButton({ liked, handleLike }: Props) {

    return (
        <CustomIconButton handleOnPress={handleLike}>
            {liked ? (
                <MaterialIcons name="favorite" size={24} color="red" style={style.ActionItemStyle} />
            ) : (
                <MaterialIcons name="favorite-border" size={24} style={style.ActionItemStyle} />
            )}
        </CustomIconButton>
    )
}

const style = StyleSheet.create({
    ActionItemStyle: {

    }
});