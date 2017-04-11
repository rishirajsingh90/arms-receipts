import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import CaseFees from './caseFees/CaseFees';
import CreateReceiptSteps from '../common/CreateReceiptSteps';
import CarTransport from './carTransport/CarTransport';
import AirlineTickets from './airlineTickets/AirlineTickets';
import AircraftCharter from './aircraftCharter/AircraftCharter';

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
    this.setState({ activeStep: activeStep });
  }
  render() {
    return (
      <div>
        <Form>
          <CreateReceiptSteps setStep={this.setStep.bind(this)} />
          <CaseFees activeStep={this.state.activeStep} />
          <CarTransport activeStep={this.state.activeStep} />
          <AirlineTickets activeStep={this.state.activeStep} />
          <AircraftCharter activeStep={this.state.activeStep} />
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewReceipt;
