import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import Admin from "./admin/Admin";
import NotFound from "./NotFound";
import Cadastro from "./admin/Cadastro";
import Dados from "./home/Dados";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dado/:id" element={<Dados />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Admin />} />
          {/* <Route path="/" element={<Admin />} /> */}
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
