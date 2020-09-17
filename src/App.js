import React from 'react';
import Style from './app.module.scss';
import HeaderComponent from './components/headerComponent';
import AddSubscriptionComponent from './components/AddSubscriptionComponent';
import ViewSubscriptionComponent from './components/ViewSubscriptionComponent';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className={Style.main}>
        <div className={Style.wrapperDiv}>
          <HeaderComponent />
          <AddSubscriptionComponent />
          <ViewSubscriptionComponent />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
