import React from 'react';
import Header from './common/Header';
import {Container} from 'semantic-ui-react'
import {styles} from './styles'

const App = React.createClass({
    render: function () {
        return (
            <div>
                <Header/>
                <Container style={styles.receiptContainer}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
});

export default App;
