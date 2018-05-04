import React from 'react';
import {Growl} from '../../helpers/primereact/components/growl/Growl';
import {FileUpload} from '../../helpers/primereact/components/fileupload/FileUpload';

class UploadImages extends React.Component {
    constructor(props) {
        super(props);
    }

    onUpload = (event)  => {
        this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    onBeforeSend = (event) => {
        let token = localStorage.getItem('token');
        event.xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
    render() {
        return (
            <div>
            <FileUpload name="demo[]" url="/images/upload" onUpload={this.onUpload} 
                                multiple={true} accept="image/*" maxFileSize={10000000} 
                                onBeforeSend = {this.onBeforeSend}
                                />
            <Growl ref={(el) => { this.growl = el; }}></Growl>
            </div>
        );
    }
}

export default UploadImages;