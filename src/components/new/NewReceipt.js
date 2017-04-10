import React from 'react';
import {Header, Form, Button} from 'semantic-ui-react';
import Client from '../Client';
import HandlingFees from './HandlingFees';
import CreateReceiptSteps from '../common/CreateReceiptSteps';

const NewReceipt = React.createClass({
  getInitialState: function () {
    return {
      companies: [],
      countries: [],
      value: null
    }
  },
  render: function () {
    return (
      <div>
        <Form>
          <CreateReceiptSteps activeState="handlingFee"/>
          <HandlingFees />
          <Button type='submit'>Submit</Button>
        </Form>
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
  }
});

export default NewReceipt;