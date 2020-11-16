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
    userRole,
    setSection,
    jamId,
    setSubSection,
    setDocType,
    setDocId,
    setEditable,
    // jamName,
    jamType,
    currentSection
}) => {

    const [ jamSections, setJamSections ] = useState([]);
    const [ chatInfo, setChatInfo ] = useState({});

    const onsetJamSection = (section) => {
        setSection(section);
        setSubSection('');
        setDocType('none');
        setDocId('');
        setEditable(false);
    };

    useEffect(() => {
        let sections;
        if (jamType === 'chat') {
            DataService.getChatInfo(jamId)
            .then((res) => {
                console.log('res: ', res);
                setChatInfo(res)
            })
        }
        if (userRole === 'Admin') {
            sections = Calculations.getJamAdminSections(jamType);
        } else {
            sections = Calculations.getJamGuestSections(jamType);
        }
        setJamSections(sections);
    }, [jamType, userRole]);

    const renderNavBar = () => {

        return jamSections.map((section, id) => {

            const sectionAactive = section === currentSection;
            return (
                <div
                    className={`jamNavBar-item ${sectionAactive ? 'sectionActive' : ''}`}
                    key={id}
                    onClick={() => onsetJamSection(`${section}`)}
                >
                    {section}
                </div>
            )
                
        });
    };

    return ( 
        <>
            {jamSections === undefined ? <p>NO JAM SELECTED</p> :(
                <>
                    {jamType !== 'chat' ?
                        (

                            <div className="jamNavBar-right">
                                {renderNavBar()}
                            </div>

                        ) : (
                            <div className="jamNavBar-chat">
                                <p>You jammed with <span>Jean Claude VanDam</span> in <span>{chatInfo.jamName}</span></p>
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
    const { userRole } = state.userInfo;
    const { jamName, jamType } = state.jamInfo;
    return { currentSection: section, jamId, subSection, userRole, jamName, jamType }
};

export default connect(mapStateToProps, { setSection, setSubSection, setDocType, setDocId, setEditable })(JamNavBar);
