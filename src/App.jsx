import React from "react";
import "./styles/App.css";
import Header from "./components/Header/Header";
import Countries from "./components/Countries/Countries";
import Country from "./components/Countries/Country";

import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./api/themeContext";

import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ThemeProvider>
      <section className="flex flex-col flex-1  justify-between h-full bg-neutral-50 dark:bg-[#202c37] text-[#111517]  dark:text-white">
        <Header />

        <Routes>
          <Route path="/" element={<Countries />} exact/>
          <Route path="/countries/:countryName" element={<Country />} />
        </Routes>

        <Footer />
      </section>
    </ThemeProvider>
  );
}

export default App;
