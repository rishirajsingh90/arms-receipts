import React from 'react';
import { Step, Icon } from 'semantic-ui-react';

class CreateReceiptSteps extends React.Component {
  constructor () {
    super();
    this.state = {
    };
    this.handleStepChange = this.handleStepChange.bind(this);
  }
  handleStepChange (e, { name }) {
    this.setState({ activeItem: name });
    this.props = name;
    console.log(this.props);
  }
  render () {
    const { activeItem } = this.props;
    return (
      <Step.Group>
        <Step name="caseHandling" active={activeItem === "caseHandling"} onClick={this.handleStepChange}>
          <Icon name="money" />
          <Step.Content>
            <Step.Title>Case Handling Fee</Step.Title>
          </Step.Content>
        </Step>
        <Step name="carTransport"  active={activeItem === "carTransport"} onClick={this.handleStepChange}>
          <Icon name="car" />
          <Step.Content>
            <Step.Title>Car Transport</Step.Title>
          </Step.Content>
        </Step>
        <Step name="airlineTickets"  active={activeItem === "airlineTickets"} onClick={this.handleStepChange}>
          <Icon name="plane" />
          <Step.Content>
            <Step.Title>Airline Tickets</Step.Title>
          </Step.Content>
        </Step>
        <Step name="aircraftCharter"  active={activeItem === "aircraftCharter"} onClick={this.handleStepChange}>
          <Icon name="plane" />
          <Step.Content>
            <Step.Title>Aircraft Charter</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  }
}

export default CreateReceiptSteps;
