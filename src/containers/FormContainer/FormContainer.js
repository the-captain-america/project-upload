import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import { detailActions } from 'actions';
import { withRouter } from 'react-router';
import validatePassport from '../../helpers';

const defaultStyles = {
  root: {
    position: 'relative',
    paddingBottom: '0px',
  },
  input: {
    display: 'inline-block',
    width: '100%',
    padding: '10px',
  },
  autocompleteContainer: {
    position: 'absolute',
    top: '100%',
    backgroundColor: 'white',
    border: '1px solid #555555',
    width: '100%',
  },
  autocompleteItem: {
    backgroundColor: '#ffffff',
    padding: '10px',
    color: '#555555',
    cursor: 'pointer',
  },
  autocompleteItemActive: {
    backgroundColor: '#fafafa',
  },
};

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      showSubmit: true,
      dob: null,
      address: '',
    };
    this.onChangeAddress = address => this.setState({ address });
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  onSubmit() {
    console.log('address:', this.state.address);
    const {
      detail,
    } = this.props;
    if (!(detail.firstname.length > 0 &&
      detail.lastname.length > 0)) {
      this.setState({
        error: 'Please fill in each field',
      });
    } if (!(detail.passport.length <= 9)) {
      this.setState({
        error: 'Please check your passport number',
      });
    } else {
      this.setState({
        error: '',
      });
    }
    const value = this.props.detail.passport;
    const validate = validatePassport(value);
    if (validate === true && value.length === 9) {
      this.props.saveDetail(this.state.dob);
      this.props.saveDetail(this.state.address);
      this.props.history.push('/upload');
    } else {
      this.setState({
        error: 'Please review the fields',
      });
    }
  }

  handleDateChange(event, date) {
    // const createMoment = moment('DD-MM-YYYY').format(date);
    // this.setState({ dob: date });
    // const setMoment = createMoment(date);
    this.props.saveDetail({ dob: date });
    console.log('state', this.props.detail.dob);
  }

  handleFormSubmit(event) {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .catch(error => console.error('Error', error));
  }

  handleChange(e, value) {
    const inputValue = e.target.value;
    this.props.saveDetail({ [value]: inputValue });
  }

  // handleSelect(address, placeId) {
  //   this.setState({ address, placeId });
  // }

  renderError() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="error">
          <span>
            <i className="fa fa-exclamation-circle" aria-hidden="true" />
          </span>
          {this.state.error}
        </div>
      );
    }
    return null;
  }

  renderAutoComplete() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChangeAddress,
    };
    const AutocompleteItem = ({ suggestion }) => (
      <div style={{ backgroundColor: 'white' }}>
        <i className="fa fa-map-marker" />
        {suggestion}
      </div>
    );
    return (
      <PlacesAutocomplete
        inputProps={inputProps}
        autocompleteItem={AutocompleteItem}
        styles={defaultStyles}
      />
    );
  }

  renderDetails() {
    const { detail } = this.props;
    return (
      <ul className="input__list">
        <li>
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            floatingLabelFixed={true}
            onChange={e => this.handleChange(e, 'firstname')}
            value={detail.firstname}
          />
        </li>
        <li>
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            floatingLabelFixed={true}
            onChange={e => this.handleChange(e, 'lastname')}
            value={detail.lastname}
          />
        </li>
        <li>
          <DatePicker
            hintText="Date of Birth"
            openToYearSelection={true}
            value={detail.dob}
            onChange={this.handleDateChange}
          />
        </li>
        <li>
          {this.renderAutoComplete()}
        </li>
        <li>
          <TextField
            hintText="Passport Number"
            floatingLabelText="Passport Number"
            floatingLabelFixed={true}
            onChange={e => this.handleChange(e, 'passport')}
            value={detail.passport}
          />
        </li>
        <li>
          <RaisedButton
            label="Continue"
            primary={true}
            disabled={!this.state.showSubmit}
            onClick={this.onSubmit}
          />
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className="row" style={{ marginTop: '100px' }}>
        <div className="col-md-6">
          <div style={{ marginTop: '70px' }}className="content">
            <p>Welcome to the <strong>Secure Identity Portal</strong>, the one stop for managing and updating your secure information.  Please begin by filling in the fields.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content --styled">
            {this.renderError()}
            {this.renderDetails()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  detail: state.detail,
  isLoggedIn: state.detail.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  saveDetail: data => dispatch(detailActions.saveDetail(data)),
});

FormContainer.propTypes = {
  detail: PropTypes.object.isRequired,
  saveDetail: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const FormWithRouter = withRouter(connect(mapStateToProps,
  mapDispatchToProps)(FormContainer));

export default FormWithRouter;
