import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import CaseFees from './caseFees/CaseFees';
import CreateReceiptSteps from '../common/CreateReceiptSteps';
import CarTransport from './carTransport/CarTransport';
import AirlineTickets from './airlineTickets/AirlineTickets';
import AircraftCharter from './aircraftCharter/AircraftCharter';
import Client from '../Client';

class NewReceipt extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: null,
      caseFees: {},
      carTransport: {},
      airlineTickets: {},
      aircraftCharter: {}
    };
    this.setStep = this.setStep.bind(this);
    this.setCaseFees = this.setCaseFees.bind(this);
    this.setCarTransport = this.setCarTransport.bind(this);
    this.setAirlineTickets = this.setAirlineTickets.bind(this);
    this.setAircraftCharter = this.setAircraftCharter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  setStep(activeStep) {
    this.setState({ activeStep: activeStep });
  }
  setCaseFees(caseFees) {
    this.setState({ caseFees: caseFees });
  }
  setCarTransport(carTransport) {
    this.setState({ carTransport: carTransport });
  }
  setAirlineTickets(airlineTickets) {
    this.setState({ airlineTickets: airlineTickets });
  }
  setAircraftCharter(aircraftCharter) {
    this.setState({ aircraftCharter: aircraftCharter });
  }
  handleSubmit() {
    Client.addReceipt(this.state, (response) => {
      console.log(response);
    });
  }
  render() {
    return (
      <div>
        <Form>
          <CreateReceiptSteps setStep={this.setStep} />
          <CaseFees activeStep={this.state.activeStep} caseFees={this.state.caseFees} updateReceipt={this.setCaseFees} />
          <CarTransport activeStep={this.state.activeStep} carTransport={this.state.carTransport} updateReceipt={this.setCarTransport} />
          <AirlineTickets activeStep={this.state.activeStep} airlineTickets={this.state.airlineTickets} updateReceipt={this.setAirlineTickets} />
          <AircraftCharter activeStep={this.state.activeStep} aircraftCharter={this.state.aircraftCharter} updateReceipt={this.setAircraftCharter} />
          <Button type='submit' onClick={this.handleSubmit}>Create receipt</Button>
        </Form>
      </div>
    );
  }
}

export default NewReceipt;
