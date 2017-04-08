import React from 'react';
import {Header, Form, Button, Dropdown} from 'semantic-ui-react';
import Client from '../Client';

const NewReceipt = React.createClass({
  getInitialState: function () {
    return {
      companies: [],
      value: null
    };
  },
  render: function () {
    return (
      <div>
        <Header as='h3'>New Receipt</Header>
        <Form>
          <Form.Group inline>
            <Form.Field>
              <label>Company Name</label>
              <Dropdown text='Select Company' search floating labeled button className='icon' options={this.state.companies} />
            </Form.Field>
            <Form.Field >
              <label>Case Handling Fee</label>
              <Form.Radio label='Simple' value='simple' checked={this.state.value === 'simple'} onChange={this.handleChange} />
              <Form.Radio label='Complex' value='complex' checked={this.state.value === 'complex'} onChange={this.handleChange} />
              <Form.Radio label='Custom' value='custom' checked={this.state.value === 'custom'} onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  },
  componentDidMount: function () {
    this.getCompanies();
  },
  getCompanies: function () {
    Client.getCompanies((companies) => {
      this.setState({companies: companies, value: this.state.value})
    });
  },
  handleChange: function(e, {value}) {
    this.setState({companies: this.state.companies, value: value})
  }
});

export default NewReceipt;