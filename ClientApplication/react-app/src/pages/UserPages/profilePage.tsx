import React from 'react';
import '../../styles/Articles/createArticleStyle.css';
import { Profile } from '../../.components/.MainComponentsExport';

import { useTranslation } from 'react-i18next'; 

const ProfilePage = ({ loggedInUser }) => {

    const { t } = useTranslation();

    return (
        <>
            <div className="category-home-page">
                <h2>Profile</h2> 
            </div>

            <div className='mainContainer' style={{ backgroundColor: "red !important"}}>
                <Profile loggedInUser={loggedInUser} />
            </div>
        </>
    )
}

export default ProfilePage;