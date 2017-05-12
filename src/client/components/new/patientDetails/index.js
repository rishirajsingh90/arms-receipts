import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import ReceiptHandler from '../../common/ReceiptHandler';
import SingleDate from '../../common/SingleDate';

class PatientDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleDOB = this.handleDOB.bind(this);
  }
  handleDOB(day, { selected }) {
    if (selected) {
      ReceiptHandler.handleDOB(day, this);
    }
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
            defaultValue={this.state.firstName} name='firstName' label="First name">
          </Form.Input>
          <Form.Input
            placeholder='Last name'  type='text' onChange={e => ReceiptHandler.handleChange('lastName', e.target.value, this, true)}
            defaultValue={this.state.lastName} name='lastName' label="Last name">
          </Form.Input>
        </Form.Group>
        <h4>Date of Birth</h4>
        <Form.Group>
          <SingleDate/>
        </Form.Group>
      </div>
    );
  }
}

PatientDetails.propTypes = {
  activeStep: React.PropTypes.string
};

export default PatientDetails;
