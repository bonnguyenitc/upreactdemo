import React from 'react';
import {Growl} from '../../helpers/primereact/components/growl/Growl';
import {FileUpload} from '../../helpers/primereact/components/fileupload/FileUpload';

class UploadVideo extends React.Component {
    onUpload = (event)  => {
        this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }
    onFileSelect = (event) => {
        const file = event.files[0];
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const blob = new Blob([fileReader.result], {type: file.type});
            const url = URL.createObjectURL(blob);
            const video = document.createElement('video');
            const timeupdate = function() {
            if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
                video.pause();
            }
            };
            video.addEventListener('loadeddata', function() {
            if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
            }
            });
            const snapImage = function() {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const image = canvas.toDataURL();
            const success = image.length > 100000;
            if (success) {
                const img = document.createElement('img');
                img.src = image;
                document.getElementById('thumb').appendChild(img);
                URL.revokeObjectURL(url);
            }
            return success;
            };
            video.addEventListener('timeupdate', timeupdate);
            video.preload = 'metadata';
            video.src = url;
            // Load video in Safari / IE11
            video.muted = true;
            // video.playsInline = true;
            video.play();
        };
        fileReader.readAsArrayBuffer(file);
        let input = document.getElementById('btn-input');
        input.setAttribute('disabled','disabled');
    }
    onBeforeSend = (event) => {
        let token = localStorage.getItem('token');
        event.xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
    render() {
        return (
            <div>
            <FileUpload name="demo[]" url="/videos/upload" onUpload={this.onUpload} 
                            accept="video/*" maxFileSize={1000000000} 
                            onSelect = { this.onFileSelect }
                            onBeforeSend = { this.onBeforeSend }
                            />
            <Growl ref={(el) => { this.growl = el; }}></Growl>
            </div>
        );
    }
}

export default UploadVideo;