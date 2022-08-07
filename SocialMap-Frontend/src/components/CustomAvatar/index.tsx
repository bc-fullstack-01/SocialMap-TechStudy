import React from "react";
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';


interface IProps {
  name: string;
  profile_id: string;
  midia?: string;

}

const CustomAvatar = ({ name, profile_id, midia = '' }: IProps) => {
  const navigate = useNavigate();

  const getInitials = (name: string) =>
    name.split(" ")
      .slice(0, 2)
      .map((name) => name[0])
    ;
  if (midia) {
    return (
      <div onClick={() => navigate(`/profile/${profile_id}`)}>
        <Avatar alt="perfil image" src={midia} />
      </div>
    )

  } else {
    return (
      <div onClick={() => navigate(`/profile/${profile_id}`)}>
        <Avatar sx={{ bgcolor: "red" }} arial-label={name}>
          {getInitials(name)}
        </Avatar>
      </div>

    );
  }
}


export default CustomAvatar;