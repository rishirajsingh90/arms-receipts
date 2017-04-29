import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import NewReceipt from './components/new/NewReceipt';
import ReviewReceipts from './components/review/ReviewReceipts';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

render(
  // TODO potentially drop this in a routes file
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ReviewReceipts} />
      <Route path="/review" component={ReviewReceipts} />
      <Route path="/new" component={NewReceipt} />
      <Route path="*" component={ReviewReceipts} />
    </Route>
  </Router>, document.getElementById('root'));

