import React, {Component} from 'react'
import axios from 'axios'
import './Hobby.css'
import {connect} from 'react-redux'

class Hobby extends Component {

  constructor(){
    super()
    this.state = {
      hobbies: [],
      editMode: false,
      description: '',
      hobby: '',
      hobbyImage: ''
    }
  }


  componentMounting() {
    const userId = this.props.userId
    axios.get(`/api/hobby/${userId}`)
    .then(res => {
      console.log(res.data)
      console.log(this.props)
      this.setState({
        hobbies: res.data,
        editMode: false
      })
    })
    console.log(this.state)
  }

  componentDidMount(){
    this.componentMounting()
    // const userId = this.props.userId
    // axios.get(`/api/hobby/${userId}`)
    // .then(res => {
    //   console.log(res.data)
    //   console.log(this.props)
    //   this.setState({
    //     hobbies: res.data
    //   })
    // })
    // console.log(this.state)
  }

  

  createHobby() {
    const {hobby, hobbyImage} = this.state
    const userId = this.props.userId
    axios.post('/api/hobby', {hobby, hobbyImage, userId})
    .then(() => this.componentMounting())
    this.setState({
      hobby: '',
      hobbyImage: ''
    })
    
  }

  deleteHobby(id){
    axios.delete(`/api/hobby/${id}`)
    .then(this.componentMounting())
  }

  updateHobby(id){
    const body = this.state.description
    axios.put(`/api/hobby/${id}`, {body})
    .then(this.componentMounting())
  }

  changeHandler(e){
    this.setState({
      description: e.target.value
    })
    console.log(this.state)
  }

  stateChangeHandler(e){
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
  }


  render() {
    const {hobby, hobbyImage} = this.state
    const hobbyMap = this.state.hobbies.map(element => (
      <div key={element.id} className='hobbyMap'>
      
        <h3 className='mapHobbyName'>{element.hobby}</h3>
        <img alt='hobbies' className='hobbyImage' src={element.hobby_image}/>
        <p className='hobbyDescription'>{element.description}</p>
        <div className='buttonContainer'>
          
            {this.state.editMode ? (
              <input onChange={e => this.changeHandler(e)}
              />
            ) : (
              <button className='editButton'
              onClick={() => this.setState({editMode: true})}
              >Edit</button>
            )}

            {this.state.editMode ? (
              <button className='editButton'
              onClick={() => this.updateHobby(element.id)}
              >Save Changes</button>
            ) : (
              <button className='editButton'
              onClick={() => this.deleteHobby(element.id)}
              >Delete</button>
            )}
          
        </div>
      </div>
    ))
    return(
      <div className='hobbyMain'>
        <h2 className='hobbyTitle'>This is where you can browse the highlights of your life, so others can't see!</h2>
          <div className='hobbyDisplay'>
            {hobbyMap}
          </div>
          <div className='createHobbyContainer'>
              <input placeholder='Hobby Name'type='text'
                name='hobby'
                value={hobby}
                onChange={e => this.stateChangeHandler(e)}
                />
              <input placeholder='Hobby Image'type='text'
                name='hobbyImage'
                value={hobbyImage}
                onChange={e => this.stateChangeHandler(e)}
                />
              <button type='submit' className='createHobbyButton' onClick={() => this.createHobby()}>Create Hobby</button>
            </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Hobby)