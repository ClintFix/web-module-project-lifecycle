import React from 'react'

class UserCard extends React.Component {


    render() {
        if (this.props.userData.login){
            return (
                <div className='userCard'>
                    <h2>{`${this.props.userData.name}`}</h2>
                    <div className='userImg'>
                        <img src={`${this.props.userData.avatar_url}`}/>
                    </div>
                    <div>{`Bio: ${this.props.userData.bio}`}</div>
                    <div>{`Location: ${this.props.userData.location}`}</div>
                    <div>
                        <div>{`Followers: ${this.props.userData.followers}`}</div>
                        <div>{`Following: ${this.props.userData.following}`}</div>
                    </div>
                </div>
            )
        } else {
            return <h2>Please enter a Github Username</h2>
        }
    }
}

export default UserCard;