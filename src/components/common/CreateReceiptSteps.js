import React from 'react';
import { Step, Icon } from 'semantic-ui-react';

class CreateReceiptSteps extends React.Component {
  constructor () {
    super();
    this.state = {
      steps: {}
    };
  }
  handleStepChange () {
    this.setState({ active: !this.state.active });
  }
  render () {
    return (
      <Step.Group>
        <Step onClick={this.handleStepChange}>
          <Icon name="money"/>
          <Step.Content>
            <Step.Title>Case Handling Fee</Step.Title>
          </Step.Content>
        </Step>
        <Step onClick={this.handleStepChange}>
          <Icon name="car"/>
          <Step.Content>
            <Step.Title>Car Transport</Step.Title>
          </Step.Content>
        </Step>
        <Step onClick={this.handleStepChange}>
          <Icon name="plane"/>
          <Step.Content>
            <Step.Title>Airline Tickets</Step.Title>
          </Step.Content>
        </Step>
        <Step onClick={this.handleStepChange}>
          <Icon name="plane"/>
          <Step.Content>
            <Step.Title>Aircraft Charter</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  }
}

export default CreateReceiptSteps;
