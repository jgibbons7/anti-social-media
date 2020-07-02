import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Home.css'
import Axios from 'axios'
import Chat from '../Chat/Chat'
import SMSForm from '../SMSForm/SMSForm';

class Home extends Component {

  constructor(){
    super()
    this.state = {
      hobby: '',
      hobbyImage: ''
    }
  }

  

  changeHandler(e){
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  render() {
    console.log(this.props)
    const {hobby, hobbyImage} = this.state
  return(
    <div className='homeMain'>
      <div id='header'>
        <p>Welcome {this.props.username}!</p>
      </div>
        <div className='subtitle'>
        <p>This is your safe space! Enjoy your stay.</p>
        </div>
          <div id='hobbyContainer'>
            <div className='innerHobbyContainer'>
              <button className='teaseButton'>News Feed</button>
              <button className='teaseButton'>Friends</button>
              <button className='teaseButton'>Marketplace</button>
            </div>
              <SMSForm/>
            <div>
              <Chat className='chat'/>
            </div>
          </div>
            
    </div>
    )
  }
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Home)