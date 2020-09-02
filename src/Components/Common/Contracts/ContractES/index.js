import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Calculations from '../../../services/Calculations';

import './index.css';

// REACT PDF: https://react-pdf.org/

const ContractES = (props) => {

    const {
        jamId,
        userId,
        jammerInfo,
        // jammerCity,
        // jammerCondition,
        // jammerCountry,
        // jammerDocument,
        // jammerDoor,
        // jammerFloor,
        // jammerHouseNr,
        // jammerIdNr,
        // jammerName,
        // jammerSchool,
        // jammerStreet,
        // jammerSurname,
        // jammerTitle,
        // jammerZipCode,
        // jammerEmail,
        // jammerHomeTel,
        // mobile,
        // jammerCourse, 
        // jammerCompany,
        accInfo,
        // landlordTitle,
        // landlordName, 
        // landlordSurname, 
        // landlordIdNr, 
        // landlordStreet, 
        // landlordHouseNr, 
        // landlordFloor,
        // landlordDoor, 
        // landlordZipCode, 
        // landlordCity,
        // accInfo.City,
        // accInfo.Divisions,
        // accInfo.Door,
        // accInfo.Floor,
        // accInfo.HouseNr,
        // accInfo.Street,
        // accInfo.StreetType,
        // accInfo.ZipCode,
        roomInfo,
        // roomBalcony,
        // roomLocation,
        // roomPrivateBathroom,
        // RoomSize
    } = props;


    const divisions = Calculations.getApartmentDivisions(accInfo.totalRooms);
    const divisiones = divisions.esp;

    return (
        <div className="contract-wrapper">
            <div className="contract-header">
                <div className="contract-header-title">
                    <h4>CONTRATO DE ARRENDAMIENTO</h4>
                </div>
                <div className="contract-header-date">
                    <p>En Barcelona, a {jammerInfo.checkIn}</p>
                </div>
                <div className="contract-header-subtitle">
                    <h4>Reunidos</h4>
                </div>
            </div>

            <div className="contract-body">
                <div className="contract-body-section-content">
                    <p>De una parte,<br/>
                    <span>{landlordTitle} {landlordName} {landlordSurname}</span>, mayor de edad, con domicilio profesional en 
                    <span>{landlordStreet} {landlordHouseNr} {landlordFloor} {landlordDoor} {landlordZipCode}, {landlordCity}, 
                    provisto de DNI nº {landlordIdNr} </span> actuando en nombre e interés propios. En adelante el arrendador.<br/>
                    
                    <br/>Y de otra parte,<br/>
                    <span>{jammerTitle} {jammerName} {jammerSurname}</span>, 
                    mayor de edad, con domicilio en 
                    <span>{jammerStreet} {jammerHouseNr} {jammerFloor} {jammerDoor} {jammerZipCode}, {jammerCity} {jammerCountry},</span>
                    provisto de <span>{jammerDocument} nº {jammerIdNr} </span>, email {jammerEmail}, teléfono {jammerHomeTel} y teléfono móvil {mobile} actuando en su propio nombre e interés.<br/></p>
                    {jammerCondition === 'student' ?
                        (
                            <p>estudiante de {jammerCourse} en {jammerSchool}.</p>
                        ) 
                        : 
                        (
                            <p>practicante en la empresa {jammerCompany}.</p>
                        )
                    } 
                    <p>En adelante el arrendatario.<br/>
                    <br/>Ambas partes se reconocen la capacidad legal necesaria para este acto, y de común acuerdo</p>
                </div>
                <div className="contract-body-section-title">
                    <br/><br/><h4>E X P O N E N</h4><br/><br/>
                </div>
                <div className="contract-body-section-content">
                    <p>I.‑ Que <span>{landlordTitle} {landlordName} {landlordSurname}</span> es propietario de la finca ubicada en</p>
                    { jamFloor === 'principal' ? <p>el Piso Principal,</p> : <p>la planta {jamFloor},</p>} 
                    puerta {jamDoor}, 
                    de la finca sita en {jamCity}, 
                    {jamStreetType} {jamStreet}, 
                    {jamHouseNr}, 
                    {jamZipCode}, 
                    de {jamCity} <br/>
                    II.-  <span>{jammerTitle} {jammerName} {jammerSurname}</span>  está interesado en arrendar {divisiones} indivisa de la finca.
                    III.‑ Y estando ambas partes interesadas en el arrendamiento parcial del bien indicado en los expositivos precedentes, de conformidad a los términos que seguidamente se convienen, suscriben el presente <span>contrato de arrendamiento</span>, y de mutuo acuerdo establecen los siguientes.
                </div>
                <div className="contract-body-section-title">
                    <br/><br/><h4>P A C T O S </h4><br/><br/>
                </div>
                <div className="contract-body-section-content">
                    <div className="contract-body-section-content-agreements">
                        <p>Primero.- Objeto del contrato de arrendamiento.</p>
                    </div>
                    <p>El objeto del presente contrato consiste en la cesión del uso de {divisiones} indivisa de la finca, 
                    que le concede el derecho de uso exclusivo de una habitación de {RoomSize}m2 {roomLocation},</p>
                    {roomBalcony === 'yes' && <p>con balcón propio</p>}, 
                    <p>y que</p> 
                    {roomPrivateBathroom === 'yes' ? <p>posee baño privado, </p> : <p>no posee baño privado,</p>}
                    <p>con derecho además, al uso de los servicios comunes y suministros (agua, gas, electricidad e internet), y ello para ser ocupadas como vivienda. 
                    Se prohíbe la tenencia de cualquier animal en la finca arrendada.
                    </p>
                    <div className="contract-body-section-content-agreements">
                        <p>Segundo- Duración del contrato.</p>
                    </div>
                    <p>El contrato comenzará a regir el {jammerInfo.checkIn} y finalizará el {jammerInfo.checkOut}. 
                    Una vez finalizado el plazo pactado, podrá prorrogarse por acuerdo previo de ambas partes, 
                    si bien necesariamente deberá documentarse por escrito, entendiendo que en caso contrario no existe acuerdo con la prórroga.
                    La duración del subarrendamiento comporta que de conformidad a lo convenido en el art. 3.2 de la Ley de Arrendamientos Urbanos, 
                    la naturaleza jurídica de este contrato sea para uso distinto del de vivienda, a pesar de que es intención del arrendatario que la 
                    finca arrendada constituya su residencia habitual durante la vigencia del contrato.
                    </p>
                    <div className="contract-body-section-content-agreements">
                        <p>Tercero.- Precio del arrendamiento y actualización de la renta.</p>
                    </div>
                    <p>Se conviene por ambas partes que el precio del arrendamiento se fije en la cantidad de 
                        {roomInfo.rent} EUROS MENSUALES, más {roomInfo.expenses} EUROS MENSUALES en concepto de gastos por suministros, 
                        cuotas de IBI y Comunidad de Propietarios, pagaderos por meses anticipados dentro de los cinco primeros días de cada mes,
                        decir un total de {roomInfo.TotalRent} EUROS MENSUALES.<br/>
                        El pago de la renta y conceptos asimilados se realizará por el arrendatario al arrendador en la cuenta bancaria titularidad del mismo, 
                        indicada a continuación:<br/>
                        Banco: {jamInfo.bankName}, <br/>
                        IBAN:  {jamInfo.iban}, <br/>
                        SWIFT: {jamInfo.swiftCode} <br/>
                        EL pago de la misma deberá hacerse durante los 5 primeros días de cada mes, 
                        expidiendo el arrendador la correspondiente factura/recibo mensualmente, 
                        y sirviendo el documento bancario acreditativo de la realización del cargo como recibo de dichos conceptos.
                        Ambas partes acuerdan que en el supuesto de que el arrendamiento se extinguiera mediante desistimiento
                        unilateral del arrendatario, éste deberá abonar al arrendador en concepto de daños y perjuicios el total 
                        de la renta convenida durante la duración del presente contrato de arrendamiento. 
                    </p>
                </div>
                <div className="contract-body-section-content-agreements">
                    <p>Cuarto.- Arrendamiento y cesión del contrato. </p>
                </div>
                <p>Ambas partes acuerdan una total y absoluta prohibición, con expresa renuncia a lo dispuesto en el art. 32
                    de la LAU, a subarrendar, ceder o traspasar los derechos de este contrato a terceros.
                    En el supuesto de que el arrendatario incumpliera esta obligación, podrá el arrendador resolver el presente contrato.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Quinto.- Derecho de adquisición preferente.</p>
                </div>
                <p>El arrendatario renuncia expresamente al derecho de adquisición preferente sobre la parte de la finca 
                    arrendada y a los derechos de tanteo y retracto, de conformidad a lo prevenido en los artículos 25, 31 y 
                    concordantes de la LAU, así como a los derechos correspondientes del resto de arrendamientos parciales de 
                    la finca.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Sexto.-  Estado físico de la finca:</p>
                </div>
                <p>El arrendatario reconoce recibir la parte indivisa de la finca arrendada en perfecto estado de 
                    conservación y a su entera satisfacción, siendo por tanto de su cuenta los desperfectos y deterioros 
                    que en la misma se ocasionen, así como las reparaciones necesarias a fin de conservarla en estado de servir 
                    para el uso convenido, ya que hace renuncia expresa a lo dispuesto en el artículo 30 de la LAU, en relación 
                    con el artículo 21. No teniendo derecho a la suspensión del contrato o a desistir del mismo, ni indemnización alguna, 
                    así como tampoco a disminuir o paralizar el pago de la renta.
                    El arrendatario considera apta y adecuada la parte de la finca arrendada  para el destino pactado que va a dedicarla.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Séptimo.- Obras en la finca objeto de arrendamiento.</p>
                </div>
                <p>Los contratantes convienen expresamente, que quedará prohibida la ejecución de cualquier tipo de obras 
                    por el arrendatario, tanto en la habitación arrendada de uso exclusivo como en los elementos de uso común. 
                    Será causa de resolución del presente contrato la ejecución por el arrendatario de obras no autorizadas por el arrendador.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Octavo.- Reparaciones.</p>
                </div>
                <p>El arrendatario, con renuncia expresa a lo dispuesto en artículo 30 de la LAU, en relación con el
                     artículo 21 de la misma ley, se obliga a hacer a su cargo en el local objeto del contrato, todas las 
                     reparaciones necesarias a fin de conservarlo en estado de servir para el caso convenido, en el supuesto 
                     de que los daños o deterioros se hayan producido por su culpa o negligencia; y sin que durante la ejecución de 
                     las mismas tenga derecho a suspender el contrato o desistir del mismo, ni a indemnización alguna, así como 
                     tampoco a disminuir o paralizar el pago de la renta. El resto de obras serán de cuenta y cargo del arrendador.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Noveno.- Fianza y garantías.</p>
                </div>
                <p>El arrendatario entrega en este acto, en concepto de fianza, la suma de 
                     {roomInfo.deposit} EUROS Ambas partes acuerdan la restitución íntegra de la misma a la parte arrendataria, 
                        en el momento de la finalización del contrato, previa verificación del estado en el que se 
                        encuentre el inmueble.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Décimo.- Gastos e impuestos derivados de la propiedad.</p>
                </div>
                <p>El arrendador vendrá obligado a abonar los gastos, cargas o responsabilidades que no sean susceptibles 
                    de individualización y que correspondan a la finca arrendada o a sus accesorios si los tuviere, así 
                    como a las cuotas por gastos extraordinarios de conservación y mantenimiento de la finca. 
                    También estará obligado a satisfacer las contribuciones especiales que imponga la administración. 
                    Correrán por cuenta y cargo del arrendatario los gastos generales u ordinarios para el adecuado sostenimiento del inmueble, 
                    así como sus servicios y la cuota íntegra del Impuesto sobre Bienes Inmuebles (IBI) que satisfaga la propiedad, 
                    así como la de cualquier otro que grave la propiedad urbana, siendo pagaderos por mensualidades anticipadas dentro 
                    de los siete primeros días de cada mes, ya que están incluidos en el coste de la renta.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Décimo primero.- Causas de extinción del contrato.</p>
                </div>
                <p>Sin perjuicio de los supuestos de resolución del contrato contenidos en las anteriores cláusulas, 
                    el presente contrato de arrendamiento quedará extinguido por las siguientes causas:<br/>
 
                    a&#41; &nbsp;&nbsp;Falta de pago de la renta, gastos y suministros y de su actualización, así como contraviniendo todo lo que haya convenido para la limpieza y 
                    conservación del inmueble arrendado, incluso con terceras personas o entidades.<br/>
                    b&#41; &nbsp;&nbsp;Falta de pago de la fianza y de su actualización.<br/>
                    c&#41; &nbsp;&nbsp;Cuando en la finca tengan lugar actividades molestas, insalubres, nocivas, peligrosas o 
                    ilícitas.<br/>
                    d&#41; &nbsp;&nbsp;El no uso o cierre de la finca durante seis meses o más en el curso de un año, 
                    aunque dicho plazo no fuere continuado.<br/>
                    e&#41; &nbsp;&nbsp;La ruina del inmueble declarada con expediente administrativo tramitado conforme a lo que 
                    establece la Ley del Suelo y también la pérdida o destrucción del inmueble, considerándose como tal 
                    la necesidad de realizar obras de reparación que tengan un coste igual o superior al 50% del valor de 
                    la construcción sin contar el valor del suelo.<br/>
                    f&#41; &nbsp;&nbsp;La introducción y/o permanencia en la habitación cuyo uso exclusivo se atribuye o en los 
                    espacios comunes, de una o más personas ajenas al inmueble durante uno o más días, u ocupación de 
                    una habitación ajena sin consentimiento del arrendatario que tenga el derecho de uso exclusivo.<br/>
                    El arrendatario no tendrá derecho a indemnización de clase alguna a la extinción del contrato, renunciando expresamente a los derechos que confiere el art. 34 de la LAU.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Décimo segundo.- Otras obligaciones del arrendatario:</p>
                </div>
                <p>
                    a&#41; &nbsp;&nbsp;    A no instalar transmisiones, motores, máquinas, etc., que produzcan vibraciones o
                     ruidos molestos para los demás ocupantes del inmueble o de los colindantes de la propiedad, o que pueda 
                     afectar la consistencia, solidez o conservación del inmueble
                    b&#41; &nbsp;&nbsp;    A no almacenar manipular en la finca materias explosivas, inflamables, incómodas o 
                    insalubres, y observar en todo momento las disposiciones vigentes.
                    ca&#41; &nbsp;&nbsp;     A permitir el acceso en la finca, al propietario, administrador y a los operarios 
                    o industriales mandados por cualesquiera de ambos, para la realización, inspección y comprobación de 
                    cualquier clase de obras o reparaciones que afectan inmueble.
                    da&#41; &nbsp;&nbsp;    A cumplir el todo momento las normas estatutarias reglamentadas y los acuerdos que 
                    la comunidad de propietarios tenga establecidos o establezcan, en orden a la utilización de los servicios, 
                    elementos comunes y buen régimen de convivencia
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Décimo tercero.- cesión de datos:</p>
                </div>
                <p>
                    La parte arrendataria autoriza a la arrendadora para que pueda ceder los datos personales que constan 
                    en este contrato a terceras entidades o personas jurídicas para que oferten al arrendatario servicios 
                    realizados con la finca y que pueda recabar de las mismas la información relativa al cumplimiento o 
                    incumplimiento de lo que al arrendatario corresponda para el adecuado mantenimiento de la finca 
                    arrendada y que pueda afectar a los demás ocupantes del inmueble.
                </p>
                <div className="contract-body-section-content-agreements">
                    <p>Décimo cuarto.- Notificaciones y sumisión judicial.</p>
                </div>
                <p>A efectos de recibir cualquier notificación vinculada con los derechos y obligaciones dimanantes de 
                    este contrato, así como a los efectos de emplazamiento o citación judicial se designa como domicilio 
                    de las partes el de la arrendadora el que consta indicado en el encabezamiento del presente escrito y 
                    para el arrendatario el de la finca arrendada.<br/>
                    Para cualquier diferencia en la interpretación y ejecución del presente contrato, las partes se someten 
                    a los Juzgados y Tribunales de la ciudad de Barcelona, con renuncia a su fuero propio, si existiere.<br/>
                    Y en prueba de conformidad con el contenido de todas y cada una de las presentes cláusulas, las partes 
                    concurrentes firman el presente contrato, por duplicado y a todos los efectos, en la ciudad y fecha 
                    arriba indicadas.
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
    }
};

export default connect(mapStateToProps) (ContractES);

