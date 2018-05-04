import React from 'react';
import Cropper from 'react-cropper';
import axios from 'axios';
const jwt = require('jsonwebtoken');

class UploadAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        src : null,
        cropResult: null,
        };
        this.cropImage = this.cropImage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.useDefaultImage = this.useDefaultImage.bind(this);
        this._crop = this._crop.bind(this);
    }
    
    onChange(e) {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
        files = e.dataTransfer.files;
        } else if (e.target) {
        files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
        this.setState({ src: reader.result });
        };
        reader.readAsDataURL(files[0]);
    }
    
    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
        return;
        }
        this.setState({
        cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        });
    }
    
    useDefaultImage() {
        this.setState({ src });
    }
    
    _crop() {
        // console.log(this.state.cropResult);
        let token = localStorage.getItem('token');
        let data = {dataUrl: this.state.cropResult, token: token }
        axios.post('/avatars/upload', {data : data})
        .then((response) => {
            // console.log(response.data.token);
            localStorage.setItem('token',response.data.token);
            jwt.verify(token, 'thoaint-softworldvn', (err, decoded) => {
                this.props.logIn(decoded);
            });
            location.reload();
        })
        .catch( (error)=> {
            console.log(error);
        });
    }
    render() {
        return (
        <div className="row">
            <div className="columns small-6">
                <div>
                <input type="file" onChange={this.onChange} />
                <button onClick={this.useDefaultImage}>Use default img</button>
                <br />
                <br />
                <Cropper
                    style={{ height: '100%', width: '100%' }}
                    aspectRatio={16 / 9}
                    preview=".img-preview"
                    guides={false}
                    src={this.state.src}
                    ref={cropper => { this.cropper = cropper; }}
                    
                />
                </div>
            </div>
            
            <div className="columns small-6">
                <div className="box" style={{ width: '50%', float: 'right' }}>
                    <h1>
                    <button onClick={this.cropImage}  className="button">
                        Crop Image
                    </button>
                    <button onClick={this._crop}  className="button success">
                        Upload
                    </button>
                    </h1>
                    <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" /> 
                    
                </div>
            </div>
            <br style={{ clear: 'both' }} />
        </div>
        );
    }
}

export default UploadAvatar;