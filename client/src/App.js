import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Map } from "./components";
import GlobalStyles from "./styles/global.js";
import { Helmet } from "react-helmet";
import MainPage from "./pages/MainPage";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyles />
      <div className="App">
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
