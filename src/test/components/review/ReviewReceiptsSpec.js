import React, { Component } from 'react';
import { mount } from 'enzyme';
import {describe, it} from "mocha";
import {expect} from 'chai';
import fetchMock from 'fetch-mock';

import ReviewReceipts from '../../../client/components/review/ReviewReceipts';
import { Table } from 'semantic-ui-react';

let wrapper;

before(function() {
  wrapper = mount(<ReviewReceipts />);

  fetchMock('http://localhost:8080')
    .get('api/receipt?q=')
    .reply(200, [
        {
          "description":"Air tickets to Uruguay",
          "created":"2017-01-05T06:00:00.000Z",
          "amount":"$756.32",
          "id":"1",
          "creator_id":"1",
          "first_name":"rishi",
          "last_name":"singh",
          "email":"rishis@arms.com"
        },
        {
          "description":"Hotel stay",
          "created":"2017-01-05T06:00:00.000Z",
          "amount":"$463.92",
          "id":"2",
          "creator_id":"2",
          "first_name":"john",
          "last_name":"doe",
          "email":"johnd@arms.com"
        },
        {
          "description":"Hospital fees",
          "created":"2017-01-05T06:00:00.000Z",
          "amount":"$5,021.24",
          "id":"3",
          "creator_id":"3",
          "first_name":"jane",
          "last_name":"doe",
          "email":"janed@arms.com"
        },
        {
          "description":"Repatriation fees",
          "created":"2017-01-05T06:00:00.000Z",
          "amount":"$450.00",
          "id":"2",
          "creator_id":"2",
          "first_name":"john",
          "last_name":"doe",
          "email":"johnd@arms.com"
        }
      ]
    );
});

describe('<ReviewReceipts/> tests', function () {
  it('Should load data on component mount', function () {
    expect(wrapper.find(Table.HeaderCell)).to.have.length(4);
    expect(wrapper.find(Table.Row)).to.have.length(5);
    expect(wrapper.find(Table.Cell)).to.have.length(16);
  });
});