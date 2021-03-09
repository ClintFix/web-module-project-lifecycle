
import './App.css';
import React from 'react'
import axios from 'axios'
import UserCard from './components/UserCard'
import Follower from './components/Follower'

class App extends React.Component {
  state = {
    user: '',
    userData: [],
    followerData: [],
  }

  fetchData(){
    const userUrl = `https://api.github.com/users/${this.state.user}`;
    const followersUrl = `https://api.github.com/users/${this.state.user}/followers`;
    
    const userRequest = axios.get(userUrl);
    const followerRequest = axios.get(followersUrl);

    axios.all([userRequest, followerRequest])
      .then(axios.spread((...responses) => {
        const userResponse = responses[0];
        const followerResponse = responses[1];

        this.setState({
          userData: userResponse.data, // returns single object
          followerData: followerResponse.data, //returns array of follower objects
          user: ''
        })
      }))
  }

  componentDidUpdate(prevProps, prevState){
    console.log('Previous State:', prevState)
    console.log('Current State:', this.state)
    if(prevState.user === ""){
      this.fetchData()
    } else {
      console.log('did not fetch new data')
    }
  }

  //helper functions:
  handleChange = (e) => {
    this.setState({
      user: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchData();
  }

  handleFollowerClick = (followerLogin) => {
    this.setState({
      user: followerLogin
    })
  }

  render() {
      return (
        <div className="App">
            <h1>GitHub User Cards</h1>
            <form onSubmit={this.handleSubmit}>
              <input value={this.state.user} onChange={this.handleChange} placeholder="Enter GitHub Username"/>
              <button>🔎 Search</button>
            </form>
            <UserCard userData={this.state.userData}/>
            <div className='followerCards'>
              <Follower userData={this.state.userData} followerData={this.state.followerData} handleFollowerClick={this.handleFollowerClick}/>
            </div>
        </div>

    );
  }
}

export default App;
