import React from 'react';
import axios from 'axios';
const jwt = require('jsonwebtoken');
class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let {username, password} = this.refs;
        axios.post('/login', {
            username: username.value,
            password: password.value
        })
        .then( (response) => {
            // console.log(response.data.message);
            localStorage.setItem('token', response.data.message);
            let token = response.data.message;
            jwt.verify(token, 'thoaint-softworldvn', (err, decoded) => {
                this.props.logIn(decoded);
            });
        })
        .catch( (error)=> {
            console.log(error);
        });
    }


    render() {
        return (
            <div>
                <h2>Đăng nhập</h2>
                <form onSubmit = { this.handleSubmit }>
                    <div class="form-group">
                        <label for="username">Tên đăng nhập</label>
                        <input type="text" class="form-control" ref="username" id="username" name="username" placeholder="Tên đăng nhập"/>
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu</label>
                        <input type="password" class="form-control" ref="password" id="password" name="password" placeholder="Mật khẩu"/>
                    </div>

                    <button type="submit" class="button">Đăng nhập</button> 
                </form>
            </div>
        );
    }
}
export default Login;