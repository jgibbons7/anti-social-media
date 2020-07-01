import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import routes from './routes'
import {connect} from 'react-redux'
import Nav from './components/Nav/Nav'

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
        <Nav></Nav>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(App);