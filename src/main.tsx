import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
        domain="coralina.us.auth0.com"
        clientId="Daj57uyoegjCZqJTJwUgkFXHsZ1kt73X"
        authorizationParams={{
          audience: "https://coralina.us.auth0.com/api/v2/",
          redirect_uri: window.location.origin + "/login"
        }}
      >
      <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
