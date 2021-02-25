// COOL STYLE https://codepen.io/egoens/pen/NxejgJ
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments} from '@fortawesome/free-solid-svg-icons'

import Calculations from '../../services/Calculations';
import DataService from '../../services/DataService';
import { setSection, setSubSection } from     "../../../redux/actions/navigateActions";
import { setDocType, setDocId, setEditable } from '../../../redux/actions/docsActions';

import './index.scss';

const JamNavBar = ({
    adminId,
    currentSection,
    adminName,
    jamDesc,
    jamId,
    jammers,
    jamType,
    adminLastName,
    setDocId,
    setDocType,
    setEditable,
    setSection,
    setSubSection,
    userId,
    userRole,
}) => {

    const [ jamSections, setJamSections ] = useState([]);
    const [ chatInfo, setChatInfo ] = useState({});

    const onSetJamSection = (section) => {
        setSection(section);
        setSubSection('');
        setDocType('none');
        setDocId('');
        setEditable(false);
    };

    useEffect(() => {
        let sections;
        // if (jamType === 'chat') {
        //     return (
        //         DataService.getChatInfo(jamId)
        //         .then((res) => {
        //             setChatInfo(res)
        //         })
        //     )
        // }
        if (userRole === 'Admin') {
            sections = Calculations.getJamAdminSections(jamType);
        } else {
            sections = Calculations.getJamGuestSections(jamType);
        }
        setJamSections(sections);
    }, [jamType, userRole]);

    const renderJamNavBar = () => {
        return jamSections.map((section, id) => {

            const sectionActive = section === currentSection;
            return (
                <div
                    className={`jamNavBar-item ${sectionActive ? 'sectionActive' : ''}`}
                    key={id}
                    onClick={() => onSetJamSection(`${section}`)}
                >
                    {section}
                </div>
            )
                
        });
    };

    let interlocutor = '';
    const jammersLodaded = jammers.lemngth > 0
    if ( jamType === 'chat') {
        interlocutor = userId === adminId ? `${ jammersLodaded && jammers[0].firstName} ${jammersLodaded && jammers[0].lastName}` : `${adminName} ${adminLastName}`
    };

    return ( 
        <>
            {jamSections === undefined ? <p>NO JAM SELECTED</p> :(
                <>
                    {jamType !== 'chat' ?
                        (

                            <div className="jamNavBar-right">
                                {renderJamNavBar()}
                            </div>

                        ) : (
                            <div className="jamNavBar-chat">
                                <p>You jammed with <span>{interlocutor}</span> in <span>{jamDesc}</span></p>
                            </div>
                        )
                    }
                </>
            )}
        </>
    );

};

const mapStateToProps = (state) => {

    const { jamId, section, subSection } = state.nav;
    const { userRole, userId, firstName, lastName } = state.userInfo;
    const { jamName, jamType, jamDesc, jammers, adminId, adminName, adminLastName } = state.jamInfo;

    return { adminId, currentSection: section, jamId, subSection, userRole, firstName, lastName, userId, jamName, jamType, jamDesc, jammers, adminName, adminLastName }
};

export default connect(mapStateToProps, { setSection, setSubSection, setDocType, setDocId, setEditable })(JamNavBar);
