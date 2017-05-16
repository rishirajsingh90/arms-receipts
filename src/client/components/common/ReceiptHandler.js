import TotalsService from '../../service/TotalsService';

function handleSelectChange(e, { name, value, checked }, ctx) {
  ctx.setState({ [name]: value ? value : checked }, () => {
    updateTotals(ctx);
  });
}

function handleDropDownChange(e, { id, value }, ctx) {
  return ctx.setState({ [id]: value }, () => {
    updateTotals(ctx);
  });
}

function handleChange(input, value, ctx, isText) {
  if (!isText) {
    value = value ? parseInt(value, 10) : 0;
  }
  ctx.setState({ [input]: value }, () => {
    updateTotals(ctx);
  });
}

function handleStartDate(date, ctx) {
  ctx.setState({ startDate: date }, () => {
    updateTotals(ctx);
  });
}

function handleEndDate(date, ctx) {
  ctx.setState({ endDate: date }, () => {
    updateTotals(ctx);
  });
}

function handleDOB(date, ctx) {
  ctx.setState({ dob: date }, () => {
    updateTotals(ctx);
  });
}

function handleDate(name, date, ctx) {
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
    updateTotals(ctx);
  });
}

function updateTotals(ctx) {
  switch (ctx.props.activeStep) {
    case "patientDetails":
      TotalsService.setPatientDetails(ctx.state);
      break;
    case "caseHandling":
      TotalsService.calculateCaseFeeTotals(ctx.state);
      break;
    case "carTransport":
      TotalsService.calculateCarTransportTotals(ctx.state, 1.5); // TODO fix this once you add in config,
                                                                 // also pull out doc/nurse escort fees,
                                                                 // default to 950 and 650 respectively
      break;
    case "airlineTickets":
      TotalsService.calculateAirlineTicketTotals(ctx.state);
      break;
    case "aircraftCharter":
      TotalsService.calculateAircraftCharterTotals(ctx.state);
      break;
    case "ambulanceFees":
      TotalsService.calculateAmbulanceFeeTotals(ctx.state, 4.5); // TODO fix this once you add in config,
                                                                 // also pull out doc/nurse escort fees,
                                                                 // default to 950 and 650 respectively
      break;
    default:
      break;
  }
}

const ReceiptHandler = { handleSelectChange, handleDropDownChange, handleChange, handleStartDate, handleEndDate, handleDOB,
  handleDate };
export default ReceiptHandler;
