import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import HandlingFees from './HandlingFees';
import CreateReceiptSteps from '../common/CreateReceiptSteps';

class NewReceipt extends React.Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      countries: [],
      value: null,
      activeStep: null
    };
  }
  setStep(activeStep) {
    this.setState({activeStep: activeStep});
  }
  render() {
    return (
      <div>
        <Form>
          <CreateReceiptSteps setStep={this.setStep.bind(this)}/>
          <HandlingFees activeStep={this.state.activeStep}/>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewReceipt;
