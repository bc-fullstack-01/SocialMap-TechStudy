import React, { ReactElement } from "react";
import { TouchableOpacity } from "react-native";

interface Props {
    children: ReactElement;
    handleOnPress: () => void;
}

export default function CustomIconButton({ children, handleOnPress }: Props) {

    return (
        <TouchableOpacity onPress={handleOnPress}>
            {children}
        </TouchableOpacity>
    )
}