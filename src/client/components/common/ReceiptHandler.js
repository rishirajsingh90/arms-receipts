import find from 'lodash/find';
import TotalsService from '../../service/TotalsService';

function handleSelectChange(e, { name, value, checked }, ctx) {
  ctx.setState({ [name]: value ? value : checked }, () => {
    updateTotals(ctx.state, ctx.props.activeStep);
    ctx.props.updateReceipt(ctx.state);
  });
}
function getValueFromKey(key, options) {
  if (!key || !options) {
    return;
  }
  return find(options, function(option) {
    return option.key === key;
  }).value;
}
function handleDropDownChange(e, { id, value, options  }, ctx) {
  const key = find(options, function(option) {
    return option.value === value;
  }).key;
  return ctx.setState({ [id]: key }, () => {
    updateTotals(ctx.state, ctx.props.activeStep);
    ctx.props.updateReceipt(ctx.state);
  });
}
function handleChange(input, value, ctx) {
  ctx.setState({ [input]: value }, () => {
    updateTotals(ctx.state, ctx.props.activeStep);
    ctx.props.updateReceipt(ctx.state);
  });
}

function handleStartDate(date, ctx) {
  ctx.setState({ startDate: date }, () => {
    updateTotals(ctx.state, ctx.props.activeStep);
    ctx.props.updateReceipt(ctx.state);
  });
}

function handleEndDate(date, ctx) {
  ctx.setState({ endDate: date }, () => {
    updateTotals(ctx.state, ctx.props.activeStep);
    ctx.props.updateReceipt(ctx.state);
  });
}

function updateTotals(state, step) {
  switch(step) {
    case "caseHandling":
      TotalsService.calculateCaseFeeTotals(state);
      break;
    case "carTransport":
      TotalsService.calculateCarTransportTotals(state);
      break;
    case "airlineTickets":
      TotalsService.calculateAirlineTicketTotals(state);
      break;
    case "aircraftCharter":
      TotalsService.calculateAirlineCharterTotals(state);
      break;
    default:
      break;
  }
}

const ReceiptHandler = { handleSelectChange, handleDropDownChange, handleChange, handleStartDate, handleEndDate, getValueFromKey };
export default ReceiptHandler;
