import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import DayPicker from 'react-day-picker';

class SingleDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: undefined,
      hideInput: false
    };
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  handleInputClick(hideInput) {
    this.setState({ hideInput: hideInput });
  }
  handleDayClick(day) {
    this.handleInputClick(false);
    this.setState({ selectedDay: day });
    this.props.handleDayClick(day);
  }
  render() {
    let datePicker;
    let displayDate;
    if (this.state.hideInput) {
      datePicker = <DayPicker
        selectedDays={this.state.selectedDay}
        onDayClick={(day) => this.handleDayClick(day)} />;
    } else {
      datePicker = null;
    }
    if (this.state.selectedDay) {
      displayDate = this.state.selectedDay.toLocaleDateString('en-GB');
    } else if (this.props.selectedDay) {
      displayDate = this.props.selectedDay.toLocaleDateString('en-GB');
    }
    return (
      <Form.Input onClick={() => this.handleInputClick(true)} placeholder={this.props.placeholder ? this.props.placeholder : 'Date'}
        value={displayDate} readOnly>
        {datePicker}
      </Form.Input>
    );
  }
}

export default SingleDate;
