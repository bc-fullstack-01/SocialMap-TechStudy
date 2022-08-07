import React, { memo } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReorderIcon from '@mui/icons-material/Reorder';
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";

import CustomIconButton from "../CustomIconButton";
import ReceiveAlert from "../ReceiveAlert"
import SearchBar from '../SearchBar'

import './index.css'

interface IProps {
    handleSearch?: any;
}


const CustomAppBar = ({ handleSearch }: IProps) => {
    const navigate = useNavigate();

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        var headers = Array.from(
            document.getElementsByClassName('navbarHeader') as HTMLCollectionOf<HTMLElement>,
        );
        if (prevScrollpos > currentScrollPos) {
            headers[0].style.top = "0";
        } else {
            headers[0].style.top = "-60px";
        }
        prevScrollpos = currentScrollPos;
    }

    return (
        <>
            <div className='navbarHeader'>
                <Link className='headerTitle' to='/home'>SocialMap</Link>

                {handleSearch ?
                    <SearchBar placeholder='Pesquise por posts' handleSearch={handleSearch} />
                    :
                    <></>
                }
                <ReceiveAlert />
                <div className='headerIcons'>
                    <CustomIconButton label="Show Edit" onCLickCallback={() => navigate('/post/create')} >
                        <EditIcon />
                    </CustomIconButton>

                    <CustomIconButton label="Show Profiles" onCLickCallback={() => navigate('/profiles')} >
                        <GroupIcon />
                    </CustomIconButton>

                    <CustomIconButton
                        label="Show Profile"
                        onCLickCallback={() => navigate(`/profile`)}
                    >
                        <AccountCircleIcon />
                    </CustomIconButton>
                </div>

                <li className="dropdown">
                    <div className="dropbtn">{<ReorderIcon />}</div>
                    <div className="dropdown-content">
                        <CustomIconButton
                            label="Show Edit"
                            onCLickCallback={() => navigate('/create')}
                        >
                            <EditIcon />
                        </CustomIconButton>
                        <CustomIconButton
                            label="Show Profiles"
                            onCLickCallback={() => navigate('/profiles')}
                        >
                            <GroupIcon />
                        </CustomIconButton>

                        <CustomIconButton
                            label="Show Profile"
                            onCLickCallback={() => navigate(`/profile`)}
                        >
                            <AccountCircleIcon />
                        </CustomIconButton>
                    </div>
                </li>

            </div>
            <div style={{ height: '60px' }} />
        </>
    )
}

export default memo(CustomAppBar);