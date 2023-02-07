import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  error: Error|null;
  errorInfo: ErrorInfo|null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
      error: null,
      errorInfo: null
    };

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log the error to an error reporting service
    
    }
    
    render() {
    //if(this.state.hasError) {
      if (this.state.errorInfo) {
        // Error path
        // The <details> tag is often used to create an interactive widget that the user can open and close. 
        //By default, the widget is closed. When open, it expands, and displays the content within.
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }
  

  