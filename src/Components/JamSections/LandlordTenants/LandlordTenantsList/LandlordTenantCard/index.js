import React from "react";

import "./index.scss";

const LandlordTenantCard = ({ tL }) => {

  return (

    <div className="landlord-tenant-wrapper">
      <div className="landlord-tenant-picture">

      </div>
      <div className="landlord-tenant-info">
        <div className="landlord-tenant-info-name">
          <p>{tL.jammerName} - </p> <p>{tL.jammerCountry}</p>
        </div>
        <div className="landlord-tenant-info-name">

        </div>
      </div>
    </div>
  )
  
}

export default LandlordTenantCard;
