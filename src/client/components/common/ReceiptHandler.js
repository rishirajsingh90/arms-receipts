import find from 'lodash/find';
import TotalsService from '../../service/TotalsService';

function handleSelectChange(e, { name, value, checked }, ctx) {
  ctx.setState({ [name]: value ? value : checked }, () => {
    updateTotals(ctx);
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
    updateTotals(ctx);
  });
}
function handleChange(input, value, ctx) {
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

function updateTotals(ctx) {
  switch(ctx.props.activeStep) {
    case "caseHandling":
      TotalsService.calculateCaseFeeTotals(ctx.state);
      break;
    case "carTransport":
      TotalsService.calculateCarTransportTotals(ctx.state);
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

const ReceiptHandler = { handleSelectChange, handleDropDownChange, handleChange, handleStartDate, handleEndDate, getValueFromKey };
export default ReceiptHandler;
