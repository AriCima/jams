import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
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
    
    const totalRent = 100;
    
    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ Lease contract ~
                </Text>
                <Text style={styles.title}>
                    Lease contract
                </Text>
                <Text style={styles.text}>
                    In Barcelona to, {date}
                </Text>
                <Text style={styles.title}>
                    Present
                </Text>
                <Text>
                    De una parte,
                    {landlordTitle} {landlordName} {landlordLastName}, of legal age, with a professional domicile in, 
                    {landlordAddress} {landlordZipCode} {landlordCity} - {landlordCountry}, provided with 
                    {landlordDocType} nº {landlordDocNr}, acting in his own name and interest. 
                    Hereinafter the Landlord.
                </Text>
                <Text>
                    And the other part,  
                    {tenantName} {tenantLastName}, of legal age, domiciled in {tenantAddress} {tenantZipCode} 
                    {tenantCity} - {tenantCountry}, provided {tenantDocType} nº {tenantDocNr}, 
                    {tenantEmail} acting in his/her own name and interest. Hereinafter the tenant.
                </Text>
                <Text>
                    Both parties recognize the legal capacity necessary for this act, and by mutual agreement
                </Text>
                <Text style={styles.title}>
                    STATE
                </Text>
                <Text>
                    I.‑ {landlordTitle} {landlordName} {landlordLastName} is the owner of the apartment located in
                    {jamAddress} {jamZipCode} {jamCity} - {jamCountry}.
                    II.- {tenantName} {tenantLastName} is interested in leasing {apartmentDivisions} undivided of the property.
                    III.‑ And both parties being interested in the partial lease of the property indicated in the preceding exhibitions, 
                    in accordance with the terms that are subsequently agreed, sign the present lease agreement, and by mutual agreement establish the following
                </Text>
                <Text style={styles.title}>
                    AGREEMENTS
                </Text>
                <Text style={styles.subTitle}>
                    First.- Object of the lease contract.
                </Text>
                <Text>
                    The purpose of this contract is the transfer of the use of {apartmentDivisions} undivided 
                    of the property, which grants the right of exclusive use of a {roomType} {exterior ? 'exterior' : 'interior'}, which is {sqm} m2, {balcony && 'with balcony'}, 
                    and that {privateBath ? 'with private bathroom' : 'without private bathroom'} private bathroom, with the right, in addition, to the use of common services and supplies
                    (water, gas, electricity and internet), and this to be used as housing.
                    The possession of any animal on the leased farm is prohibited.
                </Text>
                <Text style={styles.subTitle}>
                    Second- Duration of the contract.
                </Text>
                <Text>
                    The term of this contract will be effective from {checkIn} to {checkOut}. 
                    Once the agreed term has expired, it may be extended by prior agreement of both parties, 
                    although it must necessarily be documented in writing, understanding that otherwise there is 
                    no agreement with the extension.
                    The duration of the sublease implies that in accordance with the provisions of art. 3.2 of the Urban Leasing Law, 
                    the legal nature of this contract is for use other than housing, although it is the tenant's 
                    intention that the leased property constitutes his habitual residence during the term of the contract.
                </Text>
                <Text style={styles.subTitle}>
                    Third.- Lease price and rent update.
                </Text>
                <Text>
                    It is agreed by both parties that the price of the lease will be set at the amount of {rent} EUROS MONTHLY, plus {expenses} EUROS MONTHLY for expenses, 
                    for supplies, IBI fees and Community of Owners, making a total of {totalRent} EUROS payable for months in advance within the first five days of each month.
                    The payment of the rent and assimilated items will be made by the Tenant to the Landlord in the bank account owned by the tenant opened in the following bank account
                    <Text style={styles.boldText}>
                        ENTITY:  BBVA.
                        IBAN:  ES76 0182 8740 8302 0208 2108.
                        SWIFT: BBVAESMMXXX.
                    </Text>
                    <Text>
                        during the first 5 days of each month, the Landlord issuing the corresponding invoice / receipt monthly, and serving the bank document evidencing the performance of the charge as a receipt of said concepts.
                        Both parties agree that in the event that the lease is terminated by unilateral withdrawal of the Tenant, it must pay the Landlord for damages and losses the total amount of the agreed rent during the duration of this lease.
                    </Text>
                </Text>
            </Page>
        </Document>
    )
};