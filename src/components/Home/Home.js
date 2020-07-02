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

  createHobby() {
    const {hobby, hobbyImage} = this.state
    const userId = this.props.userId
    Axios.post('/api/hobby', {hobby, hobbyImage, userId})
    .then(() => this.props.history.push('/hobby'))
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

          <div id='hobbyContainer'>
            <div className='innerHobbyContainer'>
              <button className='teaseButton'>News Feed</button>
              <button className='teaseButton'>Hobby</button>
              <button className='teaseButton'>Hobby</button>
              <SMSForm/>
            </div>
            <div>
              <Chat className='chat'/>
            </div>
          </div>
            <div className='createHobbyContainer'>
              <input placeholder='Hobby Name'type='text'
                name='hobby'
                value={hobby}
                onChange={e => this.changeHandler(e)}
                />
              <input placeholder='Hobby Image'type='text'
                name='hobbyImage'
                value={hobbyImage}
                onChange={e => this.changeHandler(e)}
                />
              <button type='submit' className='createHobbyButton' onClick={() => this.createHobby()}>Create Hobby</button>
            </div>
    </div>
    )
  }
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Home)