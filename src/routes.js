import {Switch, Route} from 'react-router-dom'
import React from 'react'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Hobby from './components/Hobby/Hobby'

export default (
  <Switch>
    <Route exact path='/' component={Header}/>
    <Route path='/dashboard' component={Home}/>
    <Route path='/profile' component={Profile}/>
    <Route path='/hobby' component={Hobby}/>

  </Switch>
)