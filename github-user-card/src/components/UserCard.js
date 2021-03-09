import React from 'react'

class UserCard extends React.Component {


    render() {
        if (this.props.userData.login){
            return (
                <div className='userCard'>
                    <h2>{`${this.props.userData.name}`}</h2>
                    <div>
                        <img className='userImg'src={`${this.props.userData.avatar_url}`}/>
                    </div>
                    <div className='location'>{`📍 ${this.props.userData.location}`}</div>
                    <div className='bio'>{`${this.props.userData.bio}`}</div>
                    <div className='followers'>
                        <div className="count">{`Followers: ${this.props.userData.followers}`}</div>
                        <div className="count">{`Following: ${this.props.userData.following}`}</div>
                    </div>
                </div>
            )
        } else {
            return <h2>Please enter a Github Username</h2>
        }
    }
}

export default UserCard;