import axios from 'axios';
import {returnError} from './messages';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
 } from './types';

// Check token  & load user
export const loadUser = () => (dispatch, getState) =>{
  // User Loading
  dispatch({type:USER_LOADING});

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(response => {
      //console.log(response.data);
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    }).catch(error =>{
      dispatch(returnError(error.response.data,error.response.status));
      dispatch({ type: AUTH_ERROR });
    })
};

// Login user
export const login = (username,password) => dispatch =>{
  // Headers
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  };

  // Request Body
  const body = JSON.stringify({username,password});


  axios.post('/api/auth/login',body, config)
    .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    }).catch(error =>{
      dispatch(returnError(error.response.data,error.response.status));
      dispatch({ type: LOGIN_FAIL });
    })
};

// Login user
export const registerUser = ({username,password, email}) => dispatch =>{
  // Headers
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  };

  // Request Body
  const body = JSON.stringify({username,email,password});


  axios.post('/api/auth/register',body, config)
    .then(response => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });
    }).catch(error =>{
      dispatch(returnError(error.response.data,error.response.status));
      dispatch({ type: REGISTER_FAIL });
    })
};

// Logout User
export const logout = () => (dispatch, getState) =>{
  axios.post('/api/auth/logout',null, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    }).catch(error =>{
      dispatch(returnError(error.response.data,error.response.status));
    })
};

// Setup config with token
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;
  // Headers
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  }

  // If token , add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
}
