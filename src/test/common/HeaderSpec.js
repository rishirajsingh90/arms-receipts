import React, { Component } from 'react';
import { mount } from 'enzyme';
import {describe, it} from "mocha";
import {expect} from 'chai';

import Header from '../../components/common/Header';
import { Menu } from 'semantic-ui-react';

let wrapper;

before(function() {
  wrapper = mount(<Header />);
});

describe('<App/> tests', function () {
  it('Header should display all sub menus', function () {
    expect(wrapper.find(Menu)).to.have.length(1);
    expect(wrapper.find(Menu.Item)).to.have.length(3);
  });
  it('should load new receipt on click', function() {
    const newReceipt = wrapper.find('#newReceipt');
    newReceipt.simulate('click');
    expect(newReceipt.hasClass('active')).to.equal(true);
  });
  it('should load receipt search on click', function() {
    const findReceipt = wrapper.find('#findReceipt');
    findReceipt.simulate('click');
    expect(findReceipt.hasClass('active')).to.equal(true);
  });
});