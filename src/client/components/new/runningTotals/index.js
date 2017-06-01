import React, { Component } from 'react';
import { Grid, Divider, Header } from 'semantic-ui-react';
import { styles } from '../../styles';

class RunningTotals extends Component {
  constructor (props) {
    super(props);
    this.state = {
      existingReceipt: {}
    };
  }
  componentWillReceiveProps() {
    if (this.props.updatedReceipt) {
      this.setState({ existingReceipt: this.props.updatedReceipt });
    } else if (this.props.existingReceipt) {
      this.setState({ existingReceipt: this.props.existingReceipt });
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
    let aircraftCharterLabel = null;
    let aircraftCharterFees = null;
    let ambulanceFeeLabel = null;
    let ambulanceFeeTotals = null;

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

    if (this.state.existingReceipt.airlineTicket) {
      airlineTicketLabel = <Header.Subheader>{this.state.existingReceipt.airlineTicket.fromCity} -> {this.state.existingReceipt.airlineTicket.toCity}&nbsp;({this.state.existingReceipt.airlineTicket.flightClass})</Header.Subheader>;
      airlineTicketFees = <Header.Subheader>${this.state.existingReceipt.airlineTicket.total}</Header.Subheader>;
    }

    if (this.state.existingReceipt.aircraftCharter) {
      aircraftCharterLabel = <Header.Subheader>{this.state.existingReceipt.aircraftCharter.fromCity} -> {this.state.existingReceipt.aircraftCharter.toCity}&nbsp;({this.state.existingReceipt.aircraftCharter.aircraftType})</Header.Subheader>;
      aircraftCharterFees = <Header.Subheader>${this.state.existingReceipt.aircraftCharter.total}</Header.Subheader>;
    }

    if (this.state.existingReceipt.ambulanceFee) {
      ambulanceFeeLabel = <Header.Subheader>{this.state.existingReceipt.ambulanceFee.fromCity} -> {this.state.existingReceipt.ambulanceFee.toCity}</Header.Subheader>;
      ambulanceFeeTotals = <Header.Subheader>${this.state.existingReceipt.ambulanceFee.total}</Header.Subheader>;
    }

    return (
      <div style={styles.runningTotalsSection}>
        <h3>Running Totals</h3>
        <Divider />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={11}>
              <div style={styles.itemTitle}>Case Fees</div>
              <div style={styles.receiptItem}>
                {companyName ? <Header.Subheader>{companyName}</Header.Subheader> : null}
                {doctorEscort ? <Header.Subheader>Doctor Escort</Header.Subheader> : null}
                {nurseEscort ? <Header.Subheader>Nurse Escort</Header.Subheader> : null}
                {repatriation ? <Header.Subheader>Repatriation</Header.Subheader> : null}
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div>&nbsp;</div>
              <div style={styles.receiptItem}>
                {caseFee}
                {doctorEscort}
                {nurseEscort}
                {repatriation}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <div style={styles.itemTitle}>Car Transport</div>
              <div style={styles.receiptItem}>
                {carTransportLabel ? <Header.Subheader>{carTransportLabel}</Header.Subheader> : null}
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div>&nbsp;</div>
              <div style={styles.receiptItem}>
                {carTransportFees}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <div style={styles.itemTitle}>Airline Tickets</div>
              <div style={styles.receiptItem}>
                {airlineTicketLabel ? <Header.Subheader>{airlineTicketLabel}</Header.Subheader> : null}
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div>&nbsp;</div>
              <div style={styles.receiptItem}>
                {airlineTicketFees}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <div style={styles.itemTitle}>Aircraft Charter</div>
              <div style={styles.receiptItem}>
                {aircraftCharterLabel ? <Header.Subheader>{aircraftCharterLabel}</Header.Subheader> : null}
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div>&nbsp;</div>
              <div style={styles.receiptItem}>
                {aircraftCharterFees}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <div style={styles.itemTitle}>Ambulance Fees</div>
              <div style={styles.receiptItem}>
                {ambulanceFeeLabel ? <Header.Subheader>{ambulanceFeeLabel}</Header.Subheader> : null}
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div>&nbsp;</div>
              <div style={styles.receiptItem}>
                {ambulanceFeeTotals}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Grid columns={2}>
          <Grid.Column width={11}>
            <div color='green' style={styles.itemTitle}>Receipt Total:</div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div color='green' style={styles.itemTitle}>${this.state.existingReceipt ? this.state.existingReceipt.total : 0}</div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

RunningTotals.propTypes = {
  existingReceipt: React.PropTypes.object,
  updatedReceipt: React.PropTypes.func
};

export default RunningTotals;
