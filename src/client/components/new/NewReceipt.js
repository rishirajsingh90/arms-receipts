import React, { Component } from 'react';
import { Form, Divider } from 'semantic-ui-react';
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
      receiptDescription: "",
      isLoading: false
    };
    this.setStep = this.setStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  setStep(activeStep) {
    this.setState({ activeStep: activeStep });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true }, () => {
      Client.addReceipt(TotalsService.getReceipt(this.state.receiptDescription)).then(function(response) {
        browserHistory.push({
          pathName: 'review',
          state: {
            receiptCreatedMessage: response.message
          }
        });
      });
    });
  }
  render() {
    return (
      <div>
        <Form class="ui form" loading={this.state.isLoading} onSubmit={this.handleSubmit}>
          <CreateReceiptSteps setStep={this.setStep} />
          <h4>Receipt Description</h4>
          <Form.Group widths="equal">
            <Form.Input
                placeholder='Receipt Description' type='text'
                value={this.state.receiptDescription} onChange={e => this.setState({ receiptDescription: e.target.value })}
                name='description'>
            </Form.Input>
          </Form.Group>
          <Divider />
          <CaseFees activeStep={this.state.activeStep} />
          <CarTransport activeStep={this.state.activeStep} />
          <AirlineTickets activeStep={this.state.activeStep} />
          <AircraftCharter activeStep={this.state.activeStep} />
          <Form.Button content='Create receipt' />
        </Form>
      </div>
    );
  }
}

export default NewReceipt;
