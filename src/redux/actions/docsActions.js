export const DOC_TYPE = 'DOC_TYPE';
export const DOC_ID = 'DOC_ID';
export const EDITABLE = 'EDITABLE';

export const setDocType = (docType = 'none') => ({
  type: DOC_TYPE,
  payload: {
    docType
  }
});


export const setDocId = (docId = '') => ({
  type: DOC_ID,
  payload: {
    docId
  }
});


export const setEditable = (editable = false) => ({
  type: EDITABLE,
  payload: {
    editable
  }
});