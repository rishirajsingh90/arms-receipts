import React, { Component } from 'react';
import Client from '../Client';
import { Table, Header, Message, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { browserHistory } from 'react-router';

class ReviewReceipts extends Component {
  constructor() {
    super();
    this.state = {
      receipts: []
    };
    this.finalizeReceipt = this.finalizeReceipt.bind(this);
    this.deleteReceipt = this.deleteReceipt.bind(this);
  }
  componentDidMount() {
    this.getReceipts();
  }
  getReceipts(receipt) {
    if (receipt) {
      const r = receipt.receipt;
      browserHistory.push({
        pathName: 'new',
        state: {
          r
        }
      });
    } else {
      Client.search((receipts) => {
        this.setState({ receipts: receipts });
      });
    }
  }
  finalizeReceipt() {
    console.log('finalize');
  }
  deleteReceipt() {
    console.log('delete');
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
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Creator</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              this.state.receipts.map((receipt, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell>{receipt.description}</Table.Cell>
                  <Table.Cell className='right aligned'>{receipt.email}</Table.Cell>
                  <Table.Cell positive className='right aligned'>${receipt.total}</Table.Cell>
                  <Table.Cell className='right aligned'>{moment(receipt.created).format('DD/MM/YYYY')}</Table.Cell>
                  <Table.Cell>
                    <Button animated='vertical' positive onClick={this.finalizeReceipt} >
                      <Button.Content hidden>Finalize</Button.Content>
                      <Button.Content visible>
                        <Icon name='check' />
                      </Button.Content>
                    </Button>
                    <Button animated='vertical' negative onClick={this.deleteReceipt}>
                      <Button.Content hidden>Delete</Button.Content>
                      <Button.Content visible>
                        <Icon name='delete' />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
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
  location: React.PropTypes.object
};

export default ReviewReceipts;
