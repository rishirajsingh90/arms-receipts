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
      activeItem: "caseHandling"
    };
  }
  render() {
    return (
      <div>
        <Form>
          <CreateReceiptSteps activeComponent={this.state.activeItem}/>
          <HandlingFees activeComponent={this.state.activeItem}/>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewReceipt;
