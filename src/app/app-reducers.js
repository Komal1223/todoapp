import constants from './app-contants';

const initialState = {
  loading: true,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case constants.GET_DATA:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
