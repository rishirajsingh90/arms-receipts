import React from 'react';
import { Form, Dropdown, Input, Icon, Checkbox } from 'semantic-ui-react';
import Client from '../../Client';

class CaseFees extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: null,
      companyName: '',
      caseType: '',
      amount: 0,
      country: ''
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
  caseTypeUpdated(event) {
    this.setState({ value: event.target.value });
  }
  handleChange(input, value) {
    this.setState({
      input: value
    });
    this.props.updateReceipt(this.state);
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
              options={this.state.companies}
              floating labeled button className='icon'
              placeholder='Select Company'
              onChange={e => this.handleChange('companyName', e)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <label>Case Type</label>
          <Form.Field>
            <Form.Radio label='Simple' value='simple' checked={value === 'simple'} onChange={this.caseTypeUpdated} />
          </Form.Field>
          <Form.Field>
            <Form.Radio label='Complex' value='complex' checked={value === 'complex'} onChange={this.caseTypeUpdated} />
          </Form.Field>
          <Form.Field>
            <Form.Radio label='Custom' value='custom' checked={value === 'custom'} onChange={this.caseTypeUpdated} />
          </Form.Field>
          <Form.Field>
            <Input iconPosition='left' placeholder='Amount'  type="number"
                   onChange={e => this.handleChange('amount', e.target.value)}
            >
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
            <Dropdown
              options={this.state.countries}
              floating labeled button className='icon'
              placeholder='Select Country'
              onChange={e => this.handleChange('country', e.target.value)}
            />
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

CaseFees.propTypes = {
  updateReceipt: React.PropTypes.func
};

export default CaseFees;
