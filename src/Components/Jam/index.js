import React from 'react';
// import { connect } from 'react-redux';

// COMPONENTS
import LandlordJam from './StudentsFlat/LandlordJam';
import StudentJam from './StudentsFlat/StudentJam';


import './index.css';

const Jam = ({ jamId, jamInfo, userId } ) => {
  
  const isAdmin = jamInfo.adminId && jamInfo.adminId === userId;

  return (
    <>
      { isAdmin ?
        <LandlordJam jamId={jamId} jamInfo={jamInfo} />
        :
        <StudentJam jamId={jamId} />
      }
    </>
  );
};

export default Jam;






