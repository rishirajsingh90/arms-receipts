import React, { Component } from 'react';
import { Form, Dropdown, Input, Icon, Checkbox } from 'semantic-ui-react';
import Client from '../../Client';
import PropTypes from 'prop-types';

class CaseFees extends Component {
  constructor (props) {
    super(props);
    this.test = [];
    this.state = {
      value: null,
      country: '',
      company: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
  }
  componentDidMount() {
    this.getCompanies();
    this.getCountries();
  }
  getCompanies() {
    Client.getCompanies((companies) => {
      this.setState({companies: companies});
    });
  }
  getCountries() {
    Client.getCountries((countries) => {
      this.setState({countries: countries});
    });
  }
  handleSelectChange(e, { value }) {
    if (!e.target.parentElement.id) {
      return;
    }
    if (e.target.parentElement.id.includes('caseType')) {
      this.setState({ caseType: value }, () => {
        this.props.updateReceipt(this.state);
      });
    } else if (e.target.parentElement.id) {
      this.setState({ [e.target.parentElement.id]: true }, () => {
        this.props.updateReceipt(this.state);
      });
    }
  }
  handleDropDownChange(e, { value }) {
    if (!e.target.parentElement.parentElement.id) {
      return;
    }
    this.setState({ [e.target.parentElement.parentElement.id]: value }, () => {
      this.props.updateReceipt(this.state);
    });
  }
  handleChange(input, value) {
    this.setState({ [input]: value }, () => {
      this.props.updateReceipt(this.state);
    });
  }
  render() {

    if (this.props.activeStep !== 'caseHandling') {
      return null;
    }

    const { caseType } = this.state;
    return (
      <div>
        <Form.Group inline>
          <label>Company Name</label>
          <Form.Field>
            <Dropdown
              id='company'
              options={this.state.companies}
              floating labeled button className='icon'
              placeholder='Select Company'
              onChange={this.handleDropDownChange}
              defaultValue={this.state.company} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Case Type</label>
          <Form.Field>
            <Form.Radio id='caseTypeSimple' label='Simple' value='simple' checked={caseType === 'simple'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio id='caseTypeComplex' label='Complex' value='complex' checked={caseType === 'complex'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio id='caseTypeCustom' label='Custom' value='custom' checked={caseType === 'custom'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Input
              iconPosition='left' placeholder='Amount'  type='number' disabled={caseType !== 'custom'}
              onChange={e => this.handleChange('amount', e.target.value)} defaultValue={this.state.amount}>
              <Icon name='dollar' />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Details</label>
          <Form.Field>
            <Checkbox id='repatriation' label='Repatriation' onChange={this.handleSelectChange} checked={this.state.repatriation} />
          </Form.Field>
          <Form.Field>
            <Checkbox id='doctorEscort' label='Doctor Escort' onChange={this.handleSelectChange} checked={this.state.doctorEscort} />
          </Form.Field>
          <Form.Field>
            <Checkbox id='nurseEscort' label='Nurse Escort' onChange={this.handleSelectChange}  checked={this.state.nurseEscort} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Insurance Company Country</label>
          <Form.Field>
            <Dropdown
              id="country"
              options={this.state.countries}
              floating labeled button className='icon'
              placeholder='Select Country'
              onChange={this.handleDropDownChange}
              defaultValue={this.state.country} />
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

CaseFees.propTypes = {
  updateReceipt: PropTypes.func
};

export default CaseFees;
