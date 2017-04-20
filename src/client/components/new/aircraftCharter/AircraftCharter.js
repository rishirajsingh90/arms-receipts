import React, { Component } from 'react';
import { Form, Input, Icon, Dropdown } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import ReceiptHandler from '../../common/ReceiptHandler';
import Client from '../../Client';
const _ = require('lodash');

class AircraftCharter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
  }
  componentDidMount() {
    this.getAirlines();
  }
  getAirlines() {
    Client.getAirlines((airlines) => {
      airlines = _.reduce(airlines, function(result, airline) {
        if (airline.charter) {
          result.push({
            key: airline.id,
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
    ReceiptHandler.handleSelectChange(e, { name, value, checked }, this);
  }

  handleStartDate(date) {
    ReceiptHandler.handleStartDate(date, this);
  }

  handleEndDate(date) {
    ReceiptHandler.handleEndDate(date, this);
  }
  handleDropDownChange(e, { id, value, options }) {
    ReceiptHandler.handleDropDownChange(e, { id, value, options }, this);
  }

  render() {

    const { aircraftType } = this.state;

    if (this.props.activeStep !== "aircraftCharter") {
      return null;
    }

    return (
      <div>
        <Form.Group inline>
          <label>Service Provider</label>
          <Form.Field>
            <Dropdown
              id='provider'
              options={this.state.airlines}
              floating labeled button className='icon'
              placeholder='Select Airline'
              onChange={this.handleDropDownChange}
              defaultValue={ReceiptHandler.getValueFromKey(this.state.provider, this.state.airlines)} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Aircraft Type</label>
          <Form.Field>
            <Form.Radio
              name="aircraftType" label='Jet' value='jet' checked={aircraftType === 'jet'}
              onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio
              name="aircraftType" label='Turboprop' value='turboprop'
              checked={aircraftType === 'turboprop'} onChange={this.handleSelectChange} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>City</label>
          <Form.Field>
            <Input
              placeholder="From" onChange={e => ReceiptHandler.handleChange('fromCity', e.target.value, this)}
              defaultValue={this.state.fromCity} />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="To" onChange={e => ReceiptHandler.handleChange('toCity', e.target.value, this)}
              defaultValue={this.state.toCity} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Flying Time</label>
          <Form.Field>
            <Input
              placeholder="Flying Time" type="number" labelPosition="right" label="hrs"
              onChange={e => ReceiptHandler.handleChange('flyingTime', e.target.value, this)}
              defaultValue={this.state.flyingTime} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Dates</label>
          <Form.Field>
            <DatePicker
              placeholderText="Start Date"
              dateFormat="DD/MM/YYYY"
              selected={this.state.startDate}
              onChange={this.handleStartDate} />
          </Form.Field>
          <Form.Field>
            <DatePicker
              placeholderText="End Date"
              dateFormat="DD/MM/YYYY"
              selected={this.state.endDate}
              onChange={this.handleEndDate} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Amount</label>
          <Form.Field>
            <Input
              iconPosition="left" placeholder="Amount" type="number"
              onChange={e => ReceiptHandler.handleChange('amount', e.target.value, this)}
              defaultValue={this.state.amount}>
              <Icon name="dollar" />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

AircraftCharter.propTypes = {
  activeStep: React.PropTypes.string
};

export default AircraftCharter;
