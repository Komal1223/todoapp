import React from 'react';
import i18n from './lib/i18n';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';

import TodoListContainer from './app/todoList/todoList-container';

i18n.init(() => {
  render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact={true} path='/todoApp' component={TodoListContainer}/>
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('container')
  );
});

