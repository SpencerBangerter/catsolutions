import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import AuthProvider from './Context/AuthContext';

ReactDOM.render(
<AuthProvider>
<App />,
</AuthProvider>, 
document.getElementById("root"));
registerServiceWorker();
