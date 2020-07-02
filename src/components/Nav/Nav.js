import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Nav.css'

function Nav(props) {
  return(
    <div id='navMain'>
    <img src='https://previews.dropbox.com/p/thumb/AA2bmB0h1l1qG9MTnKqevXaEUJeXDdR9A4pRzqiheZizWkZ1toXd9gull33DXy4NSmD4ptz19q4363tH7Qmcc9P5LY0_cabpoSO5BsfWYuH-nvhFhPbEhjYROikTBwPhE7JAFGJY_wbJ9LNaFI4r1habdRAp2mSjsf8lbJSiMu4oO-x6cAYRhtz9yu6ZCQMAFJaSBsJW67s3Cte5ISbRn9qydNV2II1VuBnb23-Clk8LRfGKTk86wrlo4ZVaahzRyE6YZDO6NdzOXobv7JPUrGhPY_r3XcuxokyKtrd2zexNBFogb_ivd6j7FG0YaXy0upZienG87rdXAFLF7oPTJRxvtyo7aPDnmdgFxQVMuNV5Vg/p.png?fv_content=true&size_mode=5' alt='Logo' className='title'></img>
        <Link to='/'>
          <button className='logoutButton logout'>Logout</button>
        </Link>
        <Link to='/dashboard'>
          <button className='logoutButton'>Home</button>  
        </Link>
        <Link to='/hobby'>
          <button className='logoutButton'>Hobbies</button>
        </Link>
        <Link to='/dashboard'>
          <button className='logoutButton'>Profile</button>
        </Link>
        
        
    </div>
  )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Nav)