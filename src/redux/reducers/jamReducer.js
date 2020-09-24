import {
    JAM_NAME,
    JAM_ADMIN_ID,
    JAM_ADMIN_NAME
} from '../actions/jamActions';
  
const defaultState = {
    jamName: '',
    adminId: '',
    adminName: ''
};

const updateVal = (state, action) => {
    console.log('action: ', action);
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
[JAM_ADMIN_ID]: updateVal,
[JAM_ADMIN_NAME]: updateVal,
});

export default jamReducers;
  