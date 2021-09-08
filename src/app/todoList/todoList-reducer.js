import constants from './todoList-constants';

const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.GET_LIST_SUCCESS:
      return { ...state, data: payload.data, loading: false };
    case constants.GET_LIST_ERROR:
    case constants.GET_LIST_ACTION:
      return { ...state, loading: true };
    default: return { ...state };
  }
};
