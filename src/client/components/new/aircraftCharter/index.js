import React, { Component } from 'react';
import { Form, Input, Dropdown } from "semantic-ui-react";
import ReceiptHandler from '../../common/ReceiptHandler';
import Client from '../../Client';
import reduce from 'lodash/reduce';
import TotalsService from '../../../service/TotalsService';

class AircraftCharter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {}
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
  }
  componentDidMount() {
    this.getAirlines();
  }
  componentWillReceiveProps() {
    if (this.props.existingAircraftCharter) {
      this.setState({
        provider: this.props.existingAircraftCharter.provider,
        aircraftType: this.props.existingAircraftCharter.aircraftType,
        fromCity: this.props.existingAircraftCharter.fromCity,
        toCity: this.props.existingAircraftCharter.toCity,
        startDate: this.props.existingAircraftCharter.startDate,
        endDate: this.props.existingAircraftCharter.endDate,
        flyingTime: this.props.existingAircraftCharter.flyingTime
      }, () => TotalsService.calculateAircraftCharterTotals(this.props.existingAircraftCharter, this.state.airlines));
    }
  }
  getAirlines() {
    Client.getAirlines((airlines) => {
      airlines = reduce(airlines, function(result, airline) {
        if (airline.charter) {
          result.push({
            key: airline._id,
            value: airline.name,
            text: airline.name
          });
        }
        return result;
      }, []);
      this.setState({ airlines: airlines });
    });
  }
  handleSelectChange(e, { name, value, checked }) {
    ReceiptHandler.handleSelectChange(e, { name, value, checked }, this, this.props.updateReceipt);
  }

  handleStartDate(date) {
    ReceiptHandler.handleStartDate(date, this, this.props.updateReceipt);
  }
  handleEndDate(date) {
    ReceiptHandler.handleEndDate(date, this, this.props.updateReceipt);
  }
  handleDropDownChange(e, { id, value }) {
    ReceiptHandler.handleDropDownChange(e, { id, value }, this, this.props.updateReceipt);
  }

  render() {

    const { aircraftType } = this.state;

    if (this.props.activeStep !== "aircraftCharter") {
      return null;
    }

    return (
      <div>
        <h4>Service Provider</h4>
        <Form.Group>
          <Dropdown
            id='provider'
            options={this.state.airlines}
            fluid labeled search selection className='icon'
            placeholder='Select Airline'
            onChange={this.handleDropDownChange}
            defaultValue={this.state.provider}
            name="provider" />
        </Form.Group>
        <h4>Aircraft Type</h4>
        <Form.Group>
          <Form.Radio
            name="aircraftType" label='Jet' value='jet' checked={aircraftType === 'jet'}
            onChange={this.handleSelectChange} disabled={!this.state.provider} />
          <Form.Radio
            name="aircraftType" label='Turboprop' value='turboprop'
            checked={aircraftType === 'turboprop'} onChange={this.handleSelectChange} disabled={!this.state.provider} />
        </Form.Group>
        <h4>Cities</h4>
        <Form.Group widths="equal">
          <Form.Field
            placeholder="From" onChange={e => ReceiptHandler.handleChange('fromCity', e.target.value, this, true, this.props.updateReceipt)}
            defaultValue={this.state.fromCity} label="From" control="input" name="fromCity" disabled={!this.state.provider} />
          <Form.Field
            placeholder="To" onChange={e => ReceiptHandler.handleChange('toCity', e.target.value, this, true, this.props.updateReceipt)}
            defaultValue={this.state.toCity} label="To" control="input" name="toCity" disabled={!this.state.provider} />
        </Form.Group>
        <h4>Dates</h4>
        <Form.Group widths="equal">
          <Form.Input
            name='startDate'
            placeholder='DD/MM/YYYY'
            label='Start'
            defaultValue={this.state.startDate}
            onChange={e => ReceiptHandler.handleDate('startDate', e.target.value, this, this.props.updateReceipt)}
            error={this.state.error.startDate} />
          <Form.Input
            name='endDate'
            placeholder='DD/MM/YYYY'
            label='End'
            defaultValue={this.state.endDate}
            onChange={e => ReceiptHandler.handleDate('endDate', e.target.value, this, this.props.updateReceipt)}
            error={this.state.error.endDate} />
        </Form.Group>
        <h4>Charter Information</h4>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              placeholder="Flying Time" type="number" labelPosition="right" label="hrs"
              onChange={e => ReceiptHandler.handleChange('flyingTime', e.target.value, this, this.props.updateReceipt)}
              defaultValue={this.state.flyingTime} pattern="[0-9]*" name='flyingTime' disabled={!this.state.provider} />
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

AircraftCharter.propTypes = {
  activeStep: React.PropTypes.string,
  existingAircraftCharter: React.PropTypes.object,
  updateReceipt: React.PropTypes.func
};

export default AircraftCharter;
