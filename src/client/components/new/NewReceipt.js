import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import CaseFees from './caseFees/CaseFees';
import CreateReceiptSteps from '../common/CreateReceiptSteps';
import CarTransport from './carTransport/CarTransport';
import AirlineTickets from './airlineTickets/AirlineTickets';
import AircraftCharter from './aircraftCharter/AircraftCharter';
import Client from '../Client';
import TotalsService from './../../service/TotalsService';
import { browserHistory } from 'react-router';

class NewReceipt extends Component {
  constructor() {
    super();
    this.state = {
      receiptDescription: ""
    };
    this.setStep = this.setStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  setStep(activeStep) {
    this.setState({ activeStep: activeStep });
  }
  handleSubmit() {
    Client.addReceipt(TotalsService.getReceipt(this.state.receiptDescription), (response) => {
      browserHistory.push({
        pathName: '/#/review',
        state: {
          receiptCreatedMessage: response.message
        }
      });
    });
  }
  render() {
    return (
      <div>
        <Form>
          <CreateReceiptSteps setStep={this.setStep} />
          <Form.Group inline>
            <label>Receipt Description</label>
            <Form.Field>
              <Input
                placeholder='Receipt Description' type='text' value={this.state.receiptDescription}
                onChange={e => this.setState({ receiptDescription: e.target.value })}>
              </Input>
            </Form.Field>
          </Form.Group>
          <CaseFees activeStep={this.state.activeStep} />
          <CarTransport activeStep={this.state.activeStep} />
          <AirlineTickets activeStep={this.state.activeStep} />
          <AircraftCharter activeStep={this.state.activeStep} />
          <Button type='submit' onClick={this.handleSubmit}>Create receipt</Button>
        </Form>
      </div>
    );
  }
}

export default NewReceipt;
