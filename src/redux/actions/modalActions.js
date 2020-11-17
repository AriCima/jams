export const MODAL_STATE = 'MODAL_STATE';
export const MODAL_TYPE = 'none';

export const setModalState = (modalState = 'closed') => ({
  type: MODAL_STATE,
  payload: {
    modalState
  }
});

// modalType = referencia del documento que se está abriendo, por lo gral === userId
export const setModalType = (modalType = 'none') => ({
  type: MODAL_TYPE,
  payload: {
    modalType
  }
});