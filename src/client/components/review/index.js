import React, { Component } from 'react';
import Client from '../Client';
import { Table, Header, Message, Button, Icon } from 'semantic-ui-react';
import YesNoModal from '../common/components/yesNoModal';
import { browserHistory } from 'react-router';

class ReviewReceipts extends Component {
  constructor() {
    super();
    this.state = {
      receipts: [],
      showModal: false
    };
    this.handleFinalizeReceipt = this.handleFinalizeReceipt.bind(this);
    this.handleDeleteReceipt = this.handleDeleteReceipt.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleDismissModal = this.handleDismissModal.bind(this);
  }
  componentDidMount() {
    this.getReceipts();
  }
  getReceipts() {
    Client.search(null, (receipts) => {
      this.setState({ receipts: receipts });
    });
  }
  handleFinalizeReceipt() {
    console.log('finalize');
  }
  handleDeleteReceipt() {
    Client.deleteReceipt(this.state.receiptToDelete, (response) => {
      this.setState({ receiptMessage: response.message });
      this.getReceipts();
    });
    this.handleDismissModal();
  }
  handleShowModal(receipt) {
    this.setState({ showModal: true });
    if (receipt) {
      this.setState({ receiptToDelete: receipt._id });
    }
  }
  handleDismissModal() {
    this.setState({ showModal: false });
    this.setState({ receiptToDelete: undefined });
  }
  render() {
    return (
      <div>
        { this.props.location.state && this.props.location.state.receiptMessage ? <Message
          success
          header='Receipt Created'
          content={this.props.location.state.receiptMessage}
        /> : null }
        <YesNoModal
          title='Delete receipt?' content='Are you sure you want to delete this receipt?'
          showModal={this.state.showModal} submit={this.handleDeleteReceipt} cancel={this.handleDismissModal} />
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
                  <Table.Cell>
                    <a href={'edit/' + receipt._id}>{receipt.description}</a>
                  </Table.Cell>
                  <Table.Cell className='right aligned'>{receipt.email}</Table.Cell>
                  <Table.Cell positive className='right aligned'>${receipt.total}</Table.Cell>
                  <Table.Cell className='right aligned'>{receipt.creationDate}</Table.Cell>
                  <Table.Cell>
                    <Button animated='vertical' positive onClick={this.handleFinalizeReceipt} >
                      <Button.Content hidden>Finalize</Button.Content>
                      <Button.Content visible>
                        <Icon name='check' />
                      </Button.Content>
                    </Button>
                    <Button animated='vertical' negative onClick={() => this.handleShowModal(receipt)}>
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
