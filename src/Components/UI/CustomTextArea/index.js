import React from "react";

// CSS
import "./index.scss";

const CustomTextArea = ({ size, placeholder, rows, cols, type, id, value, changeControl, width}) => {

    const handleChange = (event) => {
        //console.log('handle change launched');
       changeControl(event)
    }

    return (
     
        <div className="textArea-unit" style={{width: width}}>
            <textarea
                className="textArea-field"
                type={type}
                id={id}
                size={size}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                rows={rows}
                cols={cols}
            />
        </div>
    );
}

export default CustomTextArea;


// IN FATHER PASTE THIS BLOCK

{/* <CustomTextArea
    width='120px'
    cols='50'
    rows='5'
    placeholder='input info'
    type="text"
    id='inputTest'
    changeControl = {parent function name}
/> */}