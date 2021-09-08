import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getList } from './todoList-actions';
import TodoListComponent from './todoList-component';

function mapStateToProps(state) {
  return {
    data: state.todoList.data,
    loading: state.todoList.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setData: bindActionCreators(getList, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListComponent));
