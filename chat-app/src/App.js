import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Chat from "./Chat";
import CompanyPolicy from "./CompanyPolicy";

function App() {
  return (
    // <div className="App">
    //   <Main />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat/:question" element={<Chat />} />
        <Route path="/company-policy" element={<CompanyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
