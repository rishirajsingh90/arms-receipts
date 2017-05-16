import React, { Component } from 'react';
import { Form, Input, Icon, Dropdown } from "semantic-ui-react";
import ReceiptHandler from '../../common/ReceiptHandler';
import Client from '../../Client';
import reduce from 'lodash/reduce';

class AirlineTickets extends Component {
  constructor (props) {
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
    if (this.props.existingAirlineTickets) {
      this.setState({ provider: this.props.existingAirlineTickets.provider });
      this.setState({ flightClass: this.props.existingAirlineTickets.flightClass });
      this.setState({ fromCity: this.props.existingAirlineTickets.fromCity });
      this.setState({ toCity: this.props.existingAirlineTickets.toCity });
      this.setState({ startDate: this.props.existingAirlineTickets.startDate });
      this.setState({ endDate: this.props.existingAirlineTickets.endDate });
      this.setState({ amount: this.props.existingAirlineTickets.amount });
    }
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
          <Form.Input
            name='startDate'
            placeholder='DD/MM/YYYY'
            label='Start'
            defaultValue={this.state.startDate}
            onChange={e => ReceiptHandler.handleDate('startDate', e.target.value, this, true)}
            error={this.state.error.startDate} />
          <Form.Input
            name='endDate'
            placeholder='DD/MM/YYYY'
            label='End'
            defaultValue={this.state.endDate}
            onChange={e => ReceiptHandler.handleDate('endDate', e.target.value, this, true)}
            error={this.state.error.endDate} />
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