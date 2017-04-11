import React from "react";
import { Form, Input, Icon } from "semantic-ui-react";
import DatePicker from "react-datepicker";

class CarTransport extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeStep: null
    };
  }
  render() {

    if (this.props.activeStep !== "carTransport") {
      return null;
    }

    return (
      <div>
        <Form.Group inline>
          <Form.Field>
            <label>Service Provider</label>
            <Input placeholder="Provider" />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>City</label>
          <Form.Field>
            <Input placeholder="From" />
          </Form.Field>
          <Form.Field>
            <Input placeholder="To" />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Distance</label>
          <Form.Field>
            <Input placeholder="Distance" type="number" labelPosition="right" label="km" />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Dates</label>
          <Form.Field>
            <DatePicker
              selected={this.state.startDate}
              placeholderText="Start Date"
              dateFormat="DD/MM/YYYY"
            />
          </Form.Field>
          <Form.Field>
            <DatePicker
              selected={this.state.endDate}
              placeholderText="End Date"
              dateFormat="DD/MM/YYYY"
            />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <Form.Field>
            <label>Amount</label>
            <Input iconPosition="left" placeholder="Amount" type="number">
              <Icon name="dollar" />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

export default CarTransport;
