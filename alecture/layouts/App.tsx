import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import LogIn from '@pages/Login'
import SigUp from '@pages/SignUp'

const App = () => {
  return <Switch>
    <Redirect exact path='/' to="/login"></Redirect>
    <Route path="/login" component={LogIn}></Route>
    <Route path="/sigup" component={SigUp}></Route>
  </Switch>
};

export default App;
