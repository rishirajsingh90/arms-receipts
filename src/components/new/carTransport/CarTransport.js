import React, { Component } from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

class CarTransport extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeStep: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
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
  render() {

    if (this.props.activeStep !== 'carTransport') {
      return null;
    }

    return (
      <div>
        <Form.Group inline>
          <label>Service Provider</label>
          <Form.Field>
            <Input
              placeholder='Provider' onChange={e => this.handleChange('provider', e.target.value)}
              defaultValue={this.state.provider} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>City</label>
          <Form.Field>
            <Input placeholder='From' onChange={e => this.handleChange('fromCity', e.target.value)} defaultValue={this.state.fromCity} />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder='To' onChange={e => this.handleChange('toCity', e.target.value)}
              defaultValue={this.state.toCity} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Distance</label>
          <Form.Field>
            <Input
              placeholder='Distance' type='number' labelPosition='right' label='km'
              onChange={e => this.handleChange('distance', e.target.value)} defaultValue={this.state.distance} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Dates</label>
          <Form.Field>
            <DatePicker
              name='startDate'
              placeholderText='Start Date'
              dateFormat='DD/MM/YYYY'
              selected={this.state.startDate}
              onChange={this.handleStartDate} />
          </Form.Field>
          <Form.Field>
            <DatePicker
              name='endDate'
              placeholderText='End Date'
              dateFormat='DD/MM/YYYY'
              selected={this.state.endDate}
              onChange={this.handleEndDate} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Amount</label>
          <Form.Field>
            <Input
              iconPosition='left' placeholder='Amount' type='number' onChange={e => this.handleChange('amount', e.target.value)}
              defaultValue={this.state.amount}>
              <Icon name='dollar' />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

CarTransport.propTypes = {
  updateReceipt: React.PropTypes.func
};

export default CarTransport;
