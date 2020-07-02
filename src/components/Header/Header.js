import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {loginUser} from '../../redux/reducer'
import './Header.css'

class Header extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  changeHandler(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login() {
    const {username, password} = this.state
    console.log(this.props)
    axios.post('/api/user/login', {username, password})
    .then(res => {
      this.props.loginUser(res.data)
      this.props.history.push('/dashboard')
    })
    .catch(err => alert(err))
  }

  register() {

  }

  render(){
    const {username, password} = this.state
  return(
    <div className='landing'>
      <h1 id='title'>ASM</h1>
      
      <input placeholder='Username'
      type='text'
      name='username'
      value={username}
      className='loginInput'
      onChange={e => this.changeHandler(e)}
      />
      
      <input placeholder='Password' 
      type='password'
      name='password'
      value={password}
      className='loginInput'
      onChange={e => this.changeHandler(e)} />
      
      <button className='loginButton' onClick={() => this.login()}>Login</button>
      
      <p className='welcomeMessage'>Welcome to Anti-Social Media!  If this is your first time, click 'Register' to make an account.</p>
      
      <button className='loginButton'>Register</button>
      
      <div className='textBox'>
        <p className='comments'>"Anti-Social Media saved me tons of time during the day.  My kids even got lunch today!"  -Karen</p>
        <p className='comments'>"I needed a break from everyone else in the world, now I can focus on what matters.  Video games." 
        
        -John</p>
        </div>
    </div> 
    )
  }
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {loginUser})(Header)