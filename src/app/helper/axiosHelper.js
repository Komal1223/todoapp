import axios from 'axios';
import store from '../../store';
import conf from '../config';

const { basePath } = conf.path;

const instance = axios.create({
  baseURL: basePath,
});

export default instance;
