import React, { Component } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import CreateReceiptSteps from './createReceiptSteps';
import PatientDetails from './patientDetails';
import CaseFees from './caseFees';
import CarTransport from './carTransport';
import AirlineTickets from './airlineTickets';
import AircraftCharter from './aircraftCharter';
import AmbulanceFees from './ambulanceFees';
import Client from '../Client';
import TotalsService from './../../service/TotalsService';
import { browserHistory } from 'react-router';

class NewReceipt extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      isLoading: false,
      existingReceipt: {}
    };
    this.setStep = this.setStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.routeParams.receiptId) {
      Client.search(this.props.routeParams.receiptId, (receipts) => {
        const existingReceipt = receipts[0];
        this.setState({ existingReceipt });
        this.setState({ description: existingReceipt.description });
      });
    } else {
      TotalsService.initTotals();
    }
  }
  setStep(activeStep) {
    this.setState({ activeStep: activeStep });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true }, () => {
      const existingId = this.state.existingReceipt._id;
      Client.upsertReceipt(TotalsService.buildReceipt(existingId, this.state.description)).then(function(response) {
        browserHistory.push({
          pathName: 'review',
          state: {
            receiptMessage: response.message
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
              placeholder='Receipt Description' type='text' value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })} name='description' error={!this.state.description} />
          </Form.Group>
          <Divider />
          <PatientDetails activeStep={this.state.activeStep} existingPatientDetails={this.state.existingReceipt.patientDetails} />
          <CaseFees activeStep={this.state.activeStep} existingCaseFees={this.state.existingReceipt.caseFee} />
          <CarTransport activeStep={this.state.activeStep} existingCarTransport={this.state.existingReceipt.carTransport} />
          <AirlineTickets activeStep={this.state.activeStep} existingAirlineTickets={this.state.existingReceipt.airlineTicket} />
          <AircraftCharter activeStep={this.state.activeStep} existingAircraftCharter={this.state.existingReceipt.aircraftCharter} />
          <AmbulanceFees activeStep={this.state.activeStep} existingAmbulanceFees={this.state.existingReceipt.ambulanceFee} />
          <Form.Button content={this.props.routeParams.receiptId ? 'Update receipt' : 'Create receipt'} />
        </Form>
      </div>
    );
  }
}

NewReceipt.propTypes = {
  routeParams: React.PropTypes.object
};

export default NewReceipt;
