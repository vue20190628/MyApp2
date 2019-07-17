import React from 'react';
import City from '../common/cityHome'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Seach from '../common/seach/seach';
import Home from '../common/home';

function RouterCompontent() {
  return (
    <BrowserRouter>
      <div>   
      </div>
      <Switch>    
        <Route exact path="/" component={City} />
        <Route path="/city" component={City} />
        <Route path="/Seach" component={Seach} />
        <Route path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}
export default RouterCompontent;