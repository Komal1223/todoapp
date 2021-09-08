import { IconButton, Input, ListItem, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Loader from '../../lib/components/loader/index';

const TodoListComponent = (props) => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => { setList(props.data);
    props.data.length ? setShow(true) : setShow(false);
  }, [props.data]);

  const handleCreate = () => {
    props.setData();
  };

  const handleChange = async({ target }) => {
    setValue(target.value);
    setList(props.data.filter((e) => e.name.toLowerCase().indexOf(target.value) >= 0));
  };

  return (
    <div className='todo-list'>
      <Toolbar className='list-header'>Todo List</Toolbar>
      {props.loading ? <Loader/> :
        <>
          <IconButton
            title='Create'
            className='create-list'
            onClick={() => handleCreate()}
          >
          Create
          </IconButton>
          {show && <Input
            placeholder='...Search'
            onChange={e => handleChange(e)}
            value={value}
          />}
          {value.length && !list.length ? 'No search found' : ''}
          {list.map(item => <ListItem id={item.id}>{item.name}</ListItem>)}
        </>}
    </div>
  );
};

export default TodoListComponent;
