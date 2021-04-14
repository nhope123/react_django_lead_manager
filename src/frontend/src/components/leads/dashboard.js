import React, { Component, Fragment } from 'react'
import Form from './form'
import Lead from './leads'

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Form />
        <Lead />
      </Fragment>
    )
  }
};

export default Dashboard;
