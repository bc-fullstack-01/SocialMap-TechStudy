import React, {ReactElement} from "react";
import { View, StyleSheet } from "react-native";

export default function Spacer({children}: {children?: ReactElement}){
    return <View style={styles.spacer}>{children}</View>
}

const styles = StyleSheet.create({
    spacer:{
        marginLeft: 250,
        marginRight: 10,
        marginTop: 10
    }
})