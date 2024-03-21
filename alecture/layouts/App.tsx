import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

const LogIn = loadable(() => import('@pages/Login'));
const SigUp = loadable(() => import('@pages/SignUp'));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login"></Redirect>
      <Route path="/login" component={LogIn}></Route>
      <Route path="/sigup" component={SigUp}></Route>
    </Switch>
  );
};

export default App;
