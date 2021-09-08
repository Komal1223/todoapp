import constants from './todoList-constants';

export const getList = data => ({
  type: constants.GET_LIST_ACTION,
  payload: data,
});
