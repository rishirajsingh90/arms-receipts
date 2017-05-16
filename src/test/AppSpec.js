import React, { Component } from 'react';
import { mount } from 'enzyme';
import {describe, it} from "mocha";
import { expect } from 'chai';

import App from '../client/components/App';
import Header from '../client/components/common/Header';

let wrapper;

before(function() {
  wrapper = mount(<App />);
});

describe('<App/> tests', function () {
  it('should display header on app load', function () {
    expect(wrapper.find(Header)).to.have.length(1);
    expect(wrapper.find('#reviewReceipts').hasClass('active')).to.equal(true);
  });
});
