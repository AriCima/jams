import React from 'react';
import {useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import DataService from '../../services/DataService';

import './index.scss';


const useBoardForm = ({jamId, userId}) => {

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log('data: ', data);
        
        const date = new Date()

        const messageInfo = {
            messageText: data,
            userId: userId,
            jamId: jamId,
            section: 'board',
            createdAt: date,
            messageType: 'message'
        }

        DataService.saveMessage(jamId, 'board', messageInfo)
    };

    return (

        <form
            className="board-form"
            onSubmit={handleSubmit(onSubmit)}
        >

                {/* <div className="board-textarea-block"> */}
                    {/* 
                        <div className="block-label">
                            {/* <label>First name</label> 
                            {errors.message && <div className="field-error">Required</div>}
                        </div> 
                    */}
                    <textarea
                        rows="1"
                        name="message"
                        ref={register({
                            required: true,
                        })}
                    />
                {/* </div> */}
                <div className="board-buttonArea">
                    <button type="submit">Send</button>
                </div>

        </form>
    );
};

const mapStateToProps = (state) => {
    const jamId = state.nav.jamId;
    const {jamName, adminName} = state.jamInfo
    return { jamId, jamName, adminName }
};

export default connect(mapStateToProps, null)(useBoardForm);