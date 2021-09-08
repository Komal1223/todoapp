import { call, takeLatest, put, fork } from 'redux-saga/effects';
import constants from './todoList-constants';

import {
  getListApi,
  deleteListApi,
//   updateListApi,
//   addListApi,
} from './todoList-resources';

export function* getList({ payload }) {
  try {
    const response = yield call(getListApi, payload);

    yield put({ type: constants.GET_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: constants.GET_LIST_ERROR, payload: error });
  }
}

export function* watchGetList() {
  yield takeLatest(constants.GET_LIST_ACTION, getList);
}

export function* deleteList({ payload }) {
  try {
    yield call(deleteListApi, payload);
    yield put({ type: constants.DELETE_LIST_SUCCESS });
  } catch (error) {
    yield put({ type: constants.DELETE_LIST_ERROR });
  }
}

export function* watchDeleteList() {
  yield takeLatest(constants.DELETE_LIST_ACTION, deleteList);
}

export const Watcher = [
  fork(watchDeleteList),
  fork(watchGetList),
];
