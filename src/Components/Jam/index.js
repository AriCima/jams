import React from 'react';
import { connect } from 'react-redux';

import JamNavBar from '../NavBars/LandlordNavBar';
import Overview from '../JamSections/Overview';
import Board from '../JamSections/Board';
import Rooms from '../JamSections/Rooms';
import Jammers from '../JamSections/Jammers';
import Settings from '../JamSections/Settings';

import './index.scss';
const Jam = ({ jamId, section } ) => {

  const renderSection = (section) => {
      switch (section) {
          case 'Overview':
              return <Overview jamId={jamId} />;
          case 'Board':
              return <Board jamId={jamId} />;
          case 'Rooms':
              return <Rooms jamId={jamId} />;
          case 'Tenants':
              return <Jammers jamId={jamId} />;
          case 'Settings':
              return <Settings jamId={jamId} />;
          case 'rent':
          default:
              return ;
      }
  };

  return (
      <div className="jam-wrapper">
          <div className="jam-navBar">
              <JamNavBar/>
          </div>

          <div className="jam-body">
              {renderSection(section)}
          </div>
      </div>
  );
};



const mapStateToProps = state => {
  const { jamId, section } = state.nav;
  return { jamId, section };
};

export default connect(mapStateToProps)(Jam);





