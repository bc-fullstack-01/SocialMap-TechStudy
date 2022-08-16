import React, { useContext, useState } from "react";
import Toast from 'react-native-root-toast';
import { Context as AuthContext } from "../context/AuthContext"


export default function ToastAuto() {
    const { alert } = useContext(AuthContext)
    const colors = { 'error': 'red', 'success': 'green' }

    return (
        <Toast
            visible={alert.msg ? true : false}
            position={50}
            shadow={true}
            animation={true}
            backgroundColor={colors[alert.type ? alert.type : 'error']}
        >{alert.msg}
        </Toast>
    )
}