import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


import './index.scss';

// Create styles
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

// Create Document Component
const ContractES = ({
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
                {/* <Text style={styles.header} fixed>
                    ~ CONTRATO DE ARRENDAMIENTO ~
                </Text> */}
                <Text style={styles.title}>
                ~ CONTRATO DE ARRENDAMIENTO ~
                </Text>
                <Text style={styles.text}>
                    En Barcelona, a, {date}
                </Text>
                <Text style={styles.title}>
                    R E U N I D O S
                </Text>
                <Text>
                    De una parte,
                    {landlordTitle} {landlordName} {landlordLastName}, mayor de edad, con domicilio profesional en, 
                    {landlordAddress} {landlordZipCode} {landlordCity} - {landlordCountry},  provisto de  
                    {landlordDocType} nº {landlordDocNr}, actuando en nombre e interés propios.
                    En adelante el arrendador.

                </Text>
                <Text>
                    Y de otra parte,
                    {tenantName} {tenantLastName}, mayor de edad, con domicilio en {tenantAddress} {tenantZipCode} 
                    {tenantCity} - {tenantCountry}, provisto de {tenantDocType} nº {tenantDocNr}, 
                    {tenantEmail} actuando en su propio nombre e interés.
                    En adelante el arrendatario.

                </Text>
                <Text>
                    Ambas partes se reconocen la capacidad legal necesaria para este acto, y de común acuerdo.
                </Text>
                <Text style={styles.title}>
                    E X P O N E N
                </Text>
                <Text>
                    I.‑ {landlordTitle} {landlordName} {landlordLastName} es propietario de la finca ubicada en
                    {jamAddress} {jamZipCode} {jamCity} - {jamCountry}.
                    II.- {tenantName} {tenantLastName} está interesado en arrendar una {apartmentDivisions} indivisa de la finca.
                    III.‑ Y estando ambas partes interesadas en el arrendamiento parcial del bien indicado en los expositivos precedentes, 
                    de conformidad a los términos que seguidamente se convienen, suscriben el presente contrato de arrendamiento, 
                    y de mutuo acuerdo establecen los siguientes.
                </Text>
                <Text style={styles.title}>
                    P A C T O S
                </Text>
                <Text style={styles.subTitle}>
                    Primero.- Objeto del contrato de arrendamiento.
                </Text>
                <Text>
                    El objeto del presente contrato consiste en la cesión del uso de {apartmentDivisions} indivisa de la finca, 
                    que le concede el derecho de uso exclusivo de una habitación {roomType === 'single' ? 'simple' : 'doble'}, 
                    de {sqm} m2, {exterior ? 'exterior' : 'interior'}, {balcony && 'con balcón'}, 
                    y que {privateBath ? 'posee' : 'no posee'} baño privado, con derecho además, al uso de los servicios comunes
                    y suministros (agua, gas, electricidad e internet), y ello para ser ocupadas como vivienda. 
                    Se prohíbe la tenencia de cualquier animal en la finca arrendada.
                </Text>
                <Text style={styles.subTitle}>
                    Segundo- Duración del contrato.
                </Text>
                <Text>
                    El contrato comenzará a regir el {checkIn} y finalizará el {checkOut}. Una vez finalizado el plazo pactado, 
                    podrá prorrogarse por acuerdo previo de ambas partes, si bien necesariamente deberá documentarse por escrito,
                    entendiendo que en caso contrario no existe acuerdo con la prórroga.
                    La duración del subarrendamiento comporta que de conformidad a lo convenido en el art. 3.2 de la Ley de Arrendamientos Urbanos, 
                    la naturaleza jurídica de este contrato sea para uso distinto del de vivienda, a pesar de que es intención del arrendatario que la 
                    finca arrendada constituya su residencia habitual durante la vigencia del contrato.
                </Text>
                <Text style={styles.subTitle}>
                    Tercero.- Precio del arrendamiento y actualización de la renta.
                </Text>
                <Text>
                    Se conviene por ambas partes que el precio del arrendamiento se fije en la cantidad de € {rent}.- EUROS MENSUALES, más € {expenses}.- EUROS MENSUALES 
                    en concepto de gastos por suministros, cuotas de IBI y Comunidad de Propietarios, pagaderos por meses anticipados dentro de los cinco primeros días de cada mes, 
                    es decir un total de € {totalRent} EUROS MENSUALES El pago de la renta y conceptos asimilados se realizará por el arrendatario al arrendador en 
                    la cuenta bancaria titularidad del mismo, indicada a continuación:
                </Text>
                <Text style={styles.boldText}>
                    BANCO:  BBVA.
                    IBAN:  ES76 0182 8740 8302 0208 2108.
                    SWIFT: BBVAESMMXXX.
                </Text>
                <Text>
                    EL pago de la misma deberá hacerse durante los 5 primeros días de cada mes, 
                    expidiendo el arrendador la correspondiente factura/recibo mensualmente, y sirviendo el documento 
                    bancario acreditativo de la realización del cargo como recibo de dichos conceptos.
                    Ambas partes acuerdan que en el supuesto de que el arrendamiento se extinguiera mediante 
                    desistimiento unilateral del arrendatario, éste deberá abonar al arrendador en concepto de daños y 
                    perjuicios el total de la renta convenida durante la duración del presente contrato de arrendamiento.
                </Text>
                <Text style={styles.subTitle}>
                    Cuarto.- Arrendamiento y cesión del contrato. 
                </Text>
                <Text>
                    Ambas partes acuerdan una total y absoluta prohibición, con expresa renuncia a lo dispuesto en el art. 32 
                    de la LAU, a subarrendar, ceder o traspasar los derechos de este contrato a terceros.
                    En el supuesto de que el arrendatario incumpliera esta obligación, podrá el arrendador resolver el presente contrato.
                </Text>
                <Text style={styles.subTitle}>
                    Quinto.- Derecho de adquisición preferente.
                </Text>
                <Text>
                    El arrendatario renuncia expresamente al derecho de adquisición preferente sobre la parte de la finca arrendada y 
                    a los derechos de tanteo y retracto, de conformidad a lo prevenido en los artículos 25, 31 y concordantes de la LAU, 
                    así como a los derechos correspondientes del resto de arrendamientos parciales de la finca.
                </Text>
                <Text style={styles.subTitle}>
                    Sexto.-  Estado físico de la finca:
                </Text>
                <Text>
                    El arrendatario reconoce recibir la parte indivisa de la finca arrendada en perfecto estado de conservación y a su entera satisfacción, 
                    siendo por tanto de su cuenta los desperfectos y deterioros que en la misma se ocasionen, así como las reparaciones necesarias a fin de 
                    conservarla en estado de servir para el uso convenido, ya que hace renuncia expresa a lo dispuesto en el artículo 30 de la LAU, en relación 
                    con el artículo 21. No teniendo derecho a la suspensión del contrato o a desistir del mismo, ni indemnización alguna, así como tampoco a disminuir 
                    o paralizar el pago de la renta.
                    El arrendatario considera apta y adecuada la parte de la finca arrendada  para el destino pactado que va a dedicarla.
                </Text>
                <Text style={styles.subTitle}>
                    Séptimo.- Obras en la finca objeto de arrendamiento.
                </Text>
                <Text>
                    Los contratantes convienen expresamente, que quedará prohibida la ejecución de cualquier tipo de obras por el arrendatario, 
                    tanto en la habitación arrendada de uso exclusivo como en los elementos de uso común.
                    Será causa de resolución del presente contrato la ejecución por el arrendatario de obras no autorizadas por el arrendador.
                </Text>
                <Text style={styles.subTitle}>
                    Octavo.- Reparaciones.
                </Text>
                <Text>
                    El arrendatario, con renuncia expresa a lo dispuesto en artículo 30 de la LAU, en relación con el artículo 21 de la misma ley, 
                    se obliga a hacer a su cargo en el local objeto del contrato, todas las reparaciones necesarias a fin de conservarlo en estado de servir 
                    para el caso convenido, en el supuesto de que los daños o deterioros se hayan producido por su culpa o negligencia; y sin que durante 
                    la ejecución de las mismas tenga derecho a suspender el contrato o desistir del mismo, ni a indemnización alguna, así como tampoco a disminuir o 
                    paralizar el pago de la renta. 
                    El resto de obras serán de cuenta y cargo del arrendador.
                </Text>
                <Text style={styles.subTitle}>
                    Noveno.- Fianza y garantías.
                </Text>
                <Text>
                    El arrendatario entrega en este acto, en concepto de fianza, la suma de € {deposit}.- EUROS Ambas partes acuerdan la restitución de la misma 
                    a la parte arrendataria, en el momento de la finalización del contrato, previa verificación del estado en el que se encuentre el inmueble. 
                    El arrendador descontará 20€ en concepto de limpieza de la habitación.
                    La fianza se devolverá por transferencia bancaria, para lo cual el arrendatario informará al arrendador sus datos bancarios. 
                    En el caso que la cuenta indicada por el arrendatario no perteneciera a la UE (Unión Europea), todos los costos y comisiones originados en esta 
                    operación serán pagados por el arrendatario.
                </Text>
                <Text style={styles.subTitle}>
                    Décimo.- Gastos e impuestos derivados de la propiedad.
                </Text>
                <Text>
                    El arrendador vendrá obligado a abonar los gastos, cargas o responsabilidades que no sean susceptibles de individualización 
                    y que correspondan a la finca arrendada o a sus accesorios si los tuviere, así como a las cuotas por gastos extraordinarios 
                    de conservación y mantenimiento de la finca.
                    También estará obligado a satisfacer las contribuciones especiales que imponga la administración.
                    Correrán por cuenta y cargo del arrendatario los gastos generales u ordinarios para el adecuado sostenimiento del inmueble, 
                    así como sus servicios y la cuota íntegra del Impuesto sobre Bienes Inmuebles (IBI) que satisfaga la propiedad, así como la 
                    de cualquier otro que grave la propiedad urbana, siendo pagaderos por mensualidades anticipadas dentro de los siete primeros 
                    días de cada mes, ya que están incluidos en el coste de la renta.
                </Text>
                <Text style={styles.subTitle}>
                    Décimo primero.- Causas de extinción del contrato.
                </Text>
                <Text>
                    Sin perjuicio de los supuestos de resolución del contrato contenidos en las anteriores cláusulas, el presente contrato de arrendamiento quedará extinguido por las siguientes causas:
                    - Falta de pago de la renta, gastos y suministros y de su actualización, así como contraviniendo todo lo que haya convenido para la limpieza y conservación del inmueble arrendado, incluso con terceras personas o entidades.
                    - Falta de pago de la fianza y de su actualización.
                    - Cuando en la finca tengan lugar actividades molestas, insalubres, nocivas, peligrosas o ilícitas.
                    - El no uso o cierre de la finca durante seis meses o más en el curso de un año, aunque dicho plazo no fuere continuado.
                    - La ruina del inmueble declarada con expediente administrativo tramitado conforme a lo que establece la Ley del Suelo y también la pérdida o destrucción del inmueble, considerándose como tal la necesidad de realizar obras de reparación que tengan un coste igual o superior al 50% del valor de la construcción sin contar el valor del suelo.
                    - La introducción y/o permanencia en la habitación cuyo uso exclusivo se atribuye o en los espacios comunes, de una o más personas ajenas al inmueble durante uno o más días, u ocupación de una habitación ajena sin consentimiento del arrendatario que tenga el derecho de uso exclusivo.
                    El arrendatario no tendrá derecho a indemnización de clase alguna a la extinción del contrato, renunciando expresamente a los derechos que confiere el art. 34 de la LAU.
                </Text>
                <Text style={styles.subTitle}>
                    Décimo segundo.- Otras obligaciones del arrendatario:
                </Text>
                <Text>
                    Además de las obligaciones que han quedado relacionadas en párrafos precedentes de éste contrato de arrendamiento, el arrendatario se obliga a lo siguiente:
                    - A no instalar transmisiones, motores, máquinas, etc., que produzcan vibraciones o ruidos molestos para los demás ocupantes del inmueble o de los colindantes de la propiedad, o que pueda afectar la consistencia, solidez o conservación del inmueble
                    - A no almacenar manipular en la finca materias explosivas, inflamables, incómodas o insalubres, y observar en todo momento las disposiciones vigentes.
                    - A permitir el acceso en la finca, al propietario, administrador y a los operarios o industriales mandados por cualesquiera de ambos, para la realización, inspección y comprobación de cualquier clase de obras o reparaciones que afectan inmueble.
                    - A cumplir el todo momento las normas estatutarias reglamentadas y los acuerdos que la comunidad de propietarios tenga establecidos o establezcan, en orden a la utilización de los servicios, elementos comunes y buen régimen de convivencia.
                </Text>
                <Text style={styles.subTitle}>
                    Décimo tercero.- cesión de datos:
                </Text>
                <Text>
                    La parte arrendataria autoriza a la arrendadora para que pueda ceder los datos personales que constan en este contrato a 
                    terceras entidades o personas jurídicas para que oferten al arrendatario servicios realizados con la finca y que pueda recabar de 
                    las mismas la información relativa al cumplimiento o incumplimiento de lo que al arrendatario corresponda para el adecuado mantenimiento 
                    de la finca arrendada y que pueda afectar a los demás ocupantes del inmueble.
                </Text>
                <Text style={styles.subTitle}>
                    Décimo cuarto.- Notificaciones y sumisión judicial.
                </Text>
                <Text>
                    A efectos de recibir cualquier notificación vinculada con los derechos y obligaciones dimanantes de este contrato, 
                    así como a los efectos de emplazamiento o citación judicial se designa como domicilio de las partes el de la arrendadora 
                    el que consta indicado en el encabezamiento del presente escrito y para el arrendatario el de la finca arrendada.
                    Para cualquier diferencia en la interpretación y ejecución del presente contrato, las partes se someten a los Juzgados 
                    y Tribunales de la ciudad de Barcelona, con renuncia a su fuero propio, si existiere.
                    Y en prueba de conformidad con el contenido de todas y cada una de las presentes cláusulas, las partes concurrentes 
                    firman el presente contrato, por duplicado y a todos los efectos, en la ciudad y fecha arriba indicadas.
                </Text>

                <Text style={styles.signature}>
                    {landlordName} {landlordLastName}
                </Text>
                <Text>
                    Arrendador
                </Text>

                <Text style={styles.signature}>
                    {tenantName} {tenantLastName}
                </Text>
                <Text>
                    Arrendatario
                </Text>
 
            </Page>
        </Document>
    )
};


export default ContractES;
