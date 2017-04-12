function handleSelectChange(e, { name, value, checked }, ctx) {
  ctx.setState({ [name]: value ? value : checked }, () => {
    ctx.props.updateReceipt(ctx.state);
  });
}

function handleDropDownChange(e, { id, value  }, ctx) {
  return ctx.setState({ [id]: value }, () => {
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

const ReceiptHandler = { handleSelectChange, handleDropDownChange, handleChange, handleStartDate, handleEndDate };
export default ReceiptHandler;