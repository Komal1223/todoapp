import Axios from 'axios';

const baseURL = 'https://api.fake.rest/189bf93b-4d78-4f00-86ac-76d87cfccbd1/';

export const getListApi = () => Axios.get(`${baseURL}task/list`)
  .then(response => response);

export const deleteListApi = () => Axios.delete(`${baseURL}task/delete`)
  .then(response => response);

export const addListApi = data => Axios.post(`${baseURL}task/add`, data)
  .then(response => response);

export const updateListApi = data => Axios.post(`${baseURL}task/update`, data)
  .then(response => response);
