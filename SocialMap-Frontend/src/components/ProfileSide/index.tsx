import React, { memo } from 'react'

import ProfileCard from '../ProfileCard'
import { Profile } from "../../Models/Profile"
import { ButtonsPerfilSelf } from "../ButtonsProfile"

import "./index.css"


interface IProps {
  profile: Profile
}

const ProfileSide = ({ profile }: IProps) => {

  return (
    <div className="ProfileSide">
      <ProfileCard profile={profile} resume={true} >
        <><br /><br /></>
      </ProfileCard>
      <br /><br />
      <ButtonsPerfilSelf />
    </div>
  )
}

export default memo(ProfileSide)