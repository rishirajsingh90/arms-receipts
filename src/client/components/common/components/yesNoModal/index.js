import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class YesNoModal extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Modal open={this.props.showModal} basic size='small'>
        <Header icon='warning circle' content={this.props.title} />
        <Modal.Content>
          <p>{this.props.content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.props.cancel}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.props.submit}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

YesNoModal.propTypes = {
  showModal: React.PropTypes.bool,
  title: React.PropTypes.string,
  content: React.PropTypes.string,
  cancel: React.PropTypes.func,
  submit: React.PropTypes.func,
};

export default YesNoModal