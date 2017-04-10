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
      value: null
    };
  }
  render() {
    return (
      <div>
        <Form>
          <CreateReceiptSteps activeState="handlingFee" />
          <HandlingFees />
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewReceipt;
