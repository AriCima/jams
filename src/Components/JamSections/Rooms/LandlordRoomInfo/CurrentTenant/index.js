import React from 'react';
import { connect } from 'react-redux';

import JammerContractInfo from '../../../../Reusables/JammerContractInfo';
import StartChatButton from '../../../../UI/Buttons/StartChatButton';
import { setDocType, setDocId, setEditable } from "../../../../../redux/actions/docsActions";
import { setSection } from '../../../../../redux/actions/navigateActions';

// CSS
import './index.scss';

const CurrentTenant = ({
    jamName,
    docId,
    userId,
    firstName,
    lastName,
    currentTenant,
    setDocType,
    setSection,
    setDocId,
    setEditable,
}) => {
        const takeMeToTenantInfo = (e) => {
        e.preventDefault();
        setSection('Tenants')
        setDocType('TENANT-FORM');
        setDocId(currentTenant.userId); // tenant's userId
        setEditable('false');
    }

    return (
        <div className="current-tenant-wrapper">

            <div className="current-tenant-header">
                <h4>Current Tenant</h4>
                <div className="current-tenant-name"
                    onClick={(e)  => {takeMeToTenantInfo(e)}}
                >
                    <p>{currentTenant[0].firstName} {currentTenant[0].lastName}</p>
                    
                </div>

                <div className="start-chatButton">
                    <StartChatButton 
                        user1Name={firstName}
                        user1LastName={lastName}
                        user1Id={userId}
                        user2Name={currentTenant[0].firstName}
                        user2LastName={currentTenant[0].lastName}
                        user2Id={docId}
                        jamName={jamName}
                    />
                </div>


            </div>

            <JammerContractInfo contractInfo={currentTenant} showRoomNr={false}/>

        </div>

    );
};

const mapStateToProps = (state) => {
    const { userId, firstName, lastName } = state.userInfo;
    const { jamName } = state.jamInfo;
    const { docId } = state.doc;

    return { jamName, userId, firstName, lastName, docId }
    
};
export default connect(mapStateToProps, { setDocType, setSection, setDocId, setEditable })(CurrentTenant);