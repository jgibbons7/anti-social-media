import React, {Component} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import './Hobby.css'


class Hobby extends Component {

  constructor(){
    super()
    this.state = {
      hobbies: []
    }
  }

  componentDidMount(){
    const userId = this.props.userId
    Axios.get('/api/hobby', userId)
    .then(res => {
      this.setState({
        hobbies: res.data
      })
    })
    console.log(this.state)
  }

  render() {

    return(
      <div>
        <Link className='logoutButton' to='/'>Logout</Link>
        <h1>Hobby Page</h1>
        <img src={this.state.hobbyImage}/>
      </div>
    )
  }
}

export default Hobby