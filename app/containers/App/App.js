import React from 'react';
import { LocalizeProvider } from "react-localize-redux";
import Main from './Main';
const App = () => {
  return (
    <LocalizeProvider>
      <Main/>
    </LocalizeProvider>
  );
};
export default App;
