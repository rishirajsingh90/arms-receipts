import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Client from '../Client';
import HandlingFees from './HandlingFees';
import CreateReceiptSteps from '../common/CreateReceiptSteps';

class NewReceipt extends React.Component {
  constructor () {
    return {
      companies: [],
      countries: [],
      value: null
    };
  }
  componentDidMount() {
    this.getCompanies();
    this.getCountries();
  }
  getCompanies() {
    Client.getCompanies((companies) => {
      this.setState({ companies: companies, value: this.state.value, countries:this.state.countries });
    });
  }
  getCountries() {
    Client.getCountries((countries) => {
      this.setState({ companies: this.state.companies, value: this.state.value, countries:countries });
    });
  }
  render() {
    return (
      <div>
        <Form>
          <CreateReceiptSteps activeState="handlingFee" />
          <HandlingFees />
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewReceipt;
