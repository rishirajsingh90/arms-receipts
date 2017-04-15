import {React} from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Header from '../../components/common/Header';

import {describe, it} from "mocha";

describe('<Header/>', function () {
  it('should load app on calls to index', function () {
    const wrapper = shallow(<Header/>);
    expect(wrapper.find('#newReceipt')).to.be.ok;
  });
});