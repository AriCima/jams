import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import LandlordJam from './StudentsFlat/LandlordJam';
import StudentJam from './StudentsFlat/StudentJam';


import './index.css';

const Jam = ({ jamId, jamInfo, userRole} ) => {
  return (
    <>
      { userRole === 'Admin' ?
        <LandlordJam jamId={jamId} jamInfo={jamInfo} />
        :
        <StudentJam jamId={jamId} />
      }
    </>
  );
};

const mapStateToProps = state => {
  const { userRole  } = state.userInfo;
  return {
      userRole
  };
};

export default connect(mapStateToProps, null)(Jam);






