import React, { Component } from 'react';
import { Form } from 'formsy-semantic-ui-react';
import ReceiptHandler from '../../common/ReceiptHandler';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class PatientDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleDOB = this.handleDOB.bind(this);
  }
  handleDOB(date) {
    ReceiptHandler.handleDOB(date, this);
  }
  render() {

    if (this.props.activeStep !== 'patientDetails') {
      return null;
    }

    return (
      <div>
        <h4>Patient Information</h4>
        <Form.Group widths="equal">
          <Form.Input
            placeholder='First name'  type='text' onChange={e => ReceiptHandler.handleChange('firstName', e.target.value, this, true)}
            defaultValue={this.state.firstName} name='firstName' label="First name">
          </Form.Input>
          <Form.Input
            placeholder='Last name'  type='text' onChange={e => ReceiptHandler.handleChange('lastName', e.target.value, this, true)}
            defaultValue={this.state.lastName} name='lastName' label="Last name">
          </Form.Input>
        </Form.Group>
        <h4>Date of Birth</h4>
        <Form.Group>
          <Form.Field
            name='dateOfBirth'
            placeholderText='Date of Birth'
            dateFormat='DD/MM/YYYY'
            selected={this.state.dob}
            onChange={this.handleDOB}
            control={DatePicker} />
        </Form.Group>
      </div>
    );
  }
}

PatientDetails.propTypes = {
  activeStep: PropTypes.string
};

export default PatientDetails;
