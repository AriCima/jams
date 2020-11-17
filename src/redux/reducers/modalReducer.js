import {
    MODAL_STATE,
    MODAL_TYPE,
} from '../actions/modalActions';
  
const defaultState = {
    modalState: 'closed',
    modalType: 'none',
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

const docReducers = createReducer(defaultState, {
[MODAL_STATE]: updateVal,
[MODAL_TYPE]: updateVal,
});

export default docReducers;
  