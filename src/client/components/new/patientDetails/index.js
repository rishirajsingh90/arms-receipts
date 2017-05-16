import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import ReceiptHandler from '../../common/ReceiptHandler';

class PatientDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {
      error: {}
    };
  }
  componentWillReceiveProps() {
    if (this.props.existingPatientDetails) {
      this.setState({ firstName: this.props.existingPatientDetails.firstName });
      this.setState({ lastName: this.props.existingPatientDetails.lastName });
      this.setState({ dob: this.props.existingPatientDetails.dob });
    }
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
            defaultValue={this.state.firstName} name='firstName' label="First name" />
          <Form.Input
            placeholder='Last name'  type='text' onChange={e => ReceiptHandler.handleChange('lastName', e.target.value, this, true)}
            defaultValue={this.state.lastName} name='lastName' label="Last name" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            name='dob'
            placeholder='DD/MM/YYYY'
            label='Date of birth'
            defaultValue={this.state.dob}
            onChange={e => ReceiptHandler.handleDate('dob', e.target.value, this)}
            error={this.state.error.dob} />
        </Form.Group>
      </div>
    );
  }
}

PatientDetails.propTypes = {
  activeStep: React.PropTypes.string,
  existingPatientDetails: React.PropTypes.object
};

export default PatientDetails;
