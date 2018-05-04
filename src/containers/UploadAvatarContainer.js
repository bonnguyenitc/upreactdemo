import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UploadAvatar from '../components/upload-avatar/UploadAvatar';
import { logIn} from  '../actions/auth.action';

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logIn: logIn }, dispatch);
}

let UploadAvatarContainer = connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);
export default UploadAvatarContainer;

