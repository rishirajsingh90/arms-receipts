import React from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
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
      activeStep: null,
      receipt: {
        caseFees: {},
        carTransport: {},
        airlineTickets: {},
        aircraftCharter: {}
      }
    };
  }
  setStep(activeStep) {
    this.setState({ activeStep: activeStep });
  }
  setCaseFees(caseFees) {
    this.setState({ caseFees: caseFees })
  }
  setCarTransport(carTransport) {
    this.setState({ carTransport: carTransport })
  }
  setAirlineTickets(airlineTickets) {
    this.setState({ airlineTickets: airlineTickets })
  }
  setAircraftCharter(aircraftCharter) {
    this.setState({ aircraftCharter: aircraftCharter })
  }
  render() {
    return (
      <div>
        <Form>
          <label>{this.state.receipt.caseFees.companyName}</label>
          <CreateReceiptSteps setStep={this.setStep.bind(this)} />
          <CaseFees activeStep={this.state.activeStep} caseFees={this.state.receipt.caseFees} updateReceipt={this.setCaseFees.bind(this)} />
          <CarTransport activeStep={this.state.activeStep} carTransport={this.state.carTransport} updateReceipt={this.setCarTransport.bind(this)} />
          <AirlineTickets activeStep={this.state.activeStep} airlineTickets={this.state.airlineTickets} updateReceipt={this.setAirlineTickets.bind(this)} />
          <AircraftCharter activeStep={this.state.activeStep} aircraftCharter={this.state.aircraftCharter} updateReceipt={this.setAircraftCharter.bind(this)} />
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewReceipt;
