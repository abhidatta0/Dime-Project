import React, { Component } from 'react';
import Style from './style.module.scss';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={Style.errorDiv}>
          Something went wrong !!!
          <p className={Style.secondaryText}>Please try refreshing </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
