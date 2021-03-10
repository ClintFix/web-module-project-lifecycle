
import './App.css';
import React from 'react'
import axios from 'axios'
import UserCard from './components/UserCard'
import Follower from './components/Follower'

class App extends React.Component {
  state = {
    user: '',
    follower: '',
    userData: [],
    followerData: [],
  }

  fetchData(userToFetch){
    const userUrl = `https://api.github.com/users/${userToFetch}`;
    const followersUrl = `https://api.github.com/users/${userToFetch}/followers`;
    
    const userRequest = axios.get(userUrl);
    const followerRequest = axios.get(followersUrl);

    axios.all([userRequest, followerRequest])
      .then(axios.spread((...responses) => {
        const userResponse = responses[0];
        const followerResponse = responses[1];

        this.setState({
          userData: userResponse.data, // returns single object
          followerData: followerResponse.data, //returns array of follower objects
          user: '',
          // follower: '',
        })
      }))
      .catch(err => console.log(`Axios Error`, err))
  }

  componentDidUpdate(prevProps, prevState){
    console.log('Previous State:', prevState)
    console.log('Current State:', this.state)
    if(prevState.follower !== this.state.follower){
      this.fetchData(this.state.follower);
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
    this.fetchData(this.state.user);
  }

  handleFollowerClick = (followerLogin) => {
    this.setState({
      follower: followerLogin
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
