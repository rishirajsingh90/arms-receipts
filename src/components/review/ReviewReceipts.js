import React from 'react';
import Client from '../Client';
import {Table, Header} from 'semantic-ui-react'

const ReviewReceipts = React.createClass({
  getInitialState: function () {
    return {
      receipts: []
    };
  },
  render: function () {
    return (
      <div>
        <Header as='h3'>Review Receipts</Header>
        <Table celled>
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
                <Table.Cell>{receipt.description}</Table.Cell>
                <Table.Cell className='right aligned'>{receipt.email}</Table.Cell>
                <Table.Cell className='right aligned'>{receipt.amount}</Table.Cell>
                <Table.Cell className='right aligned'>{receipt.created}</Table.Cell>
              </Table.Row>
            ))
          }
          </Table.Body>
        </Table>
      </div>
    );
  },
  componentDidMount: function () {
    this.getReceipts();
  },
  getReceipts: function () {
    Client.search(null, (receipts) => {
      this.setState({receipts: receipts})
    });
  }
});

export default ReviewReceipts;
