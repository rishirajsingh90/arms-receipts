import React, { Component } from 'react';
import { Form, Input, Icon, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import ReceiptHandler from '../../common/ReceiptHandler';
import Client from '../../Client';
import map from 'lodash/map';

class CarTransport extends Component {
  constructor (props) {
    super(props);
    this.state = {
      carProviders: []
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
  }
  componentDidMount() {
    this.getCarProviders();
  }
  getCarProviders() {
    Client.getCarProviders((carProviders) => {
      carProviders = map(carProviders, function(providers) {
        return {
          key: providers._id,
          value: providers.name,
          text: providers.name
        };
      });
      this.setState({ carProviders: carProviders });
    });
  }
  handleStartDate(date) {
    ReceiptHandler.handleStartDate(date, this);
  }
  handleEndDate(date) {
    ReceiptHandler.handleEndDate(date, this);
  }
  handleDropDownChange(e, { id, value }) {
    ReceiptHandler.handleDropDownChange(e, { id, value }, this);
  }
  render() {

    if (this.props.activeStep !== 'carTransport') {
      return null;
    }

    return (
      <div>
        <h4>Service Provider</h4>
        <Form.Group widths="equal">
            <Dropdown
              id='provider'
              options={this.state.carProviders}
              fluid labeled search selection className='icon'
              placeholder='Select Car Company'
              onChange={this.handleDropDownChange}
              defaultValue={this.state.provider} />
        </Form.Group>
        <h4>Cities</h4>
        <Form.Group widths="equal">
          <Form.Field placeholder='From' onChange={e => ReceiptHandler.handleChange('fromCity', e.target.value, this)}
                      defaultValue={this.state.fromCity} label="From" control={Input} />
          <Form.Field placeholder='To' onChange={e => ReceiptHandler.handleChange('toCity', e.target.value, this)}
              defaultValue={this.state.toCity} label="To" control={Input} />
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
              label="Start" />
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
              label="End" />
        </Form.Group>
        <h4>Transport Information</h4>
        <Form.Group widths="equal">
          <Form.Field>
          <Input
            placeholder='Distance' type='number' labelPosition='right' label='km'
            onChange={e => ReceiptHandler.handleChange('distance', e.target.value, this)} defaultValue={this.state.distance}
            pattern="[0-9]*" />
          </Form.Field>
          <Form.Field>
          <Input
            iconPosition='left' placeholder='Amount' type='number' onChange={e => ReceiptHandler.handleChange('amount', e.target.value, this)}
            defaultValue={this.state.amount} pattern="[0-9]*" name='amount'>
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
  activeStep: React.PropTypes.string
};

export default CarTransport;
