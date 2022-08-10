import React, { useState } from "react";
import Toast from 'react-native-root-toast';

interface IProp {
    msg: string
    type: string
}

export default function ToastPer({ msg, type }: IProp) {
    const colors = { 'error': 'red', 'success': 'green' }

    return (
        <Toast
            visible={msg ? true : false}
            position={50}
            shadow={true}
            animation={true}
            backgroundColor={colors[type]}
        >{msg}
        </Toast>
    )
}