import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './index.css';

const ContractEN = (props) => {

    const {
        jamId,
        userId,
        roomNr,
        jammerInfo,
        landlordTitle,
        landlordName,
        landlordSurname,
        landlordIdNr,
        landlordStreet,
        landlordHouseNr,
        landlordFloor,
        landlordDoor,
        landlordZipCode,
        landlordCity,
        jammerCity,
        jammerCondition,
        jammerCountry,
        jammerDocument,
        jammerDoor,
        jammerFloor,
        jammerHouseNr,
        jammerIdNr,
        jammerName,
        jammerSchool,
        jammerStreet,
        jammerSurname,
        jammerTitle,
        jammerZipCode,
        jammerEmail,
        jammerHomeTel,
        mobile,
        jammerCourse, 
        jammerCompany,
        jamCity,
        jamDivisions,
        jamDoor,
        jamFloor,
        jamHouseNr,
        jamStreet,
        jamStreetType,
        jamZipCode,
        roomBalcony,
        roomLocation,
        roomPrivateBathroom,
        RoomSize
    } = props;

    const apartmentDivisions = {eng: '', esp:''};
    switch (accInfo.totalRooms){
        case '2':
            apartmentDivisions = {eng: 'one half part (1/2)', esp: 'una media parte (1/2'}

    }

    return (
        <div className="contract-wrapper">
            <div className="contract-header">
                <div className="contract-header-title">
                    <h4>LEASING AGREEMENT</h4>
                </div>
                <div className="contract-header-date">
                    <p>In Barcelona, to {jammerInfo.checkIn}</p>
                </div>
                <div className="contract-header-subtitle">
                    <h4>P R E S E N T </h4>
                </div>
            </div>

            <div className="contract-body">
                <div className="contract-body-section-content">
                    <p>From one part,<br/>
                    <span>{landlordTitle} {landlordName} {landlordSurname}</span>, of legal age, with a professional domicile in, 
                    <span>{landlordStreet} {landlordHouseNr} {landlordFloor} {landlordDoor} {landlordZipCode}, {landlordCity}, 
                    provided with DNI nº {landlordIdNr} </span> acting in his own name and interest. Hereinafter the Landlord.<br/>
                    
                    <br/>And the other part,<br/>
                    <span>{jammerTitle} {jammerName} {jammerSurname}</span>, 
                    of legal age, domiciled in 
                    <span>{jammerStreet} {jammerHouseNr} {jammerFloor} {jammerDoor} {jammerZipCode}, {jammerCity} {jammerCountry},</span>
                    provided  <span>{jammerDocument} number {jammerIdNr} </span>, email {jammerEmail}, telephone{jammerHomeTel} and mobile {mobile} aacting in his/her own name and interest.<br/></p>
                    {jammerCondition === 'student' ?
                        (
                            <p>Student of {jammerCourse} in {jammerSchool}.</p>
                        ) 
                        : 
                        (
                            <p>practicing in the company {jammerCompany}.</p>
                        )
                    } 
                    <p>Hereinafter the tenant.<br/>
                    <br/>Both parties recognize the legal capacity necessary for this act, and by mutual agreement</p>
                </div>
                <div className="contract-body-section-title">
                    <br/><br/><h4>S T A T E</h4><br/><br/>
                </div>
                <div className="contract-body-section-content">
                    <p>I.‑ That <span>{landlordTitle} {landlordName} {landlordSurname}</span> is
                     the owner of the apartment located in the {jamFloor} floor,
                     door {jamDoor}, 
                     of the building  located in 
                    {jamStreetType} {jamStreet}, 
                    {jamHouseNr}, 
                    {jamZipCode}, 
                    de {jamCity} <br/>
                    II.-  <span>{jammerTitle} {jammerName} {jammerSurname}</span>  is interested in leasing one {jamDivisions} undivided of the property.
                    III.‑ And both parties being interested in the partial lease of the property indicated in the preceding exhibitions, in accordance with the terms that are subsequently agreed, 
                    sign the present <span>lease agreement</span>, and by mutual agreement establish the following.</p>
                </div>

                <div className="contract-body-section-title">
                    <br/><br/><h4>A G R E E M E N T S</h4><br/><br/>
                </div>
                <div className="contract-body-section-content">
                    <div className="contract-body-section-content-agreements">
                        <p>First.- Object of the lease contract.</p>
                    </div>
                    <p>The purpose of this contract is the transfer of the use of {apartmentDivisions} undivided of the property, 
                    which grants the right of exclusive use of a single room of {roomSize}m2 {roomLocation},</p>
                    {roomBalcony === 'yes' && <p>with balcony</p>}, 
                    <p>and that has</p> 
                    {privateBathroom === 'yes' ? <p>private bathroom, </p> : <p>no private bathroom,</p>}
                    <p>with the right, in addition, to the use of common services and supplies (water, gas, electricity 
                        and internet), and this to be used as housing. The possession of any animal on the leased property 
                        is prohibited.
                    </p>
                    <div className="contract-body-section-content-agreements">
                        <p>Second- Duration of the contract.</p>
                    </div>
                    <p>The term of this contract will be effective from {jammerInfo.checkIn} to {jammerInfo.checkOut}. 
                    Once the agreed term has expired, it may be extended by prior agreement of both parties, although 
                    it must necessarily be documented in writing, understanding that otherwise there is no agreement 
                    with the extension. The duration of the sublease implies that in accordance with the provisions of art. 3.2 of the Urban Leasing Law, 
                    the legal nature of this contract is for use other than housing, although it is the tenant's intention that the 
                    leased property constitutes his habitual residence during the term of the contract.

                    </p>
                    <div className="contract-body-section-content-agreements">
                        <p>Third.- Lease price and rent update.</p>
                    </div>
                    <p>It is agreed by both parties that the price of the lease will be set at the amount of 
                        {roomInfo.rent} EUROS MONTHLY, plus {roomInfo.expenses} EUROS MONTHLY for expenses, for supplies, 
                        IBI fees and Community of Owners, making a total of {roomInfo.TotalRent}, EUROS payable for months 
                        in advance within the first five days of each month.

                        The payment of the rent and assimilated items will be made by the Tenant to the Landlord in the bank account owned by 
                        the tenant and detailed belowe<br/>
                        &nbsp;&nbsp;Bank: {jamInfo.bankName}, <br/>
                        &nbsp;&nbsp;IBAN:  {jamInfo.iban}, <br/>
                        &nbsp;&nbsp;SWIFT: {jamInfo.swiftCode} <br/>
                        the payment must be effective during the first 5 days of each month, the Landlord
                         issuing the corresponding invoice / receipt monthly, and serving the bank document evidencing
                          the performance of the charge as a receipt of said concepts. Both parties agree that in the 
                          event that the lease is terminated by unilateral withdrawal of the Tenant, it must pay the 
                          Landlord for damages and losses the total amount of the agreed rent during the duration of 
                          this lease.  
                    </p>
                </div>
                <div className="contract-body-section-content-agreements">
                    <p>Fourth.- Leasing and ending of the contract.</p>
                </div>
                <p>Both parties agree to a total and absolute prohibition, with the express waiver of the provisions of 
                    art. 32 of the LAU, to sublet, assign or transfer the rights of this contract to third parties. In the 
                    event that the Tenant fails on this obligation, the Landlord may terminate this contract.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Fifth.- Right of preferential acquisition.</p>
                </div>
                <p>The Tenant expressly waives the right of preferential acquisition over the part of the leased property 
                    and the rights of first refusal and retraction, in accordance with the provisions of articles 25, 31 
                    and in concordant of the LAU, as well as the corresponding rights of the rest of the partial leases of 
                    the property.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Sixth.- Physical state of the property:</p>
                </div>
                <p>The Tenant acknowledges receiving the undivided part of the leased property in perfect condition and to his 
                    satisfaction, being therefore of his account the damages and deteriorations that occur therein, as well as 
                    the necessary repairs in order to keep it in a state of function for the agreed use, since it expressly waives 
                    the provisions of article 30 of the LAU, in relation to article 21. Not having the right to the suspension of 
                    the contract or to withdraw from it, nor any compensation, nor to decrease or paralyze the payment of rent. 
                    The Tenant considers the part of the leased property suitable and suitable for the agreed destination that will 
                    be dedicated.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Seventh.- Works on the property object of leasing.</p>
                </div>
                <p>The contractors expressly agree that the execution of any type of works by the Tenant will be prohibited, 
                    both in the leased room for exclusive use and in the elements of common use. The execution by the 
                    Tenant of works not authorized by the Landlord will be cause for termination of this contract.

                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Eighth.- Repairs.</p>
                </div>
                <p>The Tenant, expressly waiving the provisions of article 30 of the LAU, in relation to article 21 of 
                    the same law, is obliged to make all necessary repairs in order to keep it in place state of serving 
                    for the agreed case, in the event that the damages or deteriorations have been caused by their fault 
                    or negligence; and without the right to suspend the contract or withdraw from it during the execution 
                    thereof, nor to any compensation, nor to decrease or paralyze the payment of the rent. The rest of the 
                    works will be paid by the Landlord.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Ninth.- Deposit and guarantees.</p>
                </div>
                <p>The tenant delivers in this act, as a deposit, the sum of  
                     {roomInfo.deposit} EUROS. Both parties agree to the restitution of the same to the Tenant party, 
                     at the time of termination of the contract, after verification of the state in which the property 
                     is located. The amount of 20 EUROS will be deducted as cleaning fee.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Tenth.- Expenses and taxes derived from the property.</p>
                </div>
                <p>The Landlord will be obliged to pay the expenses, charges or responsibilities that are not susceptible 
                    to individualization and that correspond to the leased property or its accessories if it has them, as 
                    well as to the fees for extraordinary expenses of conservation and maintenance of the property. 
                    He will also be obliged to meet the special contributions imposed by the administration. The general 
                    or ordinary expenses for the adequate maintenance of the property, as well as its services and the full 
                    fee of the Property Tax (IBI) that satisfies the property, as well as of any other property that is 
                    serious for the property, shall be borne by the Tenant urban, being payable for anticipated monthly 
                    payments within the first seven days of each month, since they are included in the cost of rent.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Eleventh.- Causes of contract termination.</p>
                </div>
                <p>Without prejudice to the cases of termination of the contract contained in the previous clauses, 
                    this lease will be terminated for the following reasons:<br/>
 
                    a&#41; &nbsp;&nbsp;Failure to pay the rent, expenses and supplies and their updating, as well as 
                    contravening everything that has been agreed for the cleaning and conservation of the leased property, 
                    even with third parties or entities.<br/>
                    b&#41; &nbsp;&nbsp;Failure to pay the deposit and its update.<br/>
                    c&#41; &nbsp;&nbsp;When annoying, unhealthy, harmful, dangerous or illegal activities take place on the property.<br/>
                    d&#41; &nbsp;&nbsp;The non-use or closure of the property for six months or more in the course of a year, even if 
                    said period is not continued.<br/>
                    e&#41; &nbsp;&nbsp;The ruin of the property declared with an administrative file processed in accordance 
                    with the provisions of the Land Law and also the loss or destruction of the property, considering as such 
                    the need to carry out repair works that have a cost equal to or greater than 50% of the value of the 
                    construction without counting the value of the land.<br/>
                    f&#41; &nbsp;&nbsp;The introduction and / or permanence in the room whose exclusive use is attributed or 
                    in the common spaces, of one or more persons outside the property for one or more days, or occupation of a 
                    third-party room without the consent of the tenant who has the right for exclusive use. <br/>
                    The Tenant shall not be entitled to compensation of any kind to the termination of the contract, expressly waiving the 
                    rights conferred by art. 34 of the LAU.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Tenth second.- Other obligations of the Tenant:</p>
                </div>
                <p>
                    a&#41; &nbsp;&nbsp; Not to install transmissions, engines, machines, etc., that produce vibrations or 
                    annoying noises for the other occupants of the property or the adjoining ones of the property, 
                    or that can affect the consistency, solidity or conservation of the property.
                    b&#41; &nbsp;&nbsp;	To not store, manipulate explosive, flammable, uncomfortable or unhealthy materials 
                    on the property, and always observe the provisions in force.
                    ca&#41; &nbsp;&nbsp;To allow access to the property, to the owner, administrator and to the operators 
                    or industrialists sent by any of both, for the realization, inspection and verification of any 
                    kind of works or repairs that affect real estate.
                    da&#41; &nbsp;&nbsp;To comply at all times with the regulated statutory regulations and the agreements 
                    that the community of owners has established or founded, in order to use the services, common elements 
                    and a good coexistence regime.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Thirteenth.- transfer of personal data: </p>
                </div>
                <p>The Tenant party authorizes the Landlord so that it can transfer the personal data contained in this 
                    contract to third parties or legal entities so that they offer the Tenant services performed with the 
                    estate and that they can collect from them the information related to the fulfillment or breach of what 
                    corresponds to the Tenant for the proper maintenance of the leased property and that may affect the other 
                    occupants of the property.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Fourteenth.- Notifications and judicial submission.</p>
                </div>
                <p>For the purpose of receiving any notification related to the rights and obligations arising from 
                    this contract, as well as for the purposes of placement or subpoena, the Landlord's address is 
                    designated as the domicile of the parties, which is indicated in the heading of this document and 
                    for the tenant of the leased property. For any difference in the interpretation and execution of this 
                    contract, the parties submit to the Courts and Tribunals of the city of Barcelona, waiving their own 
                    jurisdiction, if it exists. And in proof of conformity with the content of each and every one of these 
                    clauses, the concurring parties sign this contract, in duplicate and for all purposes, in the city and 
                    date indicated above.
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userJams: state.userJams,
        jamId: state.jamId,
        jamInfo: state.jamInfo,
        auth: state.firebase.auth,
    };
};

export default connect(mapStateToProps)(ContractEN);

