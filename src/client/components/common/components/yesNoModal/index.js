import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class YesNoModal extends Component {
  render() {
    return (
      <Modal open={this.props.showModal} basic size='small'>
        <Header icon='warning circle' content={this.props.title} />
        <Modal.Content>
          <p>{this.props.content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.props.handleCancel}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.props.handleSubmit}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

YesNoModal.propTypes = {
  content: React.PropTypes.string,
  handleCancel: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  showModal: React.PropTypes.bool,
  title: React.PropTypes.string
};

export default YesNoModal;
