import React from "react";
import { Form, Input, Icon } from "semantic-ui-react";
import DatePicker from "react-datepicker";
require('react-datepicker/dist/react-datepicker.css');

class AirlineTickets extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeStep: null
    };
  }
  handleChange(e, { value }) {
    this.setState({ value: value });
  }
  render() {

    const { value } = this.state;

    if (this.props.activeStep !== "airlineTickets") {
      return null;
    }

    return (
      <div>
        <Form.Group inline>
          <Form.Field>
            <label>Service Provider</label>
            <Input placeholder="Provider" />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Ticket Class</label>
          <Form.Field>
            <Form.Radio label='Economy' value='economy' checked={value === 'economy'} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio label='Business' value='business' checked={value === 'business'} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio label='Stretcher' value='stretcher' checked={value === 'stretcher'} onChange={this.handleChange} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>City</label>
          <Form.Field>
            <Input placeholder="From" />
          </Form.Field>
          <Form.Field>
            <Input placeholder="To" />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Dates</label>
          <Form.Field>
            <DatePicker
              selected={this.state.startDate}
              placeholderText="Start Date"
              dateFormat="DD/MM/YYYY"
            />
          </Form.Field>
          <Form.Field>
            <DatePicker
              selected={this.state.endDate}
              placeholderText="End Date"
              dateFormat="DD/MM/YYYY"
            />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <Form.Field>
            <label>Amount</label>
            <Input iconPosition="left" placeholder="Amount" type="number">
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
