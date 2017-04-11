import React from 'react';
import { Form, Dropdown, Input, Icon, Checkbox } from 'semantic-ui-react';
import Client from '../../Client';

class CaseFees extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: null,
      companyName: '',
      amount: 0,
      country: '',
      repatriation: false,
      doctorEscort: false,
      nurseEscort: false,
      caseType: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
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
    if (e.target.parentElement.parentElement.id) {
      this.setState({ [e.target.parentElement.id]: true }, () => {
        this.props.updateReceipt(this.state);
      });
    }
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
        <Form.Group>
          <label>Company Name</label>
          <Form.Field>
            <Dropdown
              id='companyName'
              options={this.state.companies}
              floating labeled button className='icon'
              placeholder='Select Company'
              onChange={this.handleDropDownChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
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
            <Input iconPosition='left' placeholder='Amount'  type='number' disabled={caseType !== 'custom'}
                   onChange={e => this.handleChange('amount', e.target.value)}
            >
              <Icon name='dollar' />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <label>Details</label>
          <Form.Field>
            <Checkbox id='repatriation' label='Repatriation' onChange={this.handleSelectChange}/>
          </Form.Field>
          <Form.Field>
            <Checkbox id='doctorEscort' label='Doctor Escort' onChange={this.handleSelectChange}/>
          </Form.Field>
          <Form.Field>
            <Checkbox id='nurseEscort' label='Nurse Escort' onChange={this.handleSelectChange} />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Dropdown
              id="country"
              options={this.state.countries}
              floating labeled button className='icon'
              placeholder='Select Country'
              onChange={this.handleDropDownChange}
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
