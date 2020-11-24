import {
    JAM_NAME,
    JAM_DESC,
    JAM_TYPE,
    JAM_ADMIN_ID,
    JAM_ADMIN_NAME,
    JAM_ADMIN_LAST_NAME,
    JAM_DETAILS,
    JAM_CODE
    // JAMMERS,
} from '../actions/jamActions';
  
const defaultState = {
    jamName: '',
    jamDesc: '',
    jamType: '',
    adminId: '',
    adminName: '',
    adminLastName: '',
    jamDetails: {},
    jamCode: ''
    // jammers: []
};

const updateVal = (state, action) => {
    return { ...state, ...action.payload };
};

function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (action.type in handlers) {
        return handlers[action.type](state, action);
    }
    return state;
};
}

const jamReducers = createReducer(defaultState, {
[JAM_NAME]: updateVal,
[JAM_DESC]: updateVal,
[JAM_TYPE]: updateVal,
[JAM_ADMIN_ID]: updateVal,
[JAM_ADMIN_NAME]: updateVal,
[JAM_ADMIN_LAST_NAME]: updateVal,
[JAM_DETAILS]: updateVal,
[JAM_CODE]: updateVal,
// [JAMMERS]: updateVal
});

export default jamReducers;
  