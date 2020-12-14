import React from 'react';
import { connect } from 'react-redux';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import './index.scss';
    
const ContractEN = ({
    date,
    landlordTitle,
    landlordName,
    landlordLastName,
    landlordAddress,
    landlordZipCode,
    landlordCity,
    landlordCountry,
    landlordDocType,
    landlordDocNr,
    tenantName,
    tenantLastName,
    tenantAddress,
    tenantZipCode,
    tenantCity,
    tenantCountry,
    tenantDocType,
    tenantDocNr,
    tenantEmail,
    jamAddress,
    jamZipCode,
    jamCity,
    jamCountry,
    apartmentDivisions,
    roomType,
    sqm,
    exterior,
    balcony,
    privateBath,
    checkIn,
    checkOut,
    rent,
    expenses,
    deposit,
}) => {
 
    return(

        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ Lease contract ~
                </Text>
                {/* <Text style={styles.title}>
                    Lease contract
                </Text> */}
                <Text style={styles.text}>
                    In Barcelona on, {date}
                </Text>
                <Text style={styles.title}>
                    Present
                </Text>
                <Text render={({landlordTitle, landlordName, landlordLastName, landlordAddress, landlordZipCode, landlordCity, landlordCountry, landlordDocType, landlordDocNr }) => (
                    `From one part,            
                    ${landlordTitle landlordName landlordLastName}, of legal age, with a professional domicile in, 
                    ${landlordAddress landlordZipCode landlordCity} - ${landlordCountry}, provided with 
                    {landlordDocType} nº {landlordDocNr}, acting in his own name and interest. 
                    Hereinafter the Landlord.`
                )} />
                <Text render={({tenantName, tenantLastName, tenantAddress, tenantZipCode, tenantCity, tenantCountry, tenantDocType, tenantDocNr, tenantEmail }) => (
                    `And the other part,  
                    ${tenantName tenantLastName}, of legal age, domiciled in ${tenantAddress tenantZipCode} 
                    ${tenantCity} - ${tenantCountry}, provided ${tenantDocType} nº ${tenantDocNr}, 
                    ${tenantEmail} acting in his/her own name and interest.
                    Hereinafter the tenant.`
                )} />
                <Text>
                    Both parties recognize the legal capacity necessary for this act, and by mutual agreement.
                </Text>
                <Text style={styles.title}>
                    S T A T E
                </Text>
                <Text render={({landlordTitle,landlordName, landlordLastName, jamAddress, jamZipCode, jamCity, jamCountry }) => (
                    `I.‑ ${landlordTitle landlordName landlordLastName} is the owner of the apartment located in
                    ${jamAddress jamZipCode jamCity} - ${jamCountry}.
                    II.- {tenantName} {tenantLastName} is interested in leasing {apartmentDivisions} undivided of the property.
                    III.‑ And both parties being interested in the partial lease of the property indicated in the preceding exhibitions, 
                    in accordance with the terms that are subsequently agreed, sign the present lease agreement, and by mutual agreement establish the following
                    `
                )}/>
                    
                <Text style={styles.title}>
                    AGREEMENTS
                </Text>
                <Text style={styles.subTitle}>
                    First.- Object of the lease contract.
                </Text>
                <Text render={({apartmentDivisions, roomType, sqm, exterior, privateBath, balcony}) => (
                    `The purpose of this contract is the transfer of the use of ${apartmentDivisions} undivided 
                    of the property, which grants the right of exclusive use of a ${roomType === 'single' ? 'single room' : 'doulb room'}, of ${sqm} m2, ${exterior ? 'exterior' : 'interior'}, ${balcony && 'with balcony'}, 
                    and that ${privateBath ? 'with private bathroom' : 'without private bathroom'} private bathroom, with the right, in addition, to the use of common services and supplies
                    (water, gas, electricity and internet), and this to be used as housing.
                    The possession of any animal on the leased farm is prohibited.`
                )}/>
                <Text style={styles.subTitle}>
                    Second- Duration of the contract.
                </Text>
                <Text render={({checkIn, checkOut}) => {
                    `The term of this contract will be effective from ${checkIn} to ${checkOut}. 
                    Once the agreed term has expired, it may be extended by prior agreement of both parties, 
                    although it must necessarily be documented in writing, understanding that otherwise there is 
                    no agreement with the extension.
                    The duration of the sublease implies that in accordance with the provisions of art. 3.2 of the Urban Leasing Law, 
                    the legal nature of this contract is for use other than housing, although it is the tenant's 
                    intention that the leased property constitutes his habitual residence during the term of the contract.`
                }}/>
                <Text style={styles.subTitle}>
                    Third.- Lease price and rent update.
                </Text>
                <Text render={({rent, expenses, totalRent}) => {
                    `It is agreed by both parties that the price of the lease will be set at the amount of € ${rent}.- EUROS MONTHLY, plus € ${expenses}.- EUROS MONTHLY for expenses, 
                    for supplies, IBI fees and Community of Owners, making a total of € ${totalRent}.- EUROS MONTHLY payable for months in advance within the first five days of each month.
                    The payment of the rent and assimilated items will be made by the Tenant to the Landlord in the bank account owned by the tenant opened in the following bank account`
                }} />
                <Text style={styles.boldText}>
                    ENTITY:  BBVA.
                    IBAN:  ES76 0182 8740 8302 0208 2108.
                    SWIFT: BBVAESMMXXX.
                </Text>
                <Text>
                    during the first 5 days of each month, the Landlord issuing the corresponding invoice / receipt monthly, and serving the bank document evidencing the performance of the charge as a receipt of said concepts.
                    Both parties agree that in the event that the lease is terminated by unilateral withdrawal of the Tenant, it must pay the Landlord for damages and losses the total amount of the agreed rent during the duration of this lease.
                </Text>
                <Text style={styles.subTitle}>
                    Fourth.- Leasing and ending of the contract.
                </Text>
                <Text>
                    Both parties agree to a total and absolute prohibition, with the express waiver of the provisions of art. 32 of the LAU, to sublet, assign or transfer the rights of this contract to third parties.
                    In the event that the Tenant fails on this obligation, the Landlord may terminate this contract.
                </Text>
                <Text style={styles.subTitle}>
                    Fifth.- Right of preferential acquisition.
                </Text>
                <Text>
                    The Tenant expressly waives the right of preferential acquisition over the part of the leased property and the 
                    rights of first refusal and retraction, in accordance with the provisions of articles 25, 31 and in concordant of the LAU, 
                    as well as the corresponding rights of the rest of the partial leases of the farm.
                </Text>
                <Text style={styles.subTitle}>
                    Sixth.- Physical state of the apartment:
                </Text>
                <Text>
                    The Tenant acknowledges receiving the undivided part of the leased property in perfect condition and to his satisfaction, 
                    being therefore of his account the damages and deteriorations that occur therein, as well as the necessary repairs in order to 
                    keep it in a state of function for the agreed use, since it expressly waives the provisions of article 30 of the LAU, in relation to article 21. 
                    Not having the right to the suspension of the contract or to withdraw from it, nor any compensation, nor to decrease or paralyze the payment of rent.
                    The Tenant considers the part of the leased property suitable and suitable for the agreed destination that will be dedicated.
                </Text>
                <Text style={styles.subTitle}>
                    Seventh.- Works on the Farm object of leasing.
                </Text>
                <Text>
                    The contractors expressly agree that the execution of any type of works by the Tenant will be prohibited, both in the leased room for exclusive use and in the elements of common use.
                    The execution by the Tenant of works not authorized by the Landlord will be cause for termination of this contract.
                </Text>
                <Text style={styles.subTitle}>
                    Eighth.- Repairs.
                </Text>
                <Text>
                    The Tenant, expressly waiving the provisions of article 30 of the LAU, in relation to article 21 of the same law, is obliged to make all necessary 
                    repairs in order to keep it in place state of serving for the agreed case, in the event that the damages or deteriorations have been caused by their fault or negligence; 
                    and without the right to suspend the contract or withdraw from it during the execution thereof, nor to any compensation, nor to decrease or paralyze the payment of the rent. 
                    The rest of the works will be paid by the Landlord.
                </Text>
                <Text style={styles.subTitle}>
                    Ninth.- Deposit and guarantees.
                </Text>
                <Text redner={({deposit}) => (
                    `The tenant delivers in this act, as a deposit, the sum of ${deposit} EUROS.
                    Both parties agree to the full restitution of the same to the Tenant party, 
                    at the time of termination of the contract, after verification of the state in which the property is located. 
                    The landlord will deduct 20€ as room cleaning fee.The deposit will be refunded by bank transfer, for which the tenant will inform the landlord the bank details. 
                    In the event that the account indicated by the tenant does not belong to the EU (European Union), all costs and commissions originated in this operation will be paid by the the tenant.`
                )} />

                <Text style={styles.subTitle}>
                    Tenth.- Expenses and taxes derived from the property.
                </Text>
                <Text>
                    The Landlord will be obliged to pay the expenses, charges or responsibilities that are not susceptible to individualization and that correspond to the leased property or its accessories if it has them, 
                    as well as to the fees for extraordinary expenses of conservation and maintenance of the property.
                    He will also be obliged to meet the special contributions imposed by the administration.
                    The general or ordinary expenses for the adequate maintenance of the property, as well as its services and the full fee of the 
                    Property Tax (IBI) that satisfies the property, as well as of any other property that is serious for the property, shall be borne by the Tenant urban, 
                    being payable for anticipated monthly payments within the first seven days of each month, since they are included in the cost of rent.
                </Text>
                <Text style={styles.subTitle}>
                    Eleventh.- Causes of contract termination.
                </Text>
                <Text>
                    Without prejudice to the cases of termination of the contract contained in the previous clauses, this lease will be terminated for the following reasons:
                    - Failure to pay the rent, expenses and supplies and their updating, as well as contravening everything that has been agreed for the cleaning and conservation of the leased property, even with third parties or entities.
                    - Failure to pay the deposit and its update.
                    - When annoying, unhealthy, harmful, dangerous or illegal activities take place on the farm.
                    - The non-use or closure of the property for six months or more in the course of a year, even if said period is not continued.
                    - The ruin of the property declared with an administrative file processed in accordance with the provisions of the Land Law and also the loss or destruction of the property, considering as such the need to carry out repair works that have a cost equal to or greater than 50% of the value of the construction without counting the value of the land.
                    - The introduction and / or permanence in the room whose exclusive use is attributed or in the common spaces, of one or more persons outside the property for one or more days, or occupation of a third-party room without the consent of the tenant who has the right for exclusive use.
                    The Tenant shall not be entitled to compensation of any kind to the termination of the contract, expressly waiving the rights conferred by art. 34 of the LAU.
                </Text>
                <Text style={styles.subTitle}>
                    Tenth second.- Other obligations of the Tenant:
                </Text>
                <Text>
                    In addition to the obligations that have been related in the preceding paragraphs of this lease, the Tenant undertakes the following:
                    - Not to install transmissions, engines, machines, etc., that produce vibrations or annoying noises for the other occupants of the property or the adjoining ones of the property, or that can affect the consistency, solidity or conservation of the property
                    - To not store, manipulate explosive, flammable, uncomfortable or unhealthy materials on the farm, and always observe the provisions in force.
                    - To allow access to the property, to the owner, administrator and to the operators or industrialists sent by any of both, for the realization, inspection and verification of any kind of works or repairs that affect real estate.
                    - To comply at all times with the regulated statutory regulations and the agreements that the community of owners has established or founded, in order to use the services, common elements and a good coexistence regime.
                </Text>
                <Text style={styles.subTitle}>
                    Thirteenth.- transfer of data:
                </Text>
                <Text>
                    The Tenant party authorizes the Landlord so that it can transfer the personal data contained in this contract to third parties or legal entities so that they offer the Tenant services performed with the estate and
                    that they can collect from them the information related to the fulfillment or breach of what corresponds to the Tenant for the proper maintenance of the leased property and that may affect the other occupants of the property.
                </Text>
                <Text style={styles.subTitle}>
                    Fourteenth.- Notifications and judicial submission.
                </Text>
                <Text>
                    For the purpose of receiving any notification related to the rights and obligations arising from this contract, as well as for the purposes of placement or subpoena, the Landlord's address is designated as the domicile of the parties, which is indicated in the heading of this document and for the tenant of the leased property.
                    For any difference in the interpretation and execution of this contract, the parties submit to the Courts and Tribunals of the city of Barcelona, waiving their own jurisdiction, if it exists.
                    And in proof of conformity with the content of each and every one of these clauses, the concurring parties sign this contract, in duplicate and for all purposes, in the city and date indicated above.
                </Text>
                <div className="signature-area">

                    <div className="singature-block">
                        <Text style={styles.signature} render={({landlordName, landlordLastName}) => (
                            `${landlordName landlordLastName}`
                        )} />
                        <Text>
                            Landlord
                        </Text>
                    </div>

                    <div className="singature-block">
                        <Text style={styles.signature} render={({tenantName, tenantLastName}) => (
                            `${tenantName tenantLastName}`
                        )} />
                        <Text>
                            Tenant
                        </Text>
                    </div>

                </div>
            </Page>
        </Document>
    )
};

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });

const mapStateToProps = state => {
    const jamId = state.nav.jamId;
    const { userId, userRole, userJams } = state.userInfo;

    return { jamId, userId, userRole, userJams };
};

export default connect(mapStateToProps, null) (ContractEN);
