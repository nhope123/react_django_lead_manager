import React,{Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './layout/header';
import Dashboard from './leads/dashboard';
import Alert from './layout/alert';
import Login from './accounts/login';
import Register from './accounts/register';
import PrivateRoute from './common/privateRoute';

import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './../actions/auth';

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Alert options
const options = {  timeout: 5000,  position: 'top center' };

class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Provider store={store}>
        <AlertProvider  template={AlertTemplate} {...options}>
          <Router >
            <Fragment >
              <Header />
              <Alert />
              <div className='container'>
                <Switch >
                  <PrivateRoute exact path={"/"} component={Dashboard} />
                  <Route exact path={'/register'} component={Register} />
                  <Route exact path={'/login'} component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
