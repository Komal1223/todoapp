import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CompareArrowsOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CustomTextFields(props) {
  const classes = useStyles();
  console.log(props);

  return (
    <form className={classes.root} noValidate={true} autoComplete='off'>
      <TextField id='standard-basic' label='Standard'
        value={props.value}
        onChange={props.onChange}
       />
      {/* <TextField id='filled-basic' label='Filled' variant='filled' />
      <TextField id='outlined-basic' label='Outlined' variant='outlined' /> */}
    </form>
  );
}
