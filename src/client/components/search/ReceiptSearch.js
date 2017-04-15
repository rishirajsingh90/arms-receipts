import React, { Component } from 'react';
import Client from '../Client';

const MATCHING_ITEM_LIMIT = 25;
class ReceiptSearch extends Component {
  constructor() {
    this.state = {
      receipts: [],
      showRemoveIcon: false,
      searchValue: ''
    };
  }
  handleSearchChange(e) {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        receipts: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.search(value, (receipts) => {
        this.setState({
          receipts: receipts.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  }
  handleSearchCancel() {
    this.setState({
      receipts: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  }
  render() {
    return (
      <div id='receipt-search'>
        <table className='ui selectable structured large table'>
          <thead>
          <tr>
            <th colSpan='5'>
              <div className='ui fluid search'>
                <div className='ui icon input'>
                  <input
                    className='prompt'
                    type='text'
                    placeholder='Search receipts...'
                    value={this.state.searchValue}
                    onChange={this.handleSearchChange}
                  />
                  <i className='search icon'/>
                </div>
                {
                  this.state.showRemoveIcon ? (
                    <i
                      className='remove icon'
                      onClick={this.handleSearchCancel}
                    />
                  ) : ''
                }
              </div>
            </th>
          </tr>
          <tr>
            <th className='eight wide'>Description</th>
            <th>Creator</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.receipts.map((receipt, idx) => (
              <tr
                key={idx}
                onClick={() => this.props.onReceiptClick(receipt)}
              >
                <td>{receipt.description}</td>
                <td className='right aligned'>{receipt.email}</td>
                <td className='right aligned'>{receipt.amount}</td>
                <td className='right aligned'>{receipt.created}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReceiptSearch;
