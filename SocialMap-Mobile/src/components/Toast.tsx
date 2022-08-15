import React, { useEffect, useState } from "react";
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

export function ToastAuto({ msg, type }: IProp) {
    const [state, setState] = useState(false)
    const colors = { 'error': 'red', 'success': 'green' }

    useEffect(() => {
        setState(true)
        setTimeout(() => {
            setState(false)
        }, 2500)
    }, [])

    return (
        <Toast
            visible={state}
            position={50}
            shadow={true}
            animation={true}
            backgroundColor={colors[type]}
        >{msg}
        </Toast>
    )
}