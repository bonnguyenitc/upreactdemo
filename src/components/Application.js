import React from 'react';
import Navbar from './home/Navbar';
class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar auth={ this.props.auth }  logOut = {this.props.logOut}/>
                </div>
                <div className="grid-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Application;