import React, { Component } from 'react';
import { Form, Dropdown, Icon } from 'semantic-ui-react';
import Client from '../../Client';
import ReceiptHandler from '../../common/ReceiptHandler';
import map from 'lodash/map';

class CaseFees extends Component {
  constructor (props) {
    super(props);
    this.state = {
      companies: [],
      countries: []
    };
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    this.getCompanies();
    this.getCountries();
  }
  getCompanies() {
    Client.getCompanies((companies) => {
      companies = map(companies, function(company) {
        company.key = company._id;
        company.value = company.name;
        company.text = company.name;
        return company;
      });
      this.setState({ companies: companies });
    });
  }
  getCountries() {
    Client.getCountries((countries) => {
      countries = map(countries , function (country) {
        return {
          key: country._id,
          value: country.value,
          text: country.value
        };
      });
      this.setState({ countries: countries });
    });
  }
  handleDropDownChange(e, { id, value }) {
    ReceiptHandler.handleDropDownChange(e, { id, value }, this);
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
        <h4>Company Information</h4>
        <Form.Group widths="equal">
          <Dropdown
              id='company'
              options={this.state.companies}
              fluid labeled search selection className='icon'
              placeholder='Company'
              onChange={this.handleDropDownChange}
              defaultValue={this.state.company} />
          <Dropdown
            id="country"
            options={this.state.countries}
            fluid labeled search selection className='icon'
            placeholder='Country'
            onChange={this.handleDropDownChange}
            defaultValue={this.state.country}
            disabled={!this.state.company} />
        </Form.Group>
        <h4>Case Type</h4>
        <Form.Group>
          <Form.Radio name='caseType' label='Simple' value='simple' checked={caseType === 'simple'} onChange={this.handleSelectChange}
                        disabled={!this.state.company} />
          <Form.Radio name='caseType' label='Complex' value='complex' checked={caseType === 'complex'} onChange={this.handleSelectChange}
                        disabled={!this.state.company} />
          <Form.Radio name='caseType' label='Custom' value='custom' checked={caseType === 'custom'} onChange={this.handleSelectChange}
                        disabled={!this.state.company} />
          <Form.Input
              iconPosition='left' placeholder='Amount'  type='number' disabled={caseType !== 'custom'}
              onChange={e => ReceiptHandler.handleChange('amount', e.target.value, this)} defaultValue={this.state.amount}
              pattern="[0-9]*" name='amount'>
              <Icon name='dollar' />
              <input />
          </Form.Input>
        </Form.Group>
        <h4>Case Details</h4>
        <Form.Group>
          <Form.Checkbox name='repatriation' label='Repatriation' onChange={this.handleSelectChange} checked={this.state.repatriation}
                      disabled={!this.state.company} />
          <Form.Checkbox name='doctorEscort' label='Doctor Escort' onChange={this.handleSelectChange} checked={this.state.doctorEscort}
                      disabled={!this.state.company} />
          <Form.Checkbox name='nurseEscort' label='Nurse Escort' onChange={this.handleSelectChange}  checked={this.state.nurseEscort}
                      disabled={!this.state.company} />
        </Form.Group>
      </div>
    );
  }
}

CaseFees.propTypes = {
  activeStep: React.PropTypes.string
};

export default CaseFees;
