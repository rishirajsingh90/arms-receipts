import React from 'react';
import { Form, Dropdown, Input, Icon, Checkbox } from 'semantic-ui-react';
import Client from '../../Client';

class CaseFees extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      companies: [],
      countries: [],
      activeStep: null,
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

    if (this.props.activeStep !== "caseHandling") {
      return null;
    }

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
        </Form.Group>
        <Form.Group>
          <label>Case Type</label>
          <Form.Field>
            <Form.Radio label='Simple' value='simple' checked={value === 'simple'} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio label='Complex' value='complex' checked={value === 'complex'} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio label='Custom' value='custom' checked={value === 'custom'} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <Input iconPosition='left' placeholder='Amount' disabled={value !== 'custom'} type="number">
              <Icon name='dollar' />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Details</label>
          </Form.Field>
          <Form.Field>
            <Checkbox label='Repatriation' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Doctor Escort' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='Nurse Escort' />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Dropdown text='Country of Origin' search floating
              labeled button className='icon' options={this.state.countries}
            />
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

export default CaseFees;
