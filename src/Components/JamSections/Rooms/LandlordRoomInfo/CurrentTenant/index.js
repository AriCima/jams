import React from 'react';
import moment from 'moment';

// CSS
import './index.css';

const CurrentTenant = ({ currentTenant }) => {

    return (
        <div className="current-tenant-wrapper">

            <div className="current-tenant-header">

                <div className="current-tenant-header-title">
                    <p>Current Tenant</p>
                </div>

                <div className="current-tenant-header-info">
                    <div className="current-tenant-name">
                        <p>{currentTenant.firstName} {currentTenant.lastName}</p>
                    </div>
                    {/* <div className="current-tenant-bookingId">
                        <div className="current-bookingId-field">
                            <p>Booking Ref:</p>
                        </div>
                        <div className="current-bookingId-value" onClick={openBookingForm}>
                            <p>{currentTenant.bookingId}</p>
                        </div>
                    </div> */}
                </div>

            </div>

            <div className="current-tenant-info">

                <div className="current-tenant-personal-info" />

                <div className="current-tenant-info-contract">

                    <div className="current-tenant-info-contract-line">
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Check-In: </p>
                            </div>
                            <div className="contract-line-value">
                                <p>{moment(currentTenant.checkIn).format('DD MMM YYYY')}</p>
                            </div>
                        </div>
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Check-Out: </p>
                            </div>
                            <div className="contract-line-value">
                                <p>{moment(currentTenant.checkOut).format('DD MMM YYYY')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="current-tenant-info-contract-line">
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Rent:</p>
                            </div>
                            <div className="contract-line-value">
                                <p>{currentTenant.rent}</p>
                            </div>
                        </div>
                    </div>

                    <div className="current-tenant-info-contract-line">
                        <div className="contract-line-block">
                            <div className="contract-line-field">
                                <p>Deposit:</p>
                            </div>
                            <div className="contract-line-value">
                                <p>{currentTenant.deposit}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="current-tenant-info-comments">
                    <p>Comments area</p>
                </div>

            </div>

        </div>

    );
};

export default CurrentTenant;
