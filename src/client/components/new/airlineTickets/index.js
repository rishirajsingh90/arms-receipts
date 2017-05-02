import React, { Component } from 'react';
import { Form, Input, Icon, Dropdown } from "formsy-semantic-ui-react";
import DatePicker from "react-datepicker";
import ReceiptHandler from '../../common/ReceiptHandler';
import Client from '../../Client';
import reduce from 'lodash/reduce';

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
      airlines = reduce(airlines, function(result, airline) {
        if (!airline.charter) {
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
  handleDropDownChange(e, { id, value }) {
    ReceiptHandler.handleDropDownChange(e, { id, value }, this);
  }
  render() {

    const { flightClass } = this.state;

    if (this.props.activeStep !== "airlineTickets") {
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
        <h4>Ticket Class</h4>
        <Form.Group>
          <Form.Radio name='flightClass' label='Economy' value='economy' checked={flightClass === 'economy'} onChange={this.handleSelectChange}
            disabled={!this.state.provider} />
          <Form.Radio name='flightClass' label='Business' value='business' checked={flightClass === 'business'} onChange={this.handleSelectChange}
            disabled={!this.state.provider} />
          <Form.Radio name='flightClass' label='Stretcher' value='stretcher' checked={flightClass === 'stretcher'} onChange={this.handleSelectChange}
            disabled={!this.state.provider} />
        </Form.Group>
        <h4>Cities</h4>
        <Form.Group widths="equal">
          <Form.Field
            placeholder="From" onChange={e => ReceiptHandler.handleChange('fromCity', e.target.value, this)}
            defaultValue={this.state.fromCity} label="From" control="input" name="fromCity" disabled={!this.state.provider} />
          <Form.Field
            placeholder="To" onChange={e => ReceiptHandler.handleChange('toCity', e.target.value, this)}
            defaultValue={this.state.toCity} label="To" control="input" name="toCity" disabled={!this.state.provider} />
        </Form.Group>
        <h4>Dates</h4>
        <Form.Group widths="equal">
          <Form.Field
            name='startDate'
            placeholderText='Start Date'
            dateFormat='DD/MM/YYYY'
            selected={this.state.startDate}
            onChange={this.handleStartDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            selectsStart
            control={DatePicker}
            label="Start"
            disabled={!this.state.provider} />
          <Form.Field
            name='endDate'
            placeholderText='End Date'
            dateFormat='DD/MM/YYYY'
            selected={this.state.endDate}
            onChange={this.handleEndDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            selectsEnd
            control={DatePicker}
            label="End"
            disabled={!this.state.provider} />
        </Form.Group>
        <h4>Travel Information</h4>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              iconPosition='left' placeholder='Amount' type='number' onChange={e => ReceiptHandler.handleChange('amount', e.target.value, this)}
              defaultValue={this.state.amount} pattern="[0-9]*" name='amount' disabled={!this.state.provider}>
              <Icon name='dollar' />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

AirlineTickets.propTypes = {
  activeStep: React.PropTypes.string,
  updateReceipt: React.PropTypes.func
};

export default AirlineTickets;
