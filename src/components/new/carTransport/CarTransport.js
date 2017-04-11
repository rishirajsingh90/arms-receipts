import React from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

class CarTransport extends React.Component {
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

    if (this.props.activeStep !== 'carTransport') {
      return null;
    }

    return (
      <div>
        <Form.Group>
          <Form.Field>
            <label>Service Provider</label>
            <Input placeholder='Provider' onChange={e => this.handleChange('provider', e.target.value)} />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <label>City</label>
          <Form.Field>
            <Input placeholder='From' onChange={e => this.handleChange('fromCity', e.target.value)} />
          </Form.Field>
          <Form.Field>
            <Input placeholder='To' onChange={e => this.handleChange('toCity', e.target.value)} />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <label>Distance</label>
          <Form.Field>
            <Input placeholder='Distance' type='number' labelPosition='right' label='km'
                   onChange={e => this.handleChange('distance', e.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <label>Dates</label>
          <Form.Field>
            <DatePicker
              name='startDate'
              placeholderText='Start Date'
              dateFormat='DD/MM/YYYY'
              selected={this.state.startDate}
              onChange={this.handleStartDate}
            />
          </Form.Field>
          <Form.Field>
            <DatePicker
              name='endDate'
              placeholderText='End Date'
              dateFormat='DD/MM/YYYY'
              selected={this.state.endDate}
              onChange={this.handleEndDate}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <label>Amount</label>
          <Form.Field>
            <Input iconPosition='left' placeholder='Amount' type='number' onChange={e => this.handleChange('amount', e.target.value)}>
              <Icon name='dollar' />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

export default CarTransport;
