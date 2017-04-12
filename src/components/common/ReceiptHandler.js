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

const ReceiptHandler = { handleSelectChange, handleDropDownChange, handleChange };
export default ReceiptHandler;