import React from 'react'

class Follower extends React.Component {

    render() {
      if (this.props.userData.followers === 0) {
          return (
              <div>This user has no followers</div>
          )
      } else {
          return (
              <div className='followerCards'>
                  {
                      this.props.followerData.map(follower => {
                          return (
                              <div className='followerCard' onClick={() => this.props.handleFollowerClick(follower.login)}>
                                  <h2>{follower.login}</h2>
                                  <div>
                                      <img className='followerImg' src={follower.avatar_url}/>
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