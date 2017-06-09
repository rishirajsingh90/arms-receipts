import React, { Component } from 'react';
import { Step, Icon } from 'semantic-ui-react';
import coreConstants from '../../common/constants';

class CreateReceiptSteps extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeStep: "patientDetails"
    };
    this.handleStepChange = this.handleStepChange.bind(this);
  }
  componentDidMount() {
    this.props.setStep(this.state.activeStep);
  }
  handleStepChange (e, { name }) {
    this.setState({ activeStep: name });
    this.props.setStep(name);
  }
  render () {
    const { activeStep } = this.state;
    return (
      <Step.Group size="mini">
        <Step name={coreConstants.PATIENT_DETAILS_STATE}  active={activeStep === coreConstants.PATIENT_DETAILS_STATE} onClick={this.handleStepChange}>
          <Icon name="user" />
          <Step.Content>
            <Step.Title>Patient Details</Step.Title>
          </Step.Content>
        </Step>
        <Step name={coreConstants.CASE_FEE_STATE} active={activeStep === coreConstants.CASE_FEE_STATE} onClick={this.handleStepChange}>
          <Icon name="money" />
          <Step.Content>
            <Step.Title>Case Handling Fee</Step.Title>
          </Step.Content>
        </Step>
        <Step name={coreConstants.CAR_TRANSPORT_STATE}  active={activeStep === coreConstants.CAR_TRANSPORT_STATE} onClick={this.handleStepChange}>
          <Icon name="car" />
          <Step.Content>
            <Step.Title>Car Transport</Step.Title>
          </Step.Content>
        </Step>
        <Step name={coreConstants.AIRLINE_TICKETS_STATE}  active={activeStep === coreConstants.AIRLINE_TICKETS_STATE} onClick={this.handleStepChange}>
          <Icon name="ticket" />
          <Step.Content>
            <Step.Title>Airline Tickets</Step.Title>
          </Step.Content>
        </Step>
        <Step name={coreConstants.AIRCRAFT_CHARTER_STATE}  active={activeStep === coreConstants.AIRCRAFT_CHARTER_STATE} onClick={this.handleStepChange}>
          <Icon name="plane" />
          <Step.Content>
            <Step.Title>Aircraft Charter</Step.Title>
          </Step.Content>
        </Step>
        <Step name={coreConstants.AMBULANCE_FEE_STATE}  active={activeStep === coreConstants.AMBULANCE_FEE_STATE} onClick={this.handleStepChange}>
          <Icon name="ambulance" />
          <Step.Content>
            <Step.Title>Ambulance Fees</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  }
}
CreateReceiptSteps.propTypes = {
  setStep: React.PropTypes.func
};

export default CreateReceiptSteps;
