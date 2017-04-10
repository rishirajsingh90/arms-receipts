import React, { Component } from 'react'
import { Step } from 'semantic-ui-react'

const CreateReceiptSteps = React.createClass({
  getInitialState: function () {
    return {
      steps: {}
    }
  },
  render: function () {
    return (
    <Step.Group>
      <Step title='Case Handling Fee' onClick={this.handleStepChange} />
    </Step.Group>
    );
  },
  handleStepChange: function() {
    this.setState({ active: !this.state.active });
  }
});

export default CreateReceiptSteps;