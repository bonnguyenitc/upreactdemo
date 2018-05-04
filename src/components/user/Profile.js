import React from 'react';
import { Link } from 'react-router';

class Profile extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="columns large-4">
                    <div class="card" style={{width: 300, marginTop: 50}}>
                        <div class="card-divider">
                            <h4>{this.props.auth.username}</h4>
                        </div>
                        <img src={"http://localhost:3000/avatars/"+this.props.auth.avatar} />
                        <Link to="/upload-avatar" classname="class="success button>Edit</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;