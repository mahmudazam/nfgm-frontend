
import React from 'react';
import { Panel, FormControl } from 'react-bootstrap/lib';

class FileUploadComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    event.preventDefault();
    let newState = {};
    let nodeId = event.target.id;
    let nodeValue = event.target.value;
    let nodeFile = null;
    if(event.target.files[0]) {
      nodeFile = event.target.files[0];
    }
    let reader = new FileReader();
    reader.onloadend = () => {
      newState = {
        file: nodeFile,
        value: nodeValue.substr(12, nodeValue.length),
        imagePreviewUrl: reader.result
      }
      this.props.setFile(newState);
    }
    if(nodeFile instanceof Blob) {
      reader.readAsDataURL(nodeFile);
    } else {
      console.log('No file selected');
      this.props.setFile(this.props.image);
    }
  }

  render() {
    let imagePreviewUrl = this.props.image.imagePreviewUrl;
    return (
			<div className={this.props.className}>
        <Panel header={this.props.image.value}>
          {
            imagePreviewUrl
            ? (<img src={imagePreviewUrl} className='image'/>)
            : ""
          }
        </Panel>
        <label className='file-upload-button'>
          <input id='file' type='file'
            onChange={this.handleChange.bind(this)}
            style={{ display: 'none' }}/>
          Browse
        </label>
		  </div>
    );
  }
}

export default FileUploadComponent;
