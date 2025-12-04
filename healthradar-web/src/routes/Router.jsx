import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import DentistRadarPage from "../pages/DentistRadarPage.jsx";
import GPRadarPage from "../pages/GPRadarPage.jsx";
import NotFound from "../pages/NotFound.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dentist" element={<DentistRadarPage />} />
        <Route path="/gp" element={<GPRadarPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
