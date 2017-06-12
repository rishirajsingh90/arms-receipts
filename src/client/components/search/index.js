import React, { Component } from 'react';
import Client from '../Client';
import { Form, Table, Header } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';

class ReceiptSearch extends Component {

  componentWillMount() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState({ receipts: [], query: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    Client.searchReceipts(this.state.query, (receipts) => {
      this.setState({ isLoading: false });
      this.setState({ receipts });
    });
  }

  render() {
    let receiptSet = null;
    if (!isEmpty(this.state.receipts)) {
      receiptSet = (
        <div>
          <Header as='h3'>{ this.state.receipts.length + " receipt(s) returned."}</Header>
          <Table celled selectable unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Creator</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.state.receipts.map((receipt, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>
                      <a href={'edit/' + receipt._id}>{receipt.description}</a>
                    </Table.Cell>
                    <Table.Cell className='right aligned'>{receipt.email}</Table.Cell>
                    <Table.Cell positive className='right aligned'>${receipt.total}</Table.Cell>
                    <Table.Cell className='right aligned'>{receipt.creationDate}</Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        </div>
      );
    }
    return (
      <div>
        <Form class="ui form" loading={this.state.isLoading} onSubmit={this.handleSubmit}>
          <p>Currently supports search by first name, last name, receipt Id, description and date of birth (DD-MM-YYYY)</p>
          <Form.Group widths="equal">
            <Form.Input
              name="search" placeholder='Please enter a search query' type='text'
              onChange={(e, { value }) => this.setState({ query: value })} />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Button content='Search' disabled={isEmpty(this.state.query)} />
          </Form.Group>
        </Form>
        {receiptSet}
      </div>
    );
  }
}

export default ReceiptSearch;
