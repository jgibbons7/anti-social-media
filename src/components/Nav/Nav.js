import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import './Nav.css'

function Nav(props) {
  return(
    <div id='navMain'>
    <h1 className='title'>ASM!</h1>
        <Link to='/'>
          <button className='logoutButton'>Logout</button>
        </Link>
        <Link to='/dashboard'>
          <button className='logoutButton'>Home</button>  
        </Link>
        <Link to='/hobby'>
          <button className='logoutButton'>Hobbies</button>
        </Link>
        <Link>
          <button className='logoutButton'>Profile</button>
        </Link>
        
    </div>
  )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Nav)