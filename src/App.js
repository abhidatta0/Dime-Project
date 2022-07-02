import React, {lazy, Suspense} from 'react';
import Style from './app.module.scss';
import AddSubscriptionComponent from './components/AddSubscriptionComponent';
import ErrorBoundary from './components/ErrorBoundary';

const HeaderComponent = lazy(()=> import('./components/headerComponent'));
const ViewSubscriptionComponent = lazy(()=> import('./components/ViewSubscriptionComponent'));

const renderLoader = () => <p>Loading</p>;

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={renderLoader()}>
      <div className={Style.main}>
        <div className={Style.wrapperDiv}>
          <HeaderComponent />
          <AddSubscriptionComponent />
          <ViewSubscriptionComponent />
        </div>
      </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
