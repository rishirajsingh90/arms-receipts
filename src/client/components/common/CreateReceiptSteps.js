import React, { Component } from 'react';
import { Step, Icon } from 'semantic-ui-react';

class CreateReceiptSteps extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeStep: "caseHandling"
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
      <Step.Group>
        <Step name="caseHandling" active={activeStep === "caseHandling"} onClick={this.handleStepChange}>
          <Icon name="money" />
          <Step.Content>
            <Step.Title>Case Handling Fee</Step.Title>
          </Step.Content>
        </Step>
        <Step name="carTransport"  active={activeStep === "carTransport"} onClick={this.handleStepChange}>
          <Icon name="car" />
          <Step.Content>
            <Step.Title>Car Transport</Step.Title>
          </Step.Content>
        </Step>
        <Step name="airlineTickets"  active={activeStep === "airlineTickets"} onClick={this.handleStepChange}>
          <Icon name="ticket" />
          <Step.Content>
            <Step.Title>Airline Tickets</Step.Title>
          </Step.Content>
        </Step>
        <Step name="aircraftCharter"  active={activeStep === "aircraftCharter"} onClick={this.handleStepChange}>
          <Icon name="plane" />
          <Step.Content>
            <Step.Title>Aircraft Charter</Step.Title>
          </Step.Content>
        </Step>
        <Step name="ambulanceFees"  active={activeStep === "ambulanceFees"} onClick={this.handleStepChange}>
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
