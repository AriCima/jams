export const JAM_ID = 'JAM_ID';
export const SECTION = 'SECTION';
export const SUB_SECTION = 'SUB_SECTION';

export const setJamId = (jamId = '') => ({
  type: JAM_ID,
  payload: {
    jamId
  }
});


export const setSection = (section = '') => ({
  type: SECTION,
  payload: {
    section
  }
});


export const setSubSection = (subSection = '') => ({
  type: SUB_SECTION,
  payload: {
    subSection
  }
});