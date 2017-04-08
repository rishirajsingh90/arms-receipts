import React, {Component} from 'react';
import {Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router'

export default class Header extends Component {
  constructor() {
      super();
      this.state = {
          activeItem: "review"
      };
      this.handleItemClick = this.handleItemClick.bind(this);
  }

    handleItemClick(e, {name}) {
      this.setState({activeItem: name});
  }

  render() {
    const {activeItem} = this.state;

    return (
      <div>
        <Menu>
          <Menu.Item
            name='new'
            active={activeItem === 'new'}
            onClick={this.handleItemClick}
            as={Link}
            to="/new">
            <Icon name='plus'/>
            New
          </Menu.Item>

          <Menu.Item
            name='review'
            active={activeItem === 'review'}
            onClick={this.handleItemClick}
            as={Link}
            to="/review">
            <Icon name='checkmark box'/>
            Review
          </Menu.Item>

          <Menu.Item
            name='search'
            active={activeItem === 'search'}
            onClick={this.handleItemClick}
            as={Link}
            to="/search">
            <Icon name='search'/>
            Search
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}