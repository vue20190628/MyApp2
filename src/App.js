import React from 'react';
import './App.css';
// import './reset.css';
import 'antd-mobile/dist/antd-mobile.css';
import RouterCompontent from "./router"
import { Provider } from 'react-redux'
import store from './store'
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <RouterCompontent></RouterCompontent>
    </div>
    </Provider>
  );
}

export default App;
