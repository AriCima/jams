import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordJam from './StudentsFlat/LandlordJam';
import StudentJam from './StudentsFlat/StudentJam';


import './index.css';

const Jam = ({ jamId, jamInfo, auth } ) => {

    const isAdmin = jamInfo.adminId && jamInfo.adminId === auth.uid;

    return (
        <div className="jam-wrapper">
            { isAdmin ?
                <LandlordJam jamId={jamId} jamInfo={jamInfo} />
                :
                <StudentJam jamId={jamId} />
            }
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

export default connect(mapStateToProps)(Jam);






