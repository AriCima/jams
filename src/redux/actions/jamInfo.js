

import DataService from '../../Components/services/DataService';

// COMO ESTOY USANDO THUNK MIDDLEWARE, 
// LA ACCION PUEDE DEVOLVER UNA FUNCION
export const getJamInfo = (jamId) => async (dispatch) => {
    if(jamId !== 'overview'){
        const response = await DataService.getJamInfoById(jamId);
            
        dispatch({ 
            type: "GET_JAM_INFO", 
            payload: response 
        });
    }
};

