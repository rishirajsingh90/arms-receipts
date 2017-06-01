import React, { Component } from 'react';
import { Form, Input, Dropdown } from 'semantic-ui-react';
import ReceiptHandler from '../../common/ReceiptHandler';
import Client from '../../Client';
import map from 'lodash/map';
import TotalsService from '../../../service/TotalsService';

class CarTransport extends Component {
  constructor (props) {
    super(props);
    this.state = {
      carProviders: [],
      error: {}
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
  }
  componentDidMount() {
    this.getCarProviders();
  }
  componentWillReceiveProps() {
    if (this.props.existingCarTransport) {
      this.setState({
        provider: this.props.existingCarTransport.provider,
        fromCity: this.props.existingCarTransport.fromCity,
        toCity: this.props.existingCarTransport.toCity,
        startDate: this.props.existingCarTransport.startDate,
        endDate: this.props.existingCarTransport.endDate,
        distance: this.props.existingCarTransport.distance
      }, () => TotalsService.calculateCarTransportTotals(this.props.existingCarTransport, 1.5)); // TODO fix this
    }
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
    ReceiptHandler.handleStartDate(date, this, this.props.updateReceipt);
  }
  handleEndDate(date) {
    ReceiptHandler.handleEndDate(date, this, this.props.updateReceipt);
  }
  handleDropDownChange(e, { id, value }) {
    ReceiptHandler.handleDropDownChange(e, { id, value }, this, this.props.updateReceipt);
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
            defaultValue={this.state.provider}
            name="provider" />
        </Form.Group>
        <h4>Cities</h4>
        <Form.Group widths="equal">
          <Form.Input
            placeholder='From' onChange={e => ReceiptHandler.handleChange('fromCity', e.target.value, this, true, this.props.updateReceipt)}
            defaultValue={this.state.fromCity} label="From" name="fromCity" disabled={!this.state.provider} />
          <Form.Input
            placeholder='To' onChange={e => ReceiptHandler.handleChange('toCity', e.target.value, this, true, this.props.updateReceipt)}
            defaultValue={this.state.toCity} label="To" name="toCity" disabled={!this.state.provider} />
        </Form.Group>
        <h4>Dates</h4>
        <Form.Group widths="equal">
          <Form.Input
            name='startDate'
            placeholder='DD/MM/YYYY'
            label='Start'
            defaultValue={this.state.startDate}
            onChange={e => ReceiptHandler.handleDate('startDate', e.target.value, this, this.props.updateReceipt)}
            error={this.state.error.startDate} />
          <Form.Input
            name='endDate'
            placeholder='DD/MM/YYYY'
            label='End'
            defaultValue={this.state.endDate}
            onChange={e => ReceiptHandler.handleDate('endDate', e.target.value, this, this.props.updateReceipt)}
            error={this.state.error.endDate} />
        </Form.Group>
        <h4>Transport Information</h4>
        <Form.Group widths="equal">
          <Form.Field>
            <Input
              placeholder='Distance' type='number' labelPosition='right' label='km'
              onChange={e => ReceiptHandler.handleChange('distance', e.target.value, this, this.props.updateReceipt)} defaultValue={this.state.distance}
              pattern="[0-9]*" name="distance" disabled={!this.state.provider} />
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

CarTransport.propTypes = {
  activeStep: React.PropTypes.string,
  existingCarTransport: React.PropTypes.object,
  updateReceipt: React.PropTypes.func
};

export default CarTransport;
