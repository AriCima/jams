import React from "react";

// CSS
import "./index.css";

const CustomInputFieldWithLabel = ({ size, label, placeholder, type, id, value, changeControl, width}) => {

    const handleChange = (event) => {
        //console.log('handle change launched');
       changeControl(event)
    }

    return (
     
        <div className="input-unit-withLabel" style={{width: width}}>
            <div className="input-unit-label">
                <p>{label}</p>
            </div>
            <input
                className="input-field-withLabel"
                type={type}
                id={id}
                size={size}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default CustomInputFieldWithLabel;


// IN FATHER PASTE THIS BLOCK

{/* <CustomInputFieldWithLabel
    width='120px'
    label='input custom test'
    placeholder='input info'
    type="text"
    id='inputTest'
    value='value'
    changeControl = {parent function name}
/> */}