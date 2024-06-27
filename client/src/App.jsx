import React from "react";
import "./App.css";
import User from "./components/getuser/User";
import Add from "./components/adduser/Add";
import Edit from "./components/updateuser/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
