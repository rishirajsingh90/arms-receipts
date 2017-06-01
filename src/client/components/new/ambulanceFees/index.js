import React, { Component } from 'react';
import { Form, Input, Dropdown } from 'semantic-ui-react';
import ReceiptHandler from '../../common/ReceiptHandler';
import Client from '../../Client';
import map from 'lodash/map';
import TotalsService from '../../../service/TotalsService';

class AmbulanceFees extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ambulanceProviders: [],
      error: {}
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
  }
  componentDidMount() {
    this.getAmbulanceProviders();
  }
  componentWillReceiveProps() {
    if (this.props.existingAmbulanceFees) {
      this.setState({
        provider: this.props.existingAmbulanceFees.provider,
        fromCity: this.props.existingAmbulanceFees.fromCity,
        toCity: this.props.existingAmbulanceFees.toCity,
        startDate: this.props.existingAmbulanceFees.startDate,
        endDate: this.props.existingAmbulanceFees.endDate,
        distance: this.props.existingAmbulanceFees.distance
      }, () => TotalsService.calculateAmbulanceFeeTotals(this.props.existingAmbulanceFees, 4.5)); // TODO fix this
    }
  }
  getAmbulanceProviders() {
    Client.getAmbulanceProviders((ambulanceProviders) => {
      ambulanceProviders = map(ambulanceProviders, function(providers) {
        return {
          key: providers._id,
          value: providers.name,
          text: providers.name
        };
      });
      this.setState({ ambulanceProviders: ambulanceProviders });
    });
  }
  handleStartDate(date) {
    ReceiptHandler.handleStartDate(date, this);
  }
  handleEndDate(date) {
    ReceiptHandler.handleEndDate(date, this);
  }
  handleDropDownChange(e, { id, value }) {
    ReceiptHandler.handleDropDownChange(e, { id, value }, this);
  }
  render() {

    if (this.props.activeStep !== 'ambulanceFees') {
      return null;
    }

    return (
      <div>
        <h4>Service Provider</h4>
        <Form.Group widths="equal">
          <Dropdown
            id='provider'
            options={this.state.ambulanceProviders}
            fluid labeled search selection className='icon'
            placeholder='Select Ambulance Provider'
            onChange={this.handleDropDownChange}
            defaultValue={this.state.provider}
            name="provider" />
        </Form.Group>
        <h4>Cities</h4>
        <Form.Group widths="equal">
          <Form.Field
            placeholder='From' onChange={e => ReceiptHandler.handleChange('fromCity', e.target.value, this, true)}
            defaultValue={this.state.fromCity} label="From" control={Input} name="fromCity" disabled={!this.state.provider} />
          <Form.Field
            placeholder='To' onChange={e => ReceiptHandler.handleChange('toCity', e.target.value, this, true)}
            defaultValue={this.state.toCity} label="To" control={Input} name="toCity" disabled={!this.state.provider} />
        </Form.Group>
        <h4>Dates</h4>
        <Form.Group widths="equal">
          <Form.Input
            name='startDate'
            placeholder='DD/MM/YYYY'
            label='Start'
            defaultValue={this.state.startDate}
            onChange={e => ReceiptHandler.handleDate('startDate', e.target.value, this)}
            error={this.state.error.startDate} />
          <Form.Input
            name='endDate'
            placeholder='DD/MM/YYYY'
            label='End'
            defaultValue={this.state.endDate}
            onChange={e => ReceiptHandler.handleDate('endDate', e.target.value, this)}
            error={this.state.error.endDate} />
        </Form.Group>
        <h4>Transport Information</h4>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              placeholder='Distance' type='number' labelPosition='right' label='km'
              onChange={e => ReceiptHandler.handleChange('distance', e.target.value, this)} defaultValue={this.state.distance}
              pattern="[0-9]*" name="distance" disabled={!this.state.provider} />
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

AmbulanceFees.propTypes = {
  activeStep: React.PropTypes.string,
  existingAmbulanceFees: React.PropTypes.object
};

export default AmbulanceFees;
