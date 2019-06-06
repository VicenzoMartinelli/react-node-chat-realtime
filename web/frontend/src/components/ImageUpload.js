import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import { red, green } from 'ansi-colors';

class ImageUpload extends Component {

    renderChild = (isDragActive, isDragReject, isDragAccept, child) => {
        
        return (
            isDragActive ? <div>Dropa ae</div> : isDragReject ? <div>da não mano</div> :
            this.props.children
        );
    }

    render() {
        return (
            <Dropzone accept="image/*" onDrop={this.props.onDrop}>
                {({ getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept }) => (
                    <div {...getRootProps({})}>
                        <input {...getInputProps()} />
                        {
                            this.renderChild(isDragActive, isDragReject, isDragAccept, this.props.children)
                        }
                    </div>
                )}
            </Dropzone>
        );
    }
}

export default ImageUpload;