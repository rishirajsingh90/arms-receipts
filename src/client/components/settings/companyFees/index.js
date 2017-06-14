import React, { Component } from 'react';
import Client from '../../Client';
import { Form, Icon } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

class CompanyFees extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true }, () => {
      const company = {
        name: this.state.name,
        simple_fee: this.state.simple_fee,
        complex_fee: this.state.complex_fee,
        doctor_escort: this.state.doctor_escort,
        nurse_escort: this.state.nurse_escort,
        repatriation: this.state.repatriation,
      };
      Client.addCompanyFee(company).then(function(response) {
        browserHistory.push({
          pathName: 'review',
          state: {
            receiptMessage: response.message
          }
        });
      });
    });
  }
  render() {
    return (
      <Form class="ui form" loading={this.state.isLoading} onSubmit={this.handleSubmit}>
        <h4>Insert Company Fees</h4>
        <Form.Group widths="equal">
          <Form.Input
            placeholder='Name' type='text' onChange={e => this.setState({ name: e.target.value })}
            name='description' />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            iconPosition='left' type='number' pattern="[0-9]*" name='simpleFee' label="Simple fee"
            onChange={e => this.setState({ simple_fee: e.target.value })}>
            <Icon name='dollar' />
            <input />
          </Form.Input>
          <Form.Input
            iconPosition='left' type='number' pattern="[0-9]*" name='complexFee' label="Complex fee"
            onChange={e => this.setState({ complex_fee: e.target.value })}>
            <Icon name='dollar' />
            <input />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            iconPosition='left' type='number' pattern="[0-9]*" name='doctorEscort' label="Doctor Escort"
            onChange={e => this.setState({ doctor_escort: e.target.value })}>
            <Icon name='dollar' />
            <input />
          </Form.Input>
          <Form.Input
            iconPosition='left' type='number' pattern="[0-9]*" name='nurseEscort' label="Nurse Escort"
            onChange={e => this.setState({ nurse_escort: e.target.value })}>
            <Icon name='dollar' />
            <input />
          </Form.Input>
          <Form.Input
            iconPosition='left' type='number' pattern="[0-9]*" name='repatriation' label="Repatriation"
            onChange={e => this.setState({ repatriation: e.target.value })}>
            <Icon name='dollar' />
            <input />
          </Form.Input>
        </Form.Group>
        <Form.Button content='Add company fee' />
      </Form>
    );
  }
}

export default CompanyFees;
