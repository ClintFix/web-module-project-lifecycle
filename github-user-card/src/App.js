import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios'
import UserCard from './components/UserCard'

class App extends React.Component {
  state = {
    user: '',
    userData: [],
    followerData: [],
  }

  //helper functions:
  handleChange = (e) => {
    this.setState({
      user: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userUrl = `https://api.github.com/users/${this.state.user}`;
    const followersUrl = `https://api.github.com/users/${this.state.user}/followers`;
    
    const userRequest = axios.get(userUrl);
    const followerRequest = axios.get(followersUrl);

    axios.all([userRequest, followerRequest])
      .then(axios.spread((...responses) => {
        const userResponse = responses[0];
        const followerResponse = responses[1];

        this.setState({
          userData: userResponse.data,
          followerData: followerResponse.data,
        })
      }))
  }

  render() {
      return (
        <div className="App">
            <h1>GitHub User Cards</h1>
            <form onSubmit={this.handleSubmit}>
              <input value={this.state.user} onChange={this.handleChange} placeholder="Enter GitHub Username"/>
              <button>🔎 Search</button>
            </form>
            <UserCard />
        </div>
    );
  }
}

export default App;
