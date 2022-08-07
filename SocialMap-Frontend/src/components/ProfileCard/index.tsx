import React, { memo } from "react";

import Cover from "../../assets/backgroundPerfil";
import { Profile } from "../../Models/Profile"
import Utils from "../../Utils"

import "./index.css";

interface IProps {
  profile: Profile,
  children: JSX.Element,
  resume?: boolean,
}

const ProfileCard = ({ profile, children, resume = false, }: IProps) => {
  return (
    <div className="ProfileCard">

      <div className="ProfileImages">
        <img className='imgCover' src={Cover[Utils.randomNumber(0, Cover.length)]} alt="" />
        <img src={profile.midia} alt="profile" />
      </div>

      {children}

      <div className="ProfileName">
        <span>{Utils.capitalizeFirstLetter(profile.name)}</span>
        <div className="about">
          {profile.about ?
            (resume ? Utils.splitAbout(profile.about) : profile.about)
            : <></>}
        </div>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profile.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profile.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profile.posts.length}</span>
            <span>Posts</span>
          </div>
        </div>
        <hr />
      </div>

    </div>
  );
};

export default memo(ProfileCard);