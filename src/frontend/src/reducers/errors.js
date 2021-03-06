import {GET_ERRORS} from './../actions/types';

const initialState = {
  msg:{},
  status: null
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return{
        msg: action.payload.msg,
        status: action.payload.status
      }
      break;
    default:
      return state;
  }
}

export default errorReducer;
