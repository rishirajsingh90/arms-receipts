import React, { Component } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router';
import { styles } from '../../../styles';
import { browserHistory } from 'react-router';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "review"
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.goToState = this.goToState.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  goToState(stateName) {
    browserHistory.push({
      pathName: stateName,
      state: {}
    });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu style={styles.armsRed} unstackable>
          <Menu.Item
            id='newReceipt'
            active={activeItem === 'new'}
            as={Link}
            name='new'
            onClick={this.handleItemClick}
            to="/new">
            <Icon name='plus' />
            New
          </Menu.Item>
          <Menu.Item
            id='reviewReceipts'
            active={activeItem === 'review'}
            as={Link}
            name='review'
            onClick={this.handleItemClick}
            to="/review" >
            <Icon name='checkmark box' />
            Review
          </Menu.Item>
          <Menu.Item
            id='findReceipt'
            active={activeItem === 'search'}
            as={Link}
            name='search'
            onClick={this.handleItemClick}
            to="/search" >
            <Icon name='search' />
            Search
          </Menu.Item>
          <Menu.Item
            id='settings'
            active={activeItem === 'settings'}
            name='settings'
            onClick={this.handleItemClick}>
            <Icon name='setting' />
            <Dropdown item text="Settings" fixed="right">
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.goToState("airline")}>Add airline</Dropdown.Item>
                <Dropdown.Item onClick={() => this.goToState("ambulance-provider")}>Add ambulance provider</Dropdown.Item>
                <Dropdown.Item onClick={() => this.goToState("car-provider")}>Add transport provider</Dropdown.Item>
                <Dropdown.Item onClick={() => this.goToState("company")}>Add company</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Header;
