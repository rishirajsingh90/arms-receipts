import React, { Component } from 'react';
import Header from './common/Header';
import { Container } from 'semantic-ui-react';
import { styles } from './styles';

class App extends Component {
  render() {
    console.log(this.props.children);
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
  children: React.PropTypes.object
};

export default App;
