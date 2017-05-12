import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import DayPicker from 'react-day-picker';

class SingleDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: undefined,
      inputClicked: false
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
  }
  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
    this.setState({ inputClicked: false });
  };
  handleInputClick() {
    this.setState({ inputClicked: true });
  }
  render() {
    let datePicker;
    if (this.state.inputClicked) {
      datePicker = <DayPicker
        selectedDays={this.state.selectedDay}
        onDayClick={this.handleDayClick}/>;
    } else {
      datePicker = null;
    }
    return (
      <div>
        <Input onClick={this.handleInputClick} defaultValue={this.state.selectedDay}
          placeholder={this.props.placeholder ? this.props.placeholder : 'Date'}
          value={this.state.selectedDay} />
        {datePicker}
      </div>
    );
  }
}

export default SingleDate;
