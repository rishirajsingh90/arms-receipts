import React, { Component } from 'react';
import { Container, Grid, Divider, Header } from 'semantic-ui-react';
import TotalsService from '../../../service/TotalsService';
import { styles } from '../../styles';

class RunningTotals extends Component {
  constructor (props) {
    super(props);
    this.state = {
      existingReceipt: {}
    };
  }
  componentWillReceiveProps() {
    if (this.props.existingReceipt) {
      this.setState({existingReceipt: this.props.existingReceipt});
    }
  }
  render() {

    let companyName = null;
    let caseFee = null;
    let doctorEscort = null;
    let nurseEscort = null;
    let repatriation = null;
    let carTransportLabel = null;
    let carTransportFees = null;
    let airlineTicketLabel = null;
    let airlineTicketFees = null;

    if (this.state.existingReceipt.caseFee) {
      companyName = <Header.Subheader>{this.state.existingReceipt.caseFee.company}</Header.Subheader>;
      caseFee = <Header.Subheader>${this.state.existingReceipt.caseFee.type}</Header.Subheader>;
      if (this.state.existingReceipt.caseFee.doctorEscort) {
        doctorEscort = <Header.Subheader>${this.state.existingReceipt.caseFee.doctorEscort}</Header.Subheader>;
      }
      if (this.state.existingReceipt.caseFee.nurseEscort) {
        nurseEscort = <Header.Subheader>${this.state.existingReceipt.caseFee.nurseEscort}</Header.Subheader>;
      }
      if (this.state.existingReceipt.caseFee.repatriation) {
        repatriation = <Header.Subheader>${this.state.existingReceipt.caseFee.repatriation}</Header.Subheader>;
      }
    }

    if (this.state.existingReceipt.carTransport) {
      carTransportLabel = <Header.Subheader>{this.state.existingReceipt.carTransport.fromCity} -> {this.state.existingReceipt.carTransport.toCity}</Header.Subheader>;
      carTransportFees = <Header.Subheader>${this.state.existingReceipt.carTransport.total}</Header.Subheader>;
    }

    if (this.state.existingReceipt.airlineTickets) {
      airlineTicketLabel = <Header.Subheader>{this.state.existingReceipt.airlineTicket.fromCity} -> {this.state.existingReceipt.airlineTicket.toCity}</Header.Subheader>;
      airlineTicketFees = <Header.Subheader>${this.state.existingReceipt.airlineTicket.total}</Header.Subheader>;
    }

    return (
        <Container style={styles.runningTotals}>
          <div style={styles.runningTotalsSection}>
            <h3>Running Totals</h3>
            <Divider />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header as='h4'>Case Fees</Header>
                  {companyName ? <Header.Subheader>{companyName}</Header.Subheader> : null}
                  {doctorEscort ? <Header.Subheader>Doctor Escort</Header.Subheader> : null}
                  {nurseEscort ? <Header.Subheader>Nurse Escort</Header.Subheader> : null}
                  {repatriation ? <Header.Subheader>Repatriation</Header.Subheader> : null}
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header as='h4'>&nbsp;</Header>
                  {caseFee}
                  {doctorEscort}
                  {nurseEscort}
                  {repatriation}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header as='h4'>Car Transport</Header>
                  {carTransportLabel ? <Header.Subheader>{carTransportLabel}</Header.Subheader> : null}
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header as='h4'>&nbsp;</Header>
                  {carTransportFees}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header as='h4'>Airline Tickets</Header>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header as='h4'>Aircraft Charter</Header>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header as='h4'>Ambulance Fees</Header>
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
                <Header as='h3' color='green'>${this.state.existingReceipt ? this.state.existingReceipt.total : 0}</Header>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
    );
  }
}

RunningTotals.propTypes = {
  existingReceipt: React.PropTypes.object
};

export default RunningTotals;
