import React from "react";

// CSS
import "./index.css";

const CustomSelectInputField = ({ options, size, placeholder, id, value, onChange, width}) => {

    const handleChange = (event) => {
        //console.log('handle change launched');
       onChange(event)
    }

    const renderOptions = (options) => {
        return options.map((opt, id) => {
            return (
                <option 
                    key={id} 
                    value={opt.value}
                >
                    {opt.text}
                </option>
            )
        })  
    };

    return (
     
        <div className="input-unit" style={{width: width}}>
            <select 
                onChange={handleChange} 
                value={value}
                size={size}
                placeholder={placeholder}
                id={id}
            >
                {renderOptions(options)}
                {/* <option value="yes">Yes</option>
                <option value="no">No</option> */}
            </select>
        </div>
    );
}

export default CustomSelectInputField;


// IN FATHER PASTE THIS BLOCK

{/* <CustomSelectInputField
    width='120px'
    placeholder='input info'
    id='inputTest'
    value=value
    onChange = {handleChange}
    options={[value: 'value', text='Value']}
/> */}