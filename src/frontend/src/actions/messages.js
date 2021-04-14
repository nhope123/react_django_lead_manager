import {CREATE_MESSAGES,GET_ERRORS} from './types';

// Create Messages
export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGES,
    payload: msg
  }
};

//Return Errors
export const returnError = ( msg,status) => {
  return {
    type: GET_ERRORS,
    payload:{msg,status}
  }
};
