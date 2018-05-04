import React from 'react';
import Profile from '../user/Profile';
import LogIn from '../user/Login';
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            this.props.auth.id ?<Profile auth={this.props.auth}/>:<LogIn logIn = {this.props.logIn}/>
        );
    }
}

export default Main;