import React from 'react';
import {Header, Form, Dropdown, Input, Icon, Checkbox} from 'semantic-ui-react';
import Client from '../Client';

const HandlingFees = React.createClass({
  getInitialState: function () {
    return {
      companies: [],
      countries: [],
      value: null
    };
  },
  render: function () {
    return (
      <div>
        <Form.Group inline>
          <Form.Field>
            <label>Company Name</label>
            <Dropdown text='Select Company' search floating labeled button className='icon' options={this.state.companies} />
          </Form.Field>
          <Header as='h4'>Case Type</Header>
          <Form.Field >
            <label>Case Handling Fee</label>
            <Form.Radio label='Simple' value='simple' checked={this.state.value === 'simple'} onChange={this.handleChange} />
            <Form.Radio label='Complex' value='complex' checked={this.state.value === 'complex'} onChange={this.handleChange} />
            <Form.Radio label='Custom' value='custom' checked={this.state.value === 'custom'} onChange={this.handleChange} />
            <Input iconPosition='left' placeholder='Amount' disabled={this.state.value !== 'custom'} type="number">
              <Icon name='dollar'/>
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
        <Header as='h4'>Details</Header>
        <Form.Field>
          <Checkbox label='Repatriation'/>
        </Form.Field>
        <Form.Field>
          <Checkbox label='Doctor Escort'/>
        </Form.Field>
        <Form.Field>
          <Checkbox label='Nurse Escort'/>
        </Form.Field>
        <Form.Field>
          <Dropdown text='Country of Origin' search floating labeled button className='icon' options={this.state.countries} />
        </Form.Field>
      </div>
    );
  },
  componentDidMount: function () {
    this.getCompanies();
    this.getCountries();
  },
  getCompanies: function () {
    Client.getCompanies((companies) => {
      this.setState({companies: companies, value: this.state.value, countries:this.state.countries});
    });
  },
  getCountries: function() {
    Client.getCountries((countries) => {
      this.setState({companies: this.state.companies, value: this.state.value, countries:countries});
    });
  },
  handleChange: function(e, {value}) {
    this.setState({companies: this.state.companies, value: value, countries:this.state.countries});
  }
});

export default HandlingFees;