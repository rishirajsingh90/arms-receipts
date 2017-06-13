import React, { Component } from 'react';
import Client from '../../Client';
import { Form } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

class AmbulanceProvider extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true }, () => {
      Client.addAmbulanceProvider({ name: this.state.name }).then(function(response) {
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
        <h4>Insert Ambulance Provider</h4>
        <Form.Group widths="equal">
          <Form.Input
            placeholder='Name' type='text' onChange={e => this.setState({ name: e.target.value })}
            name='description' />
        </Form.Group>
        <Form.Button content='Add ambulance' />
      </Form>
    );
  }
}

export default AmbulanceProvider;
