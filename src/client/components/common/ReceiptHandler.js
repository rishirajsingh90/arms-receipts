const _ = require('lodash');

function handleSelectChange(e, { name, value, checked }, ctx) {
  ctx.setState({ [name]: value ? value : checked }, () => {
    ctx.props.updateReceipt(ctx.state);
  });
}
function getValueFromKey(key, options) {
  if (!key || !options) {
    return;
  }
  return _.find(options, function(option) {
    return option.key === key;
  }).value;
}
function handleDropDownChange(e, { id, value, options  }, ctx) {
  const key = _.find(options, function(option) {
    return option.value === value;
  }).key;
  return ctx.setState({ [id]: key }, () => {
    ctx.props.updateReceipt(ctx.state);
  });
}
function handleChange(input, value, ctx) {
  ctx.setState({ [input]: value }, () => {
    ctx.props.updateReceipt(ctx.state);
  });
}

function handleStartDate(date, ctx) {
  ctx.setState({ startDate: date }, () => {
    ctx.props.updateReceipt(ctx.state);
  });
}

function handleEndDate(date, ctx) {
  ctx.setState({ endDate: date }, () => {
    ctx.props.updateReceipt(ctx.state);
  });
}

const ReceiptHandler = { handleSelectChange, handleDropDownChange, handleChange, handleStartDate, handleEndDate, getValueFromKey };
export default ReceiptHandler;
