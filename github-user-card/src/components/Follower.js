import React from 'react'

class Follower extends React.Component {

    render() {
      if (this.props.userData.followers === 0) {
          return (
              <div>This user has no followers</div>
          )
      } else {
          return (
              <div>
                  {
                      this.props.followerData.map(follower => {
                          return (
                              <div>
                                  <h2>{follower.login}</h2>
                                  <div>
                                      <img src={follower.avatar_url}/>
                                  </div>
                              </div>
                          )
                      })
                  }
              </div>
          )
      }
    }
}

export default Follower;