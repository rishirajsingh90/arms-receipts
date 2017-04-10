import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "review"
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu>
          <Menu.Item
            active={activeItem === 'new'}
            as={Link}
            name='new'
            onClick={this.handleItemClick}
            to="/new"
          >
            <Icon
              name='plus'
            />
            New
          </Menu.Item>

          <Menu.Item
            active={activeItem === 'review'}
            as={Link}
            name='review'
            onClick={this.handleItemClick}
            to="/review"
          >
            <Icon
              name='checkmark box'
            />
            Review
          </Menu.Item>

          <Menu.Item
            active={activeItem === 'search'}
            as={Link}
            name='search'
            onClick={this.handleItemClick}
            to="/search"
          >
            <Icon
              name='search'
            />
            Search
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Header;
