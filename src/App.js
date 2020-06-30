import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/Header'
import Hobby from './components/Hobby/Hobby'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Nav from './components/Nav/Nav'
import axios from 'axios'
import routes from './routes'
import {connect} from 'react-redux'

class App extends Component {
  constructor() {
    super()
    this.state = {
      hobbies: {}
    }
  }

  login() {
    const {username, password} = this.state
    axios.post('/api/user/login', {username, password})
    .then(res => {
      this.props.loginUser(res.data)
      this.props.history.push('/dashboard')
    })
  }

  render(){
    return (
      <div className="App">
        {/* <Header />
        <Hobby/>
        <Home/>
        <Profile/>
        <Nav/> */}
        {routes}
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(App);