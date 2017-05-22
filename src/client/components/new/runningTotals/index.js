import React, { Component } from 'react';
import { Container, Grid, Divider, Header } from 'semantic-ui-react';
import TotalsService from '../../../service/TotalsService';
import { styles } from '../../styles';

class RunningTotals extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  componentWillReceiveProps() {
  }
  render() {
    return (
        <Container style={styles.runningTotals}>
          <div style={styles.runningTotalsSection}>
            <h3>Running Totals</h3>
            <Divider />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header size='tiny'>Case Fees</Header>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header size='tiny'>Car Transport</Header>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header size='tiny'>Airline Tickets</Header>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header size='tiny'>Aircraft Charter</Header>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header size='tiny'>Ambulance Fees</Header>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider />
            <Grid columns={2}>
              <Grid.Column width={12}>
                <Header as='h3' color='green'>Receipt Total:</Header>
              </Grid.Column>
              <Grid.Column width={4}>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
    );
  }
}

export default RunningTotals;
