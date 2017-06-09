import React, { Component } from 'react';
import { Form, Divider, Grid, Loader } from 'semantic-ui-react';
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
import isEmpty from 'lodash/isEmpty';
import each from 'lodash/each';
import map from 'lodash/map';

class NewReceipt extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      isLoading: false,
      existingReceipt: {},
      companies: [],
      countries: [],
      commercialAirlines: [],
      charterAirlines: []
    };
    this.setStep = this.setStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateReceipt = this.updateReceipt.bind(this);
  }
  componentDidMount() {
    const receiptId = this.props.routeParams.receiptId;
    Promise.all([
      this.getCompanies(),
      this.getCountries(),
      this.getAirlines()
    ]).then((result) => {
      if (receiptId) {
        Client.search(receiptId, (receipts) => {
          const existingReceipt = receipts[0];
          const receipt = TotalsService.buildReceipt(existingReceipt._id, existingReceipt.description, existingReceipt, result[0], result[2]);
          this.setState({ existingReceipt: receipt });
          this.setState({ description: existingReceipt.description });
        });
      }
    });
  }
  setStep(activeStep) {
    this.setState({ activeStep: activeStep });
  }
  updateReceipt(key, value) {
    const existingId = this.state.existingReceipt._id;
    let receipt = this.state.existingReceipt;
    receipt[key] = value;
    receipt = TotalsService.buildReceipt(existingId, this.state.description, receipt, this.state.companies, this.state.airlines);
    this.setState({ existingReceipt: receipt });
  }
  handleSubmit(e) {
    e.preventDefault();
    const existingId = this.state.existingReceipt._id;
    const receipt = TotalsService.buildReceipt(existingId, this.state.description, this.state.existingReceipt, this.state.companies, this.state.airlines);
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
  getCompanies() {
    return Client.getCompanies((companies) => {
      companies = map(companies, function(company) {
        company.key = company._id;
        company.value = company.name;
        company.text = company.name;
        return company;
      });
      this.setState({ companies: companies });
      return companies;
    });
  }
  getCountries() {
    return Client.getCountries((countries) => {
      countries = map(countries , function (country) {
        return {
          key: country._id,
          value: country.value,
          text: country.value
        };
      });
      this.setState({ countries: countries });
      return countries;
    });
  }
  getAirlines() {
    return Client.getAirlines((airlines) => {
      const charterAirlines = [];
      const commercialAirlines = [];
      each(airlines, function(airline) {
        const displayedAirline = {
          key: airline._id,
          value: airline.name,
          text: airline.name
        };
        airline.charter ? charterAirlines.push(displayedAirline) : commercialAirlines.push(displayedAirline);
      });
      this.setState({ charterAirlines });
      this.setState({ commercialAirlines });
      return airlines;
    });
  }
  render() {
    let newReceiptBody = null;
    if (this.props.routeParams.receiptId) {
      if (!isEmpty(this.state.existingReceipt) && !isEmpty(this.state.companies) && !isEmpty(this.state.countries) ) {
        newReceiptBody = (
          <div>
            <PatientDetails activeStep={this.state.activeStep} existingPatientDetails={this.state.existingReceipt.patientDetails} updateReceipt={this.updateReceipt} />
            <CaseFees
              activeStep={this.state.activeStep} existingCaseFees={this.state.existingReceipt.caseFee}
              updateReceipt={this.updateReceipt} companies={this.state.companies} countries={this.state.countries} />
            <CarTransport activeStep={this.state.activeStep} existingCarTransport={this.state.existingReceipt.carTransport} updateReceipt={this.updateReceipt} />
            <AirlineTickets
              activeStep={this.state.activeStep} existingAirlineTickets={this.state.existingReceipt.airlineTicket}
              updateReceipt={this.updateReceipt} airlines={this.state.commercialAirlines} />
            <AircraftCharter
              activeStep={this.state.activeStep} existingAircraftCharter={this.state.existingReceipt.aircraftCharter}
              updateReceipt={this.updateReceipt} airlines={this.state.charterAirlines} />
            <AmbulanceFees activeStep={this.state.activeStep} existingAmbulanceFees={this.state.existingReceipt.ambulanceFee} updateReceipt={this.updateReceipt} />
          </div>
        );
      } else {
        newReceiptBody = (
          <Loader active>Loading content..</Loader>
        );
      }
    }

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
              {newReceiptBody}
              <Form.Button content={this.props.routeParams.receiptId ? 'Update receipt' : 'Create receipt'} />
            </Form>
          </Grid.Column>
          <Grid.Column width={4}>
            <RunningTotals existingReceipt={this.state.existingReceipt} />
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
