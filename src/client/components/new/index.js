import React, { Component } from 'react';
import { Form, Divider, Grid } from 'semantic-ui-react';
import CreateReceiptSteps from './createReceiptSteps';
import PatientDetails from './patientDetails';
import CaseFees from './caseFees';
import CarTransport from './carTransport';
import AirlineTickets from './airlineTickets';
import AircraftCharter from './aircraftCharter';
import AmbulanceFees from './ambulanceFees';
import RunningTotals from './runningTotals';
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
    this.updateReceipt = this.updateReceipt.bind(this);
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
  updateReceipt() {
    const existingId = this.state.existingReceipt._id;
    const receipt = TotalsService.buildReceipt(existingId, this.state.description);
    this.setState({ updatedReceipt: receipt });
  }
  handleSubmit(e) {
    e.preventDefault();
    const existingId = this.state.existingReceipt._id;
    const receipt = TotalsService.buildReceipt(existingId, this.state.description);
    this.setState({ isLoading: true }, () => {
      Client.upsertReceipt(receipt).then(function(response) {
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
        <CreateReceiptSteps setStep={this.setStep} />
        <Grid columns={2}>
          <Grid.Column width={12}>
            <Form class="ui form" loading={this.state.isLoading} onSubmit={this.handleSubmit}>
              <h4>Receipt Description</h4>
              <Form.Group widths="equal">
                <Form.Input
                  placeholder='Receipt Description' type='text' value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })} name='description' error={!this.state.description} />
              </Form.Group>
              <Divider />
              <PatientDetails activeStep={this.state.activeStep} existingPatientDetails={this.state.existingReceipt.patientDetails} updateReceipt={this.updateReceipt} />
              <CaseFees activeStep={this.state.activeStep} existingCaseFees={this.state.existingReceipt.caseFee} updateReceipt={this.updateReceipt} />
              <CarTransport activeStep={this.state.activeStep} existingCarTransport={this.state.existingReceipt.carTransport} updateReceipt={this.updateReceipt} />
              <AirlineTickets activeStep={this.state.activeStep} existingAirlineTickets={this.state.existingReceipt.airlineTicket} updateReceipt={this.updateReceipt} />
              <AircraftCharter activeStep={this.state.activeStep} existingAircraftCharter={this.state.existingReceipt.aircraftCharter} updateReceipt={this.updateReceipt} />
              <AmbulanceFees activeStep={this.state.activeStep} existingAmbulanceFees={this.state.existingReceipt.ambulanceFee} updateReceipt={this.updateReceipt} />
              <Form.Button content={this.props.routeParams.receiptId ? 'Update receipt' : 'Create receipt'} />
            </Form>
          </Grid.Column>
          <Grid.Column width={4}>
            <RunningTotals existingReceipt={this.state.existingReceipt} updatedReceipt={this.state.updatedReceipt} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

NewReceipt.propTypes = {
  routeParams: React.PropTypes.object
};

export default NewReceipt;
