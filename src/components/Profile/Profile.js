import React, {Component} from 'react'


class Profile extends Component {

  constructor(){
    super()
    this.state = {
      name: '',
      age: '',
      aboutMe: '',
      profileImage: ''
    }
  }

  componentDidMount() {
    //fetch and populate state
  }

  render() {
    return(
      <h1>Profile</h1>
    )
  }
}

export default Profile