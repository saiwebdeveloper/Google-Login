import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { SpeedInsights } from "@vercel/speed-insights/react";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="655567086137-544t95gr9iun8uimprqdq6k8cklk7q55.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
         <SpeedInsights />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
