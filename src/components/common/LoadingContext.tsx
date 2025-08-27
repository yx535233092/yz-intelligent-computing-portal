import React from 'react';

const LoadingContext = React.createContext({
  isLoading: false,
  toggleLoading: (value: boolean) => {},
});

export default LoadingContext;
