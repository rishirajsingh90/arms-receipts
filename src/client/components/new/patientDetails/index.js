import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import ReceiptHandler from '../../common/ReceiptHandler';
import coreConstants from '../../common/constants';

class PatientDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {
      error: {},
      firstName: this.props.existingPatientDetails ? this.props.existingPatientDetails.firstName : "",
      lastName: this.props.existingPatientDetails ? this.props.existingPatientDetails.lastName : "",
      dob: this.props.existingPatientDetails ? this.props.existingPatientDetails.dob : ""
    };
  }
  render() {

    if (this.props.activeStep !== coreConstants.PATIENT_DETAILS_STATE) {
      return null;
    }

    return (
      <div>
        <h4>Patient Information</h4>
        <Form.Group widths="equal">
          <Form.Input
            placeholder='First name'  type='text' onChange={e => ReceiptHandler.handleChange('firstName', e.target.value, this, true, this.props.updateReceipt)}
            value={this.state.firstName} name='firstName' label="First name" />
          <Form.Input
            placeholder='Last name'  type='text' onChange={e => ReceiptHandler.handleChange('lastName', e.target.value, this, true, this.props.updateReceipt)}
            value={this.state.lastName} name='lastName' label="Last name" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            name='dob'
            placeholder='DD/MM/YYYY'
            label='Date of birth'
            value={this.state.dob}
            onChange={e => ReceiptHandler.handleDate('dob', e.target.value, this, this.props.updateReceipt)}
            error={this.state.error.dob} />
        </Form.Group>
      </div>
    );
  }
}

PatientDetails.propTypes = {
  activeStep: React.PropTypes.string,
  existingPatientDetails: React.PropTypes.object,
  updateReceipt: React.PropTypes.func
};

export default PatientDetails;
