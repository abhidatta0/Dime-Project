import React from 'react';
import Style from './app.module.scss';
import HeaderComponent from './components/headerComponent';
import AddSubscriptionComponent from './components/AddSubscriptionComponent';
import ViewSubscriptionComponent from './components/ViewSubscriptionComponent';

function App() {
  return (
    <div className={Style.main}>
      <div className={Style.wrapperDiv}>
        <HeaderComponent />
        <AddSubscriptionComponent />
        <ViewSubscriptionComponent />
      </div>
    </div>
  );
}

export default App;
