import React, { Component } from 'react';
import { Form, Dropdown, Icon } from 'semantic-ui-react';
import ReceiptHandler from '../../common/ReceiptHandler';

class CaseFees extends Component {
  constructor (props) {
    super(props);
    this.state = {
      error: {},
      company: this.props.existingCaseFees ? this.props.existingCaseFees.company : null,
      country: this.props.existingCaseFees ? this.props.existingCaseFees.country : null,
      caseType: this.props.existingCaseFees ? this.props.existingCaseFees.caseType : null,
      amount: this.props.existingCaseFees ? this.props.existingCaseFees.amount  : 0,
      repatriation: this.props.existingCaseFees ? this.props.existingCaseFees.repatriation : null,
      doctorEscort: this.props.existingCaseFees ? this.props.existingCaseFees.doctorEscort : null,
      nurseEscort: this.props.existingCaseFees ? this.props.existingCaseFees.nurseEscort : null
    };
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleDropDownChange(e, { id, value }) {
    ReceiptHandler.handleDropDownChange(e, { id, value }, this, this.props.updateReceipt);
  }
  handleSelectChange(e, { name, value, checked }) {
    ReceiptHandler.handleSelectChange(e, { name, value, checked }, this, this.props.updateReceipt);
  }
  render() {

    if (this.props.activeStep !== 'caseFee') {
      return null;
    }

    const { caseType } = this.state;
    return (
      <div>
        <h4>Company Information</h4>
        <Form.Group widths="equal">
          <Dropdown
            id='company'
            options={this.props.companies}
            fluid labeled search selection className='icon'
            placeholder='Company'
            onChange={this.handleDropDownChange}
            defaultValue={this.state.company}
            name="company" />
          <Dropdown
            id="country"
            options={this.props.countries}
            fluid labeled search selection className='icon'
            placeholder='Country'
            onChange={this.handleDropDownChange}
            defaultValue={this.state.country}
            disabled={!this.state.company}
            name="country" />
        </Form.Group>
        <h4>Case Type</h4>
        <Form.Group>
          <Form.Radio
            name='caseType' label='Simple' value='simple' checked={caseType === 'simple'}
            onChange={this.handleSelectChange} disabled={!this.state.company} />
          <Form.Radio
            name='caseType' label='Complex' value='complex' checked={caseType === 'complex'}
            onChange={this.handleSelectChange} disabled={!this.state.company} />
          <Form.Radio
            name='caseType' label='Custom' value='custom' checked={caseType === 'custom'}
            onChange={this.handleSelectChange} disabled={!this.state.company} />
          <Form.Input
            iconPosition='left' placeholder='Amount'  type='number' disabled={caseType !== 'custom'}
            onChange={e => ReceiptHandler.handleChange('amount', e.target.value, this, false, this.props.updateReceipt)} value={this.state.amount}
            pattern="[0-9]*" name='amount'>
            <Icon name='dollar' />
            <input />
          </Form.Input>
        </Form.Group>
        <h4>Case Details</h4>
        <Form.Group>
          <Form.Checkbox
            name='repatriation' label='Repatriation' onChange={this.handleSelectChange} checked={!!this.state.repatriation}
            disabled={!this.state.company} />
          <Form.Checkbox
            name='doctorEscort' label='Doctor Escort' onChange={this.handleSelectChange} checked={!!this.state.doctorEscort}
            disabled={!this.state.company} />
          <Form.Checkbox
            name='nurseEscort' label='Nurse Escort' onChange={this.handleSelectChange}  checked={!!this.state.nurseEscort}
            disabled={!this.state.company} />
        </Form.Group>
      </div>
    );
  }
}

CaseFees.propTypes = {
  activeStep: React.PropTypes.string,
  existingCaseFees: React.PropTypes.object,
  updateReceipt: React.PropTypes.func
};

export default CaseFees;
