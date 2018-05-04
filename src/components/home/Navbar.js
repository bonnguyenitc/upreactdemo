import React from 'react';
import {Link, IndexLink} from 'react-router';


class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    logOut = () => {
        this.props.logOut();
        localStorage.removeItem('token');
    }
    render() {
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li><IndexLink to="/" activeClassName="active">UP</IndexLink></li>
                        { this.props.auth.id && <li><Link to="/upload-images" activeClassName="active">Upload Images</Link></li>}
                        { this.props.auth.id && <li><Link to="/upload-video" activeClassName="active">Upload Videos</Link></li>}
                    </ul>
                </div>
                <div className="top-bar-right">
                        {this.props.auth.id && <button className="button alert" onClick = { this.logOut } >Log Out</button>}
                </div>
            </div>
        );
    }
}


export default Navbar;