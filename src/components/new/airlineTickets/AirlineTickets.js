import React, { Component } from 'react';
import { Form, Input, Icon } from "semantic-ui-react";
import DatePicker from "react-datepicker";

class AirlineTickets extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeStep: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  handleSelectChange(e, { value }) {
    if (!e.target.parentElement.id) {
      return;
    }
    if (e.target.parentElement.id.includes('flightClass')) {
      this.setState({ flightClass: value }, () => {
        this.props.updateReceipt(this.state);
      });
    }
  }
  handleStartDate(date) {
    this.setState({ startDate: date }, () => {
      this.props.updateReceipt(this.state);
    });
  }
  handleEndDate(date) {
    this.setState({ endDate: date }, () => {
      this.props.updateReceipt(this.state);
    });
  }
  handleChange(input, value) {
    this.setState({ [input]: value }, () => {
      this.props.updateReceipt(this.state);
    });
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
            <Input placeholder="Provider" onChange={e => this.handleChange('provider', e.target.value)} defaultValue={this.state.provider} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Ticket Class</label>
          <Form.Field>
            <Form.Radio id='flightClassEconomy' label='Economy' value='economy' checked={flightClass === 'economy'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio id='flightClassBusiness' label='Business' value='business' checked={flightClass === 'business'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio id='flightClassStretcher' label='Stretcher' value='stretcher' checked={flightClass === 'stretcher'} onChange={this.handleSelectChange} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>City</label>
          <Form.Field>
            <Input placeholder="From" onChange={e => this.handleChange('fromCity', e.target.value)} defaultValue={this.state.fromCity} />
          </Form.Field>
          <Form.Field>
            <Input placeholder="To" onChange={e => this.handleChange('toCity', e.target.value)} defaultValue={this.state.toCity} />
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
              iconPosition="left" placeholder="Amount" type="number" onChange={e => this.handleChange('amount', e.target.value)}
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

export default AirlineTickets;
