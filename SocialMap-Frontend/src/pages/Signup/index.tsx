import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import server from '../../api/server'

import HomeLauch from '../../components/LoginAndRegister/HomeLauch'
import RegisterForm from '../../components/LoginAndRegister/RegisterForm'

import logo from '../../assets/logoAlert.png';



const Signup = () => {
  const navigate = useNavigate()

  const handleRegister = async (name: string, user: string, password: string) => {

    try {
      await server.post('/unsecurity/register', {
        name: name,
        user: user,
        password: password
      })
      toast.success('Conta criada!', {
        icon: () => <img src={logo} alt="logo SocialMap" />,
      });
      navigate('/')

    } catch (err) {
      toast.warning('Não foi possível criar o usuário!', {
        icon: () => <img src={logo} alt="logo SocialMap" />,
      });
    }
  }

  return (
    <HomeLauch>
      <RegisterForm onSubmitForm={handleRegister} onRouteLink={'/'} />
    </ HomeLauch>
  );
}


export default Signup