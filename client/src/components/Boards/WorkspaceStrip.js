import React, { useEffect } from 'react';
import { RiPagesFill, RiSettings3Fill, RiCompassDiscoverFill } from 'react-icons/ri';
import { GiPlanetCore, GiSatelliteCommunication } from 'react-icons/gi';
import {useDispatch, useSelector} from 'react-redux'
import './WorkspaceStrip.css'
import { selectActiveLocation, selectLeftPanelActive, setActiveLocation, setAppStatus } from '../../redux/features/App/AppStatus';
import { message } from 'antd';
import { selectUser, setUserData } from '../../redux/features/User/UserSlice';
import logo from '../../images/landingPage/amurseLogo.png';
import { appMessage, openInNewTab } from '../../helpers/helpers';
import { SiDiscord } from 'react-icons/si';
import { IoMdInformationCircle } from 'react-icons/io';
import {GiChatBubble} from 'react-icons/gi'
import { useHistory } from 'react-router-dom';

const WorkspaceStrip = () => {
    const history = useHistory();
    const activeSpace = useSelector(selectActiveLocation);
    const activeLocation = useSelector(selectActiveLocation);
    const leftPanelActive = useSelector(selectLeftPanelActive)

    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const _leftPanelActive = (location) => {
        let active = false;
        if (location !== 'virtual') active = true;
        dispatch(setAppStatus({leftPanelActive: active}))
    }

    const openDrawer = () => dispatch(setAppStatus({ mobileDrawerActive: true }))
    
    const newLocation = (location) => {
        if (!location) return;
        if (location === 'messages' && !user.address) return appMessage('Connect Wallet')
        dispatch(setActiveLocation({ activeLocation: location }));
        openDrawer();
        _leftPanelActive(location);
    };



    const getSelected = (location) => location === activeSpace;
    const iconClassTop = (location) => `hover stripIcon ${getSelected(location) && (leftPanelActive || getSelected('messages')) && 'blue'}`;


    return <div className='sidePanelLeft'>
        <div className='workspaceFixedContainer'>
            <div className='sidePanelLeftContent workspaceStripContent'>
                <div className='stripContentTop'>
                        <div className='workspaceLogo'><img src={logo} width={20} height={20}></img></div>
                        <RiCompassDiscoverFill className={iconClassTop('spaces')} onClick={() => newLocation('spaces')}/>
                        <RiPagesFill className={iconClassTop('pages')} onClick={() => newLocation('pages')} />
                        <GiChatBubble className={iconClassTop('messages')} onClick={() => newLocation('messages')}/>
                </div>

                <div className='stripContentBottom'>
                    <RiSettings3Fill className='hover stripIcon' onClick={() => appMessage('Coming Soon')}/>
                    <SiDiscord className='stripIcon hover' onClick={() => openInNewTab("https://discord.gg/CwGk9Nzs6u")} />
                    <IoMdInformationCircle className='stripIcon hover' onClick={() => openInNewTab("https://info-153.gitbook.io/amurse/")}/>

                </div>
                
            </div>
      </div>
  </div>;
};

export default WorkspaceStrip;
