import React, { Component } from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import ReceiptHandler from '../../common/ReceiptHandler';

class CarTransport extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeStep: null
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
  }
  handleStartDate(date) {
    ReceiptHandler.handleStartDate(date, this);
  }
  handleEndDate(date) {
    ReceiptHandler.handleEndDate(date, this);
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
              placeholder='Provider' onChange={e => ReceiptHandler.handleChange('provider', e.target.value, this)}
              defaultValue={this.state.provider} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>City</label>
          <Form.Field>
            <Input placeholder='From' onChange={e => ReceiptHandler.handleChange('fromCity', e.target.value, this)} defaultValue={this.state.fromCity} />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder='To' onChange={e => ReceiptHandler.handleChange('toCity', e.target.value, this)}
              defaultValue={this.state.toCity} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Distance</label>
          <Form.Field>
            <Input
              placeholder='Distance' type='number' labelPosition='right' label='km'
              onChange={e => ReceiptHandler.handleChange('distance', e.target.value, this)} defaultValue={this.state.distance} />
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
              iconPosition='left' placeholder='Amount' type='number' onChange={e => ReceiptHandler.handleChange('amount', e.target.value, this)}
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
