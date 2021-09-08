import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';
// import App from './app/index';
import TodoList from './app/todoList/index';

const appReducer = combineReducers({
//   app: App.AppReducer,
  todoList: TodoList.TodoListReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(appReducer, middleware);

sagaMiddleware.run(sagas);
export default store;
