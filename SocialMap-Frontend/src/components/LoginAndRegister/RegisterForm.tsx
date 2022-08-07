import React, { useState } from 'react'
import { CircularProgress, TextField } from '@mui/material';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import logo from '../../assets/logoAlert.png';
import "./RegisterForm.css";


interface Props {
    onSubmitForm: any;
    onRouteLink: string;
}

const defaultValue = {
    value: "",
    error: ""
}

const FormRegister = ({ onSubmitForm, onRouteLink }: Props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [name, setName] = useState(defaultValue);
    const [user, setUser] = useState(defaultValue);
    const [password, setPassword] = useState(defaultValue);
    const [password2, setPassword2] = useState(defaultValue);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFetching(true)
        if (password.value === password2.value) {
            onSubmitForm(name.value, user.value, password.value)
            setIsFetching(false)
        } else {
            toast.warning("Senhas não correspondem!", {
                icon: () => <img src={logo} alt="logo SocialMap" />,
            });
            setIsFetching(false)
            setPassword2({ value: "", error: "" })
            setPassword({ value: "", error: "" })
        }
    }
    return (<>
        <form className="loginBoxRegister" onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                label="Nome"
                type="text"
                value={name.value} onChange={(e) => setName({ value: e.target.value, error: "" })}>
            </TextField>
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
            <TextField
                variant="outlined"
                label="Confirmar senha"
                type="password"
                value={password2.value} onChange={(e) => setPassword2({ value: e.target.value, error: "" })}>
            </TextField>

            <button className="loginButton" type="submit" disabled={isFetching}>
                {isFetching ? (<CircularProgress size="20px" />) : ("Registrar")}
            </button>

            <Link to={onRouteLink} className="linkButton" >
                Já é resgistrado? Logar!
            </Link>
        </form>
    </>
    );
}

export default FormRegister;