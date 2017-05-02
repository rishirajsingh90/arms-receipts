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
  ctx.setState({ dob: date });
}

function updateTotals(ctx) {
  switch (ctx.props.activeStep) {
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
      TotalsService.calculateAirlineCharterTotals(ctx.state);
      break;
    default:
      break;
  }
}

const ReceiptHandler = { handleSelectChange, handleDropDownChange, handleChange, handleStartDate, handleEndDate, handleDOB };
export default ReceiptHandler;
