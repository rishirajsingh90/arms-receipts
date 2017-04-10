import React from 'react';
import { Header, Form, Dropdown, Input, Icon, Checkbox } from 'semantic-ui-react';
import Client from '../Client';

class HandlingFees extends React.Component {
  constructor () {
    super();
    this.state = {
      companies: [],
      countries: [],
      value: null
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getCompanies();
    this.getCountries();
  }
  getCompanies() {
    Client.getCompanies((companies) => {
      this.setState({ companies: companies });
    });
  }
  getCountries() {
    Client.getCountries((countries) => {
      this.setState({ countries:countries });
    });
  }
  handleChange(e, { value }) {
    this.setState({ value: value });
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <Form.Group inline>
          <Form.Field>
            <label>Company Name</label>
            <Dropdown
              className='icon'
              options={this.state.companies}
              search floating labeled button
              text='Select Company'
            />
          </Form.Field>
          <Form.Field >
            <label>Case Type</label>
            <Form.Radio label='Simple' value='simple' checked={value === 'simple'} onChange={this.handleChange} />
            <Form.Radio label='Complex' value='complex' checked={value === 'complex'} onChange={this.handleChange} />
            <Form.Radio label='Custom' value='custom' checked={value === 'custom'} onChange={this.handleChange} />
            <Input iconPosition='left' placeholder='Amount' disabled={value !== 'custom'} type="number">
              <Icon name='dollar' />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
        <Header as='h4'>Details</Header>
        <Form.Field>
          <Checkbox label='Repatriation' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='Doctor Escort' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='Nurse Escort' />
        </Form.Field>
        <Form.Field>
          <Dropdown text='Country of Origin' search floating labeled button className='icon'
            options={this.state.countries}
          />
        </Form.Field>
      </div>
    );
  }
}

export default HandlingFees;
