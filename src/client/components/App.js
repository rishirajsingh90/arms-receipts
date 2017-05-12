import React, { Component } from 'react';
import Header from './common/Header';
import { Container } from 'semantic-ui-react';
import { styles } from './styles';
import "react-day-picker/lib/style.css"

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
