import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';

class UploadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadPreview: [],
      filesToBeSent: [],
      filesPreview: [],
      uploadItems: [],
      upload: '',
      printCount: 3,
      message: '',
      uploadDisabled: false,
    };
  }

  componentWillMount() {
    const printCount = 5;
    this.setState({
      printCount,
    });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const filesToBeSent = this.state.filesToBeSent;
    if (filesToBeSent.length < this.state.printcount) {
      filesToBeSent.push(acceptedFiles);
      const filesPreview = [];
      if (filesToBeSent.length) {
        for (let i in filesToBeSent) {
          filesPreview.push(
            <div>
              {filesToBeSent[i][0].name}
            </div>
          );
        }
      }
      this.setState({
        filesToBeSent,
        filesPreview,
      });
    } else {
      console.log('You have reached the limit of printing files at a time');
    }
  }

  handleSubmit() {
    console.log('do not navigate until isComplete flag is toggled');
  }

  removeItem(event, index) {
    const { uploadPreview } = this.state;
    const setPreview = uploadPreview.filter((_, i) => i !== index);
    this.setState({
      uploadPreview: setPreview,
    });
  }

  renderItems() {
    const placeholder = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png';
    const { uploadPreview } = this.state;
    console.log('upload preview', this.state.uploadPreview);
    return uploadPreview.map((item, index) => (
      <div
        key={item.id}
        className="upload__preview"
      >
        <img src={placeholder} alt="placeholder" />
        <button
          className="upload__remove"
          onClick={event => this.removeItem(event, index)}
        >
          Remove
        </button>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="drop">
          <Dropzone style={{ border: '1px solid red' }} onDrop={files => this.onDrop(files)}>
            <div className="drop__description">Drop the files in the box below, or click to select files to upload.</div>
          </Dropzone>

          <div className="upload__container">
            {this.state.filesPreview}
          </div>

          <div className="upload__message">
            {this.state.message}
          </div>
        </div>

        <div className="upload__button">
          <RaisedButton
            disabled={this.state.uploadDisabled}
            label="Upload Files"
            primary={true}
            style={{ marginTop: '20px' }}
            onClick={event => this.handleSubmit(event)}
          />
        </div>
      </div>
    );
  }
}

export default UploadContainer;
