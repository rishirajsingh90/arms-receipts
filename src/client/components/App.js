import React, { Component } from 'react';
import Header from './common/Header';
import { Container } from 'semantic-ui-react';
import { styles } from './styles';
import 'react-datepicker/dist/react-datepicker.min.js';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container style={styles.receiptContainer}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

export default App;
