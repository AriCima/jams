/* eslint-disable indent */
import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import StudentNavBar from '../StudentNavBar';
import StudentBoard from './StudentSections/StudentBoard';
import StudentJammers from './StudentSections/StudentJammers'
import StudentMyJam from './StudentSections/StudentMyJam';
import StudentSettings from './StudentSections/StudentSettings';


import './index.css';

const StudentJam = ({ jamId, jamInfo, jamActiveSection } ) => {

    return (

        <div className="student-jam-wrapper">
            <div className="student-jam-header">
                {jamInfo === [] ? <></> : (
                    <StudentNavBar
                        jamName={jamInfo.jamName}
                        jamActiveSection={jamInfo.jamActiveSection}
                        jamType={jamInfo.jamType}
                    />
                )}
            </div>

            <div className="student-jam-container">
                { jamActiveSection === 'board' && (
                    <StudentBoard
                        jamId={jamId}
                        jamInfo={jamInfo}
                    />
                )}

          { (jamActiveSection === 'jammers' || jamActiveSection === 'flatmates') && 
            <StudentJammers 
              jamId={jamId}
              jamInfo={jamInfo}
            />
          }

          { jamActiveSection === 'myJam' && 
            <StudentMyJam 
              jamId={jamId}
              jamInfo={jamInfo}
            />
          }

          { jamActiveSection === 'settings' && 
            <StudentSettings 
              jamId={jamId}
              jamInfo={jamInfo}
            />
          } 
        </div>
        
      </div>

    );
};


const mapStateToProps = state => {
  return { 
    jamInfo: state.jamInfo,
    auth: state.firebase.auth,
    jamActiveSection: state.jamSection
  }
};

export default connect(mapStateToProps) (StudentJam);













