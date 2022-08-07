import React, { useState } from 'react'
import { CircularProgress, TextField } from '@mui/material';
import { Link } from 'react-router-dom'


import "./FormLogin.css";


interface Props {
    onSubmitForm: any;
    onRouteLink: string;
}

const FormLogin = ({ onSubmitForm, onRouteLink }: Props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [user, setUser] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFetching(true)
        onSubmitForm(user.value, password.value)
        setIsFetching(false)
    }

    return (<>
        <form className="loginBoxLogin" onSubmit={handleSubmit}>
            <TextField variant="outlined"
                label="Usuário"
                name='user'
                value={user.value}
                onChange={(e) => setUser({ value: e.target.value, error: "" })}>
            </TextField>
            <TextField
                variant="outlined"
                label="Senha"
                type="password"
                value={password.value} onChange={(e) => setPassword({ value: e.target.value, error: "" })}>
            </TextField>
            <button className="loginButton" type="submit" disabled={isFetching}>
                {isFetching ? (<CircularProgress size="20px" />) : ("Logar")}
            </button>
            <Link to={onRouteLink} className="linkButton">
                <button className="loginRegisterButton">
                    {isFetching ? (
                        <CircularProgress size="20px" />
                    ) : (
                        "Criar uma nova conta!"
                    )}
                </button>
            </Link>
        </form>
    </>
    );
}

export default FormLogin;