function handleSelectChange(e, { id, value }, ctx) {
  return ctx.setState({ [id]: value });
}

function handleDropDownChange(e, { id, text }, ctx) {
  return ctx.setState({ [id]: text });
}
function handleChange(input, value, ctx) {
  ctx.setState({ [input]: value }, () => {
    ctx.props.updateReceipt(ctx.state);
  });
}

<<<<<<< HEAD
const ReceiptHandler = { handleSelectChange, handleDropDownChange, handleChange };
=======
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
>>>>>>> develop
export default ReceiptHandler;