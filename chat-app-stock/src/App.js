import React ,{useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Chat from "./Chat";
import CompanyPolicy from "./CompanyPolicy";
import { Provider } from 'react-redux';
import store from './store';
import { useSelector } from 'react-redux';
import './App.css';
import './Theme.css';



function App() {

  const theme = useSelector(state => state.chat.theme);    
    
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);  

  return (   
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />F
          <Route path="/chat/:question" element={<Chat />} />
          <Route path="/company-policy" element={<CompanyPolicy />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
