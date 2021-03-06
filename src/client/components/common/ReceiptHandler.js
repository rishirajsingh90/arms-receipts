function handleSelectChange(e, { name, value, checked }, ctx, callback) {
  ctx.setState({ [name]: value ? value : checked }, () => {
    callback(ctx.props.activeStep, ctx.state);
  });
}

function handleDropDownChange(e, { id, value }, ctx, callback) {
  return ctx.setState({ [id]: value }, () => {
    callback(ctx.props.activeStep, ctx.state);
  });
}

function handleChange(input, value, ctx, isText, callback) {
  if (!isText) {
    value = value ? parseInt(value, 10) : 0;
  }
  ctx.setState({ [input]: value }, () => {
    callback(ctx.props.activeStep, ctx.state);
  });
}

function handleStartDate(date, ctx, callback) {
  ctx.setState({ startDate: date }, () => {
    callback(ctx.props.activeStep, ctx.state);
  });
}

function handleEndDate(date, ctx, callback) {
  ctx.setState({ endDate: date }, () => {
    callback(ctx.props.activeStep, ctx.state);
  });
}

function handleDOB(date, ctx, callback) {
  ctx.setState({ dob: date }, () => {
    callback(ctx.props.activeStep, ctx.state);
  });
}

function handleDate(name, date, ctx, callback) {
  const tokens = date.split('/');
  let error = null;
  if (!tokens || tokens.length !== 3 || tokens[2].length !== 4 || tokens[1].length !== 2 || tokens[0].length !== 2) {
    error = true;
  }
  try {
    new Date(tokens[2], tokens[1], tokens[0]);
  } catch (ex) {
    error = true;
  }
  let errorObj = ctx.state.error;
  errorObj[name] = error;
  ctx.setState({ error: errorObj });
  ctx.setState({ [name]: date }, () => {
    callback(ctx.props.activeStep, ctx.state);
  });
}

const ReceiptHandler = { handleSelectChange, handleDropDownChange, handleChange, handleStartDate, handleEndDate, handleDOB,
  handleDate };
export default ReceiptHandler;
