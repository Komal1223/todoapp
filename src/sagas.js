import { all } from 'redux-saga/effects';

import TodoList from './app/todoList/index';

export default function* sagas() {
  yield all([
    ...TodoList.TodoListSaga,
  ]);
}
