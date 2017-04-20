import React, { Component } from 'react';
import { Form, Dropdown, Input, Icon, Checkbox } from 'semantic-ui-react';
import Client from '../../Client';
import ReceiptHandler from '../../common/ReceiptHandler';
import _ from 'lodash';

class CaseFees extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    this.getCompanies();
    this.getCountries();
  }
  getCompanies() {
    Client.getCompanies((companies) => {
      companies = _.map(companies, function(company) {
        return {
          key: company.id,
          value: company.name,
          text: company.name,
        };
      });
      this.setState({ companies: companies });
    });
  }
  getCountries() {
    Client.getCountries((countries) => {
      countries = _.map(countries , function (country) {
        return {
          key: country.id,
          value: country.name,
          text: country.value
        };
      });
      this.setState({ countries: countries });
    });
  }
  handleDropDownChange(e, { id, value, options }) {
    ReceiptHandler.handleDropDownChange(e, { id, value, options }, this);
  }
  handleSelectChange(e, { name, value, checked }) {
    ReceiptHandler.handleSelectChange(e, { name, value, checked }, this);
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
              defaultValue={ReceiptHandler.getValueFromKey(this.state.company, this.state.companies)} />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Case Type</label>
          <Form.Field>
            <Form.Radio name='caseType' label='Simple' value='simple' checked={caseType === 'simple'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio name='caseType' label='Complex' value='complex' checked={caseType === 'complex'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Form.Radio name='caseType' label='Custom' value='custom' checked={caseType === 'custom'} onChange={this.handleSelectChange} />
          </Form.Field>
          <Form.Field>
            <Input
              iconPosition='left' placeholder='Amount'  type='number' disabled={caseType !== 'custom'}
              onChange={e => ReceiptHandler.handleChange('amount', e.target.value, this)} defaultValue={this.state.amount}>
              <Icon name='dollar' />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Details</label>
          <Form.Field>
            <Checkbox name='repatriation' label='Repatriation' onChange={this.handleSelectChange} checked={this.state.repatriation} />
          </Form.Field>
          <Form.Field>
            <Checkbox name='doctorEscort' label='Doctor Escort' onChange={this.handleSelectChange} checked={this.state.doctorEscort} />
          </Form.Field>
          <Form.Field>
            <Checkbox name='nurseEscort' label='Nurse Escort' onChange={this.handleSelectChange}  checked={this.state.nurseEscort} />
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
              defaultValue={ReceiptHandler.getValueFromKey(this.state.country, this.state.countries)} />
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

CaseFees.propTypes = {
  activeStep: React.PropTypes.string
};

export default CaseFees;
