import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CompareProvider } from './contexts/CompareContext';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <>
      <Helmet>
        <title>Home - Sort My Shaadi</title>
        <meta name="description" content="Discover the best hotel deals for your wedding and events with Sort My Shaadi." />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      {/* ...existing code... */}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="532030902759-20ucr69j9578qkprl0dvjnmhvjdlbe02.apps.googleusercontent.com">
    <React.StrictMode>
      <HelmetProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </HelmetProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals.console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default Home;
