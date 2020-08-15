// COOL STYLE https://codepen.io/egoens/pen/NxejgJ
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments} from '@fortawesome/free-solid-svg-icons'

import Calculations from '../../services/Calculations';
import { setSection, setSubSection } from     "../../../redux/actions/navigateActions";

import './index.scss';

const LandlordNavBar = ({ setSection, setSubSection, jamName, jamType}) => {

    const [jamSections, setJamSections] = useState([]);

    const onSelectJamSection = (section) => {
        setSection(section);
        setSubSection('');
    };

    useEffect(() => {
        const sections = Calculations.getJamSections(jamType);
        setJamSections(sections);
    }, [jamType, setJamSections]);


    const renderLandlordNavBar = () => {
        return jamSections.map((section, id) => {
            return jamType === 'Chat' ?
                (
                    <div
                        className="jamAdminNavBar-item" 
                        key={id}
                        onClick={() => onSelectJamSection(`${section}`)}
                    >
                        <FontAwesomeIcon className="navBar-icon-style" icon={faComments} />
                    </div>
                ):(
                    <div
                        className="jamAdminNavBar-item"
                        key={id}
                        onClick={() => onSelectJamSection(`${section}`)}
                    >
                        {section}
                    </div>
                );
        });
    };

    return ( 
        <div className="jamAdminNavBar">
            {jamSections === undefined ? <p>NO JAM SELECTED</p> :(
                <>
                    {jamType !== 'chat' ?
                        (
                            <>
                                <div className="jamAdminNavBar-left">
                                    <div className="jamAdminNavBar-jamName"
                                        onClick={() => onSelectJamSection(`Overview`)}
                                    >
                                        <p>{jamName}</p>
                                    </div>
                                </div>
                                <div className="jamAdminNavBar-right">
                                    {renderLandlordNavBar()}
                                </div>
                            </>
                        ) : (
                            <div className="jamAdminNavBar-chat">
                                {renderLandlordNavBar()}
                            </div>
                        )
                    }
                </>
            )}
        </div>
    );

};

const mapStateToProps = (state) => {
    const { section, subSection } = state.nav;
    return {
        section,
        subSection
    }
};

export default connect(mapStateToProps, { setSection, setSubSection })(LandlordNavBar);
