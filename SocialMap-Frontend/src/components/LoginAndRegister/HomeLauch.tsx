import React from 'react'

import "./HomeLauch.css";

type Props = {
    children: JSX.Element,
};

const HomeLauch = ({ children }: Props) => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialMap</h3>
                    <span className="loginDesc">
                        A melhor comunidade de desenvolvedores!
                    </span>
                    <span className="loginDescName">
                        By: Edno Almeida
                    </span>
                </div>
                <div className="loginRight">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default HomeLauch;