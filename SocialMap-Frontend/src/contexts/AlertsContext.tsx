import React, { createContext, useRef } from "react"


const Base  = {
    'post-new': 0,
    'post-like':0,
    'comment-new':0,
    'follow-new': 0,
}

export const Alerts = createContext<React.MutableRefObject<number> | any>({ current: Base});


export default function AlertsContext({ children }: { children: any }) {
    const countPersistent = useRef(Base);

    return (
        <Alerts.Provider value={{ countPersistent }}>
            {children}
        </Alerts.Provider>
    )
}
