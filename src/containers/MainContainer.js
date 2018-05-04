import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Main from '../components/home/Main';
import { logIn} from  '../actions/auth.action';

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logIn: logIn }, dispatch);
}

let MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);
export default MainContainer;

