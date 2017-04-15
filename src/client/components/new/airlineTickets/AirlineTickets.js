import React, { Component } from 'react';
import { Form, Input, Icon, Dropdown } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import ReceiptHandler from '../../common/ReceiptHandler';
import Client from '../../Client';
const _ = require('lodash');

class AirlineTickets extends Component {
  constructor (props) {
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
      const charterAirlines = _.filter(airlines, function(airline) { return !airline.charter; });
      this.setState({airlines: charterAirlines});
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
  handleChange(input, value) {
    this.setState({ [input]: value }, () => {
      this.props.updateReceipt(this.state);
    });
  }
  handleDropDownChange(e, { id, value, options }) {
    ReceiptHandler.handleDropDownChange(e, { id, value, options }, this);
  }
  render() {

    const { flightClass } = this.state;

    if (this.props.activeStep !== "airlineTickets") {
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
          <label>Ticket Class</label>
          <Form.Field>
            <Form.Radio name='flightClass' label='Economy' value='economy' checked={flightClass === 'economy'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio name='flightClass' label='Business' value='business' checked={flightClass === 'business'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio name='flightClass' label='Stretcher' value='stretcher' checked={flightClass === 'stretcher'} onChange={this.handleSelectChange} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>City</label>
          <Form.Field>
            <Input placeholder="From" onChange={e => ReceiptHandler.handleChange('fromCity', e.target.value, this)} defaultValue={this.state.fromCity} />
          </Form.Field>
          <Form.Field>
            <Input placeholder="To" onChange={e => ReceiptHandler.handleChange('toCity', e.target.value, this)} defaultValue={this.state.toCity} />
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
          <Form.Field>
            <label>Amount</label>
            <Input
              iconPosition="left" placeholder="Amount" type="number" onChange={e => ReceiptHandler.handleChange('amount', e.target.value, this)}
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

AirlineTickets.propTypes = {
  updateReceipt: React.PropTypes.func
};

export default AirlineTickets;