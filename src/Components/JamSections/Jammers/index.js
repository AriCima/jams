/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';

import JammerInfo from './JammerInfo';
import JammersOverview from './JammersOverview';
import InviteJammerForm from '../../Forms/InviteJammerForm';

import './index.scss';

const Jammers = ({ jamId, docType, docId, userRole }) => {

    const renderJammersScreen = () => {
        console.log('userRole: ', userRole);

        if(userRole === 'Admin') {
            switch (docType) {
                case 'TENANT-FORM': // for existing tenants --> edit info
                    return <JammerInfo docId={docId} /> 
                case 'INVITE-TENANT':  // to invite a new tenants --> set info
                    return <InviteJammerForm jamId={jamId} />
                default: 
                    return <JammersOverview jamId={jamId}/>
            }
        } else {
            return <JammersOverview jamId={jamId}/>
        }
    };

    return (
        <div className="jammers">
            {renderJammersScreen()}
        </div>

    );
};


const mapStateToProps = (state) => {
    const { docType , docId } = state.doc;
    const { userRole } = state.userInfo;
    return { docType, docId, userRole }
    
};
export default connect(mapStateToProps, null)(Jammers);