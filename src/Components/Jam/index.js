import React from 'react';
// import { connect } from 'react-redux';

// COMPONENTS
import LandlordJam from './StudentsFlat/LandlordJam';
import StudentJam from './StudentsFlat/StudentJam';


import './index.css';

const Jam = ({ jamId, jamInfo, userId } ) => {
  console.log('jamInfo: ', jamInfo);
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


// const mapStateToProps = state => {
//   return { 
//     jamInfo: state.jamInfo,
//     auth: state.firebase.auth,
//     jamActiveSection: state.jamSection
//   }
// };

// export default connect(mapStateToProps)(Jam);
export default Jam;






