import React, { Component } from 'react';
import Header from './common/Header';
import { Container } from 'semantic-ui-react';
import { styles } from './styles';

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

export default App;
