import React, { Component } from 'react';
import Client from '../Client';
import { Table, Header, Message } from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';

class ReviewReceipts extends Component {
  constructor() {
    super();
    this.state = {
      receipts: []
    };
  }
  componentDidMount() {
    this.getReceipts();
  }
  getReceipts() {
    Client.search(null, (receipts) => {
      this.setState({ receipts: receipts });
    });
  }
  render() {
    return (
      <div>
        { this.props.location.state && this.props.location.state.receiptCreatedMessage ? <Message
          success
          header='Receipt Created'
          content={this.props.location.state.receiptCreatedMessage}
        /> : null }
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
                  <Table.Cell className='right aligned'>${receipt.total}</Table.Cell>
                  <Table.Cell className='right aligned'>{moment(receipt.created).format('DD/MM/YYYY')}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

ReviewReceipts.propTypes = {
  location: PropTypes.object
};

export default ReviewReceipts;
