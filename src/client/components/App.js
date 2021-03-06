import React, { Component } from 'react';
import Header from './common/components/header';
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

App.propTypes = {
  children: React.PropTypes.object
};

export default App;
