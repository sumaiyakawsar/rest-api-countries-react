import React from "react";
import "./styles/App.css";
import Header from "./components/Header/Header";
import Countries from "./components/Countries/Countries";
import Country from "./components/Countries/Country";

import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./api/themeContext";
import {AiOutlineArrowUp} from "react-icons/ai";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "react-scroll-to-top";

function App() {
  return (
    <ThemeProvider>
      <main className="flex flex-col flex-1  justify-between h-full bg-neutral-50 dark:bg-[#202c37] text-[#111517]  dark:text-white">
        <Header />

        <Routes>
          <Route
            path="/rest-api-countries-react"
            element={<Countries />}
            exact
          />
          <Route
            path="/rest-api-countries-react/countries/:countryName"
            element={<Country />}
          />
        </Routes>

        <ScrollToTop
          smooth="true"
          className="rounded-full text-lg shadow-xl flex justify-center items-center bg-neutral-50 dark:bg-[#202c37] text-[#111517]  dark:text-white"
          component={<AiOutlineArrowUp />}
        />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
