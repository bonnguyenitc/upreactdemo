import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Application from '../components/Application';
import { logIn, logOut } from  '../actions/auth.action';


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logIn: logIn, logOut: logOut }, dispatch);
}

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(Application);
export default AppContainer;

