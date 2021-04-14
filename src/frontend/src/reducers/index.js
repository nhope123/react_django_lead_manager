import {combineReducers} from 'redux';
import leadReducer from './leads'
import errorReducer from './errors'
import messageReducer from './messages'
import authReducer from './auth'

const rootReducer = combineReducers({
  leads: leadReducer,
  errors: errorReducer,
  messages: messageReducer,
  auth: authReducer
})

export default rootReducer;
