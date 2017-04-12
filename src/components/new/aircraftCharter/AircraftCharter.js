import React, { Component } from 'react';
import { Form, Input, Icon } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import ReceiptHandler from '../../common/ReceiptHandler';

class AircraftCharter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: null
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e, {value}) {
    if (!e.target.parentElement.id) {
      return;
    }
    if (e.target.parentElement.id.includes('aircraftType')) {
      this.setState({aircraftType: value}, () => {
        this.props.updateReceipt(this.state);
      });
    }
  }

  handleStartDate(date) {
    ReceiptHandler.handleStartDate(date, this);
  }

  handleEndDate(date) {
    ReceiptHandler.handleEndDate(date, this);
  }

  render() {

    const {aircraftType} = this.state;

    if (this.props.activeStep !== "aircraftCharter") {
      return null;
    }

    return (
      <div>
        <Form.Group inline>
          <label>Service Provider</label>
          <Form.Field>
            <Input
              placeholder="Provider" onChange={e => ReceiptHandler.handleChange('provider', e.target.value, this)}
              defaultValue={this.state.provider}/>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Aircraft Type</label>
          <Form.Field>
            <Form.Radio id="aircraftTypeJet" label='Jet' value='jet' checked={aircraftType === 'jet'}
                        onChange={this.handleSelectChange}/>
          </Form.Field>
          <Form.Field>
            <Form.Radio id="aircraftTypeTurboprop" label='Turboprop' value='turboprop'
                        checked={aircraftType === 'turboprop'} onChange={this.handleSelectChange}/>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>City</label>
          <Form.Field>
            <Input
              placeholder="From" onChange={e => ReceiptHandler.handleChange('fromCity', e.target.value, this)}
              defaultValue={this.state.fromCity}/>
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="To" onChange={e => ReceiptHandler.handleChange('toCity', e.target.value, this)}
              defaultValue={this.state.toCity}/>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Flying Time</label>
          <Form.Field>
            <Input
              placeholder="Flying Time" type="number" labelPosition="right" label="hrs"
              onChange={e => ReceiptHandler.handleChange('flyingTime', e.target.value, this)}
              defaultValue={this.state.flyingTime}/>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Dates</label>
          <Form.Field>
            <DatePicker
              placeholderText="Start Date"
              dateFormat="DD/MM/YYYY"
              selected={this.state.startDate}
              onChange={this.handleStartDate}/>
          </Form.Field>
          <Form.Field>
            <DatePicker
              placeholderText="End Date"
              dateFormat="DD/MM/YYYY"
              selected={this.state.endDate}
              onChange={this.handleEndDate}/>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <Form.Field>
            <label>Amount</label>
            <Input
              iconPosition="left" placeholder="Amount" type="number"
              onChange={e => ReceiptHandler.handleChange('amount', e.target.value, this)}
              defaultValue={this.state.amount}>
              <Icon name="dollar"/>
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

AircraftCharter.propTypes = {
  updateReceipt: React.PropTypes.func
};

export default AircraftCharter;
