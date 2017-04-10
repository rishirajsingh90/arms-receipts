import React from 'react';
import { Step } from 'semantic-ui-react';

class CreateReceiptSteps extends React.Component {
  constructor () {
    super();
    return {
      steps: {}
    };
  }
  handleStepChange () {
    this.setState({ active: !this.state.active });
  }
  render () {
    return (
      <Step.Group>
        <Step
          onClick={this.handleStepChange}
          title='Case Handling Fee'
        />
      </Step.Group>
    );
  }
}

export default CreateReceiptSteps;
